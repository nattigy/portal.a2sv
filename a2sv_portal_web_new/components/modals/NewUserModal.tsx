import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { AiOutlineUser } from "react-icons/ai";
import { ApolloError, useMutation, useReactiveVar } from "@apollo/client";
import { CREATE_USER_MUTATION } from "../../lib/apollo/Mutations/usersMutations";
import { GraphqlUserRole } from "../../types/user";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import FormAffirmativeButton from "../common/FormAffirmativeButton";
import FormRejectButton from "../common/FormRejectButton";
import FormField from "../common/FormField";
import FormDropdown from "../common/FormDropdown";

interface FormValues {
  email: string;
}

type Props = {
  onClose: () => void;
};

const FORM_VALIDATION = yup.object().shape({
  email: yup
    .string()
    .required("*Required")
    .email("Email should have the format user@example.com"),
});

const NewUserModal = (props: Props) => {
  const [addNewUser,{data,error,loading,reset}] = useMutation(CREATE_USER_MUTATION);
  const INITIAL_VALUES = {email:""} as FormValues;

  return (
    <>
      <div className="transition-all duration-200 py-8 text-[#565656] w-screen h-screen absolute top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-30 z-[100]">
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={FORM_VALIDATION}
          onSubmit={async (values, actions) => {
            await addNewUser({
              variables: {
                  email: values.email,
              },
              refetchQueries: "active",
              notifyOnNetworkStatusChange: true,
              onCompleted: (data) => {
                console.log(data)
                props.onClose();
              },
              onError(error, clientOptions) {
                setTimeout(()=>{
                  reset();
                },2000)
              },
            });
            actions.resetForm();
          }}
        >
          {({ isSubmitting, handleChange, errors, touched}) => (
            <Form>
              <div
                role="alert"
                className="flex flex-col gap-y-3 min-h-fit bg-white container mx-auto w-11/12 md:w-1/2 lg:w-2/5 xl:w-1/3 rounded-xl  px-8 py-5"
              >
                <div className="w-full flex flex-col items-center">
                  <div className="my-3 w-full flex justify-between items-center">
                    <h2 className="font-semibold text-lg">Create New User</h2>
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
                  <p className="tracking-wider text-sm font-normal text-start text-[#949494]">
                    Add new user to the system and easily track everything.
                  </p>
                </div>
                <div className="flex flex-col gap-y-4 my-2">
                  <div className="flex flex-col justify-start gap-y-4">
                    <div>
                      <FormField
                        id="email"
                        name="email"
                        placeholder="Email"
                        error={errors['email']}
                        touched={touched['email']}
                      />
                    </div>
                    <div className="flex flex-col gap-y-4">
                    </div>
                  </div>
                  {error?.message && (
                    <div className="bg-[#E4646451] py-1 rounded-md">
                      <span className="text-[#E46464] px-4 text-xs">
                        {error.message}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-end items-center gap-x-3">
                    <FormRejectButton
                      text="Cancel"
                      onClick={() => props.onClose()}
                    />
                    <FormAffirmativeButton isLoading={loading} text="Save" />
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default NewUserModal;
