import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import clsx from "clsx";
import { getNationality } from "../../helpers/getNationalityFlag";
import { ApolloError, useMutation } from "@apollo/client";
import { CREATE_GROUP_MUTATION } from "../../lib/apollo/Mutations/groupsMutations";
import FormAffirmativeButton from "../common/FormAffirmativeButton";
import FormRejectButton from "../common/FormRejectButton";
import FormField from "../common/FormField";
import FormDropdown from "../common/FormDropdown";

export enum RoleTypes {
  STUDENT = "Student",
  HOE = "Head of Education",
  HOA = "Head of Academy",
}

interface FormValues {
  name: string;
  country: string;
  school: string;
}

type Props = {
  onClose: () => void;
};
const NewGroupModal = (props: Props) => {
  const [addNewGroup] = useMutation(CREATE_GROUP_MUTATION);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const INITIAL_VALUES = {} as FormValues;

  const FORM_VALIDATION = yup.object().shape({
    name: yup.string().required("Required").min(3).max(40),
    country: yup.string().required("Required"),
    school: yup.string().required("Required"),
  });

  const [selected, setSelected] = useState("");
  const onSelect = (e: any) => {
    setSelected(e.target.value);
  };

  return (
    <>
      <div className=" transition-all duration-200 py-8 text-[#565656] w-screen h-screen absolute top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-30 z-50">
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={FORM_VALIDATION}
          onSubmit={async (values, actions) => {
            setIsLoading(true);
            await addNewGroup({
              variables: {
                createGroupInput: values,
              },
              refetchQueries: "active",
              notifyOnNetworkStatusChange: true,
              onCompleted: (data) => {
                setIsLoading(false);
                props.onClose();
              },
              onError: (error) => {
                setErrorMessage((error as ApolloError).message);
                setIsLoading(false);
              },
            });
            actions.resetForm();
          }}
        >
          {({ isSubmitting, handleChange, errors, touched, values }) => (
            <Form>
              <div
                role="alert"
                className="flex flex-col gap-y-3 min-h-fit bg-white container mx-auto w-11/12 md:w-1/2 lg:w-2/5 xl:w-1/3 rounded-xl  px-8 py-5"
              >
                <div className="w-full flex flex-col items-center">
                  <div className="my-3 w-full flex justify-between items-center">
                    <h2 className="font-semibold text-lg">Create New Group</h2>
                    <div
                      className="cursor-pointer"
                      onClick={() => props.onClose()}
                    >
                      <svg
                        className="font-bold text-gray-600"
                        width={24}
                        height={24}
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 7L7 21"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 7L21 21"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="tracking-wider text-md font-normal text-start text-[#949494]">
                    Add new group to the system and easily track everything.
                  </p>
                </div>
                <div className="w-full">
                  <div className="flex flex-col justify-start">
                    <div className="flex flex-col items-center">
                      <FormField
                        id="name"
                        placeholder="Group Name"
                        name="name"
                        touched={touched.name}
                        error={errors.name}
                      />
                      <p className="w-full text-xs text-red-500">
                        {errors.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex flex-col justify-start">
                    <div className="flex items-center my-2 relative">
                      <div className="absolute left-2 z-10">
                        <img
                          src={getNationality(values.country)}
                          className="w-6 rounded-full"
                          alt=""
                        />
                      </div>
                      <FormDropdown
                        name="country"
                        placeholder="Select Country"
                        options={[
                          { name: "Ethiopia", value: "Ethiopia" },
                          { name: "Ghana", value: "Ghana" },
                          { name: "Turkey", value: "Turkey" },
                        ]}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full my-2">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg">Institute</h2>
                  </div>
                  <div className="flex flex-col justify-start">
                    <div className="flex flex-col items-center">
                      <FormField
                        id="school"
                        name="school"
                        placeholder="School"
                        error={errors.school}
                        touched={touched.school}
                      />
                      <p className="w-full text-xs text-red-500">
                        {errors.school}
                      </p>
                    </div>
                  </div>
                </div>
                {errorMessage && (
                  <div className="bg-[#E4646451] py-1 rounded-md">
                    <span className="text-[#E46464] px-4 text-xs">
                      {errorMessage}
                    </span>
                  </div>
                )}
                <div className="flex justify-end items-center gap-x-3">
                  <FormRejectButton
                    text="Cancel"
                    onClick={() => props.onClose()}
                  />
                  <FormAffirmativeButton isLoading={isSubmitting} text="Save" />{" "}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default NewGroupModal;
