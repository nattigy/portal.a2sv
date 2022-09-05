import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import clsx from "clsx";
import { AiOutlineUser } from "react-icons/ai";
import { ApolloError, useMutation } from "@apollo/client";
import { CREATE_USER_MUTATION } from "../../lib/apollo/Mutations/usersMutations";
import { GraphqlUserRole } from "../../types/user";


interface FormValues {
  name: string;
  email: string;
  password: string;
  role: GraphqlUserRole;
}

type Props = {
  onClose: () => void;
};
const INITIAL_VALUES = {
  // status: QuestionStatus.NOT_SOLVED,
  // time_spent: 0,
  // total_attempts: 0,
  // wrong_submissions: 0
} as FormValues;

const FORM_VALIDATION = yup.object().shape({
  name: yup.string().required("Required").min(3).max(40),
  email: yup
    .string()
    .required("Required")
    .email("email should have the format user@example.com"),
  password: yup
    .string()
    .min(8)
    .required("Required")
    .min(8, "Too Short!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  role: yup.string().min(0).required("Required"),
});


const NewUserModal = (props: Props) => {
  const [addNewUser] = useMutation(CREATE_USER_MUTATION)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  return (
    <>
      <div className=" transition-all duration-200 py-8 text-[#565656] w-screen h-screen absolute top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-30 z-50">
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={FORM_VALIDATION}
          onSubmit={async (values, actions) => {
            console.log(values, " is values")
            setIsLoading(true)
            await addNewUser({
              variables: {
                createUserInput: {
                  email: values.email,
                  group: null,
                  password: values.password,
                  role: values.role
                }
              },
              refetchQueries: "active",
              notifyOnNetworkStatusChange: true,
              onCompleted: (data) => {
                setIsLoading(false)
                props.onClose()
              },
              onError: (error) => {
                setErrorMessage((error as ApolloError).message);
                setIsLoading(false)
              }
            })
            actions.resetForm()
          }}
        >
          {({ isSubmitting, handleChange, errors, touched }) => (

            <Form>
              <div
                role="alert"
                className="flex flex-col gap-y-3 min-h-[400px] bg-white container mx-auto w-11/12 md:w-1/2 lg:w-2/5 xl:w-1/3 rounded-xl  px-8 py-5"
              >
                <div className="w-full flex flex-col items-center">
                  <div className="my-3 w-full flex justify-between items-center">
                    <h2 className="font-semibold text-lg">Create New User</h2>
                    {JSON.stringify(errors)}
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
                    Add new user to the system and easily track everything.
                  </p>
                </div>
                <div className="flex flex-col gap-y-4 my-2">
                  <div className="">
                    <div className="flex flex-col justify-start gap-y-4">
                      <div>
                        <Field
                          id="name"
                          name="name"
                          placeholder="Name"
                          type="text"
                          onChange={handleChange}
                          className={clsx(
                            "w-full text-sm placeholder-[#949494] border bg-white rounded-md focus:outline-none py-3 px-4 my-2",
                            touched.name && errors.name
                              ? "border-red-500"
                              : "border-[#DCDCDC]"
                          )}
                        />
                        <p className="w-full text-xs text-red-500">
                          {errors.name}
                        </p>
                      </div>
                      <div>
                        <Field
                          id="email"
                          name="email"
                          placeholder="Email"
                          type="text"
                          onChange={handleChange}
                          className={clsx(
                            "w-full text-sm placeholder-[#949494] border bg-white rounded-md focus:outline-none py-3 px-4 my-2",
                            touched.email && errors.email
                              ? "border-red-500"
                              : "border-[#DCDCDC]"
                          )}
                        />
                        <p className="w-full text-xs text-red-500">
                          {errors.email}
                        </p>
                      </div>
                      <div>
                        <Field
                          id="password"
                          name="password"
                          placeholder="Password"
                          type="password"
                          onChange={handleChange}
                          className={clsx(
                            "w-full text-sm placeholder-[#949494] border bg-white rounded-md focus:outline-none py-3 px-4",
                            touched.password && errors.password
                              ? "border-red-500"
                              : "border-[#DCDCDC]"
                          )}
                        />
                        <p className="w-full text-xs text-red-500">
                          {errors.password}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex flex-col items-center">
                    <div className="my-3 w-full flex justify-between items-center">
                      <h2 className="font-semibold text-lg">Roles</h2>
                    </div>
                    <p className="tracking-wider text-md text-start text-[#949494]">
                      This role will be used to grant different permissions to
                      different users.
                    </p>
                  </div>
                  <div className="">
                    <div className="flex flex-col justify-start gap-y-4">
                      <div className="flex items-center">
                        <div className="bg-white dark:bg-gray-100 rounded-full w-full h-8 flex flex-shrink-0 justify-start items-center relative">
                          <AiOutlineUser
                            size={20}
                            className="absolute left-2"
                          />
                          <Field
                            as="select"
                            name="role"
                            className={clsx(
                              "w-full h-12 px-8 border rounded-md",
                              touched.role && errors.role
                                ? "border-red-500"
                                : ""
                            )}
                          >
                            <option
                              className="h-20"
                              value=""
                              selected
                              disabled
                              hidden
                            >
                              Select Role
                            </option>
                            <option value={GraphqlUserRole.STUDENT}>Student</option>
                            <option value={GraphqlUserRole.ASSISTANT}>Assistant</option>
                            <option value={GraphqlUserRole.HEAD_OF_EDUCATIONS}>Head of Education</option>
                          </Field>
                        </div>
                      </div>
                    </div>
                  </div>
                  {
                    errorMessage && (
                      <div className="bg-[#E4646451] py-1 rounded-md">
                        <span className="text-[#E46464] px-4 text-xs">
                          {errorMessage}
                        </span>
                      </div>
                    )
                  }
                  <div className="flex justify-end items-center gap-x-3">
                    <button
                      onClick={() => props.onClose()}
                      className="min-w-min px-6 py-3 mt-4 text-sm font-semibold bg-primary bg-opacity-10 text-gray-600 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="min-w-min flex px-6 py-3 mt-4 text-sm font-semibold text-white bg-primary rounded-lg"
                    >
                      {
                        isLoading && (
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        )
                      }
                      Save
                    </button>
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
