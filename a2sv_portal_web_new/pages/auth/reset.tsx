import { useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import * as Yup from "yup"
import { useRouter } from "next/router";
import React from "react";
import CustomTextField from "../../components/auth/TextField";
import FormAffirmativeButton from "../../components/common/FormAffirmativeButton";
import { RESET_PASSWORD_MUTATION } from "../../lib/apollo/Mutations/authMutations";

interface ResetFormValues {
  confirmPassword: string;
  password: string;
}

const INITIAL_VALUES = {
  password: "",
  confirmPassword: "",
} as ResetFormValues;

const validationSchema = Yup.object({
  password: Yup
    .string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: Yup.string()
    .label('Password Confirm')
    .required()
    .oneOf([Yup.ref('password')], 'Passwords does not match'),
});

const Reset = () => {
  const router = useRouter();
  const [resetPassword, { data, loading, }] = useMutation(RESET_PASSWORD_MUTATION);

  return (
    <div className="min-h-screen flex flex-col items-center pt-6">
      <div
        onClick={() => router.push("/")}
        className="flex justify-between w-10/12 cursor-pointer"
      >
        <img className="w-[7vw]" src="/images/A2SV-logo.svg" alt="" />
      </div>
      <div className="flex justify-center items-center gap-y-2 h-[85vh] w-full">
        <div className="h-fit w-7/12 md:w-2/5 lg:w-1/3 xl:w-[30%] p-8 lg:p-12 border rounded-xl shadow-lg">
          <h1 className="font-semibold text-3xl py-2">Reset Password</h1>
          <p className="font-light py-2">Please enter a new password</p>
          <p className="font-light text-gray-400 text-xs py-2">
            Password must be at least 8 characters long
          </p>
          <Formik initialValues={INITIAL_VALUES} validationSchema={validationSchema} onSubmit={async (values) => {
            try {
              await resetPassword({
                variables: {
                  password: values.password,
                  resetToken: typeof window !== undefined && localStorage.getItem("reset-token") || ""
                },
                refetchQueries: "active",
                notifyOnNetworkStatusChange: true,
                onError(error) {
                  console.log("error ", error)
                },
                onCompleted(data) {
                  localStorage.removeItem("reset-token")
                  router.push("/auth/login")
                },
              })
            } catch (error) {
              console.log("error ")
            }
          }}>
            {(formik) => (
              <div className="py-4">
                <Form>
                  <div className="flex flex-col gap-2">
                    <CustomTextField
                      id="password"
                      name="password"
                      placeholder="Password"
                      type="password"
                      formik={formik}
                    />
                    <CustomTextField
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      type="password"
                      formik={formik}
                    />
                    <p className="text-red-600 text-xs ">{formik.errors && formik.errors.confirmPassword || formik.errors.password}</p>
                    <FormAffirmativeButton text="Verify" disabled={!formik.isValid} isLoading={loading} />
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Reset;
