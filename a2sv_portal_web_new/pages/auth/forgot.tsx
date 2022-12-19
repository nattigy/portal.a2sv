import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { boolean } from "yup";
import OTPField from "../../components/auth/OTPField";
import CustomTextField from "../../components/auth/TextField";
import FormAffirmativeButton from "../../components/common/FormAffirmativeButton";

interface ForgotFormValues {
  email: string;
}

const INITIAL_VALUES = {
  email: "",
} as ForgotFormValues;

const Forgot = () => {
  const router = useRouter();
  const [error, setError] = useState("");

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
            onSubmit={async (values, actions) => () => {}}
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
                      {error}
                    </h1>

                    <FormAffirmativeButton text="Verify" isLoading={false} />
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

export default Forgot;
