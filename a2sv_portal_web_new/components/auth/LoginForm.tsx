import React, { useState } from "react";
import { Formik, Form } from "formik";
import CustomTextField from "../../components/auth/TextField";
import Link from "next/link";
import { useRouter } from "next/router";
import { ApolloError, useMutation } from "@apollo/client";
import { SIGN_IN_MUTATION } from "../../lib/apollo/Mutations/authMutations";
import authenticatedVar from "../../lib/constants/authenticated";

export interface FormValues {
  email: string;
  password: string;
}

const INITIAL_VALUES = {
  email: "",
  password: "",
} as FormValues;

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [signin] = useMutation(SIGN_IN_MUTATION);
  const router = useRouter();
  return (
    <>
      <div className="w-full lg:w-[28vw] border bg-white text-[#434343] py-16 px-10 rounded-lg">
        <h1 className="text-3xl font-Poppins font-semibold mb-3">Login</h1>
        <p className="text-sm font-Poppins font-light ">
          Hey, Enter your details to sign in
        </p>
        <p className="text-sm font-Poppins font-light mb-2">
          {" "}
          to your account{" "}
        </p>
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={async (values: any) => {
            setIsLoading(true);
            try {
              await signin({
                variables: {
                  loginInput: values,
                },
                refetchQueries: "active",
                notifyOnNetworkStatusChange: true,
                onError: (error) => {
                  setErrorMessage(error.message);
                  setIsLoading(false);
                },
                onCompleted: (data) => {
                  authenticatedVar(true);
                  setIsLoading(false);
                  router.replace("/");
                },
              });
            } catch (error) {
              setErrorMessage((error as ApolloError).message);
            }
          }}
        >
          {(formik) => (
            <div>
              <Form>
                <CustomTextField
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  formik={formik}
                />
                <CustomTextField
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  formik={formik}
                />
                {errorMessage && (
                  <div className="bg-[#E4646451] py-1 rounded-md">
                    <span className="text-[#E46464] px-4 text-xs">
                      {errorMessage}
                    </span>
                  </div>
                )}
                <div className="mt-3">
                  <Link href="/">
                    <span className="text-sm text-[#434343] font-Poppins font-light cursor-pointer">
                      Forgot Password?
                    </span>
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-x-3  px-6 py-2 mt-4 text-sm font-bold text-white bg-[#5956E9] rounded-lg"
                >
                  {isLoading && (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  Sign In
                </button>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default LoginForm;
