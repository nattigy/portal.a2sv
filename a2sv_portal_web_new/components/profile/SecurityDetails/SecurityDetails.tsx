import { useMutation } from "@apollo/client";
import clsx from "clsx";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as yup from "yup";
import { CHANGE_PASSWORD } from "../../../lib/apollo/Mutations/usersMutations";
import CustomTextField from "../../auth/TextField";
import FormAffirmativeButton from "../../common/FormAffirmativeButton";

type resetPasswordValues = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
const SecurityDetails = () => {
  const router = useRouter();
  const [changePassword, { loading: updateLoading, error: updateError }] =
    useMutation(CHANGE_PASSWORD);
  const FORM_VALIDATION = yup.object().shape({
    oldPassword: yup.string().required(),
    newPassword: yup.string().required(),
    confirmNewPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  });

  const INITIAL_VALUES: resetPasswordValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };
  return (
    <div className="flex flex-col bg-white items-center justify-center gap-4 py-36">
      <div className="flex justify-center items-center bg-primary-lite w-20 h-20 rounded-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="w-8 h-8" src={"/icons/key_icon.svg"} alt="" />
      </div>
      <p className="text-lg mt-5 font-bold">Want to change your password?</p>
      <p className="text-gray-500 mb-5">
        No worries you can change your password here.
      </p>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={FORM_VALIDATION}
        onSubmit={async (values) => {
          await changePassword({
            variables: {
              newPassword: values.newPassword,
              oldPassword: values.oldPassword,
            },
            refetchQueries: "active",
            onCompleted: async () => router.push("/profile"),
            notifyOnNetworkStatusChange: true,
          }).catch(() => {
            alert("Couldn't change password");
          });
        }}
      >
        {(formik) => {
          const { isSubmitting, errors, isValid, initialValues, touched } =
            formik;

          return (
            <Form className="flex flex-col justify-center">
              <div className="flex">
                <div className="flex w-44 mr-4 items-center">
                  <h1 className="text-sm w-full">Old Password</h1>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex w-full min-w-[288px]">
                    <CustomTextField
                      id="oldPassword"
                      name="oldPassword"
                      placeholder="Enter your current password"
                      type="password"
                      formik={formik}
                      fullWidth={true}
                    />
                  </div>

                  <p className="text-xs font-light text-red-700">
                    {(errors as any)["oldPassword"]}
                  </p>
                </div>
              </div>
              <div className="flex ">
                <div className="flex w-44 mr-4 items-center">
                  <h1 className="text-sm  w-full ">New Password</h1>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex w-full min-w-[288px]">
                    <CustomTextField
                      id="newPassword"
                      name="newPassword"
                      placeholder="Enter your new password"
                      type="password"
                      formik={formik}
                      fullWidth={true}
                    />
                  </div>
                  <h1 className="text-xs font-light text-red-700">
                    {(errors as any)["newPassword"]}
                  </h1>
                </div>
              </div>
              <div className="flex ">
                <div className="flex w-44 mr-4 items-center">
                  <h1 className="text-sm  w-full">Confirm New Password</h1>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex w-full min-w-[288px]">
                    <CustomTextField
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      placeholder="Confirm your new password"
                      type="password"
                      formik={formik}
                      fullWidth
                    />
                  </div>
                  <h1 className="text-xs font-light text-red-700">
                    {(errors as any)["confirmNewPassword"]}
                  </h1>
                </div>
              </div>
              <FormAffirmativeButton
                disabled={!isValid || !Boolean(Object.keys(touched).length)}
                text="Save Changes"
                isLoading={isSubmitting}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SecurityDetails;
