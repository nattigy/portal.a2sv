import { useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { boolean } from "yup";
import OTPField from "../../components/auth/OTPField";
import CustomTextField from "../../components/auth/TextField";
import FormAffirmativeButton from "../../components/common/FormAffirmativeButton";
import { FORGOT_PASSWORD_MUTATION } from "../../lib/apollo/Mutations/authMutations";

interface ForgotFormValues {
  email: string;
}

const INITIAL_VALUES = {
  email: "",
} as ForgotFormValues;

const Forgot = () => {
  const router = useRouter();
  const [forgotPassword, { data, loading, error }] = useMutation(FORGOT_PASSWORD_MUTATION);

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
          <h1 className="font-semibold text-3xl">Forgot Password</h1>
          <p className="font-light text-sm my-3">Please enter your email address</p>
          <Formik
            initialValues={INITIAL_VALUES}
            onSubmit={async (values: any) => {
              try {
                localStorage.setItem("email", values.email)
                await forgotPassword({
                  variables: values,
                  refetchQueries: "active",
                  notifyOnNetworkStatusChange: true,
                  onCompleted(data) {
                    router.push("/auth/verify")
                  },
                })
              } catch (error) {
                console.log("error ")
              }
            }
            }
          >
            {(formik) => (
              <div>
                <Form>
                  <div className="flex flex-col gap-2">
                    <CustomTextField
                      id="email"
                      name="email"
                      placeholder="Enter your Email"
                      type="text"
                      formik={formik}
                    />
                    <h1 className="text-red-600 font-light text-sm pt-1">
                      {error?.message}
                    </h1>
                    <FormAffirmativeButton text="Verify" isLoading={loading} />
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div >
  );
};

export default Forgot;
