import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { boolean } from "yup";
import OTPField from "../../components/auth/OTPField";
import CustomTextField from "../../components/auth/TextField";
import FormAffirmativeButton from "../../components/common/FormAffirmativeButton";

interface VerifyFormValues {
  otp: string;
}

const INITIAL_VALUES = {
  otp: "",
} as VerifyFormValues;

const Verify = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState({
    error: true,
    type: "fill",
    message: "",
  });
  const onChange = (value: string) => {
    setOtp(value);
    console.log(value, value.length, "OTP")
    if (value.length < 6) {
      setError({
        error: true,
        type: "fill",
        message: "",
      });
    } else {
      setError({
        error: false,
        type: "fill",
        message: "",
      });
    }
  };

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
          <h1 className="font-semibold text-3xl">Verify Password</h1>
          <p className="font-light text-sm my-3">
            Please enter the verification code sent to the email address
            <span className="font-bold"> ab***@gmail.com</span>
          </p>
          <Formik
            initialValues={INITIAL_VALUES}
            onSubmit={async (values, actions) => {
              values.otp = otp;
              if (values.otp !== "123456"){
                setError({
                  error: true,
                  type: "submit",
                  message: "Invalid OTP",
                });
              } 
            }}
          >
            {(formik) => (
              <div>
                <Form>
                  <div className="flex flex-col gap-2">
                    <div className="my-4">
                      <OTPField
                        value={otp}
                        valueLength={6}
                        onChange={onChange}
                        error={error}
                      />
                      <h1 className="text-red-600 font-light text-sm pt-1">
                        {error.error && error.type == "submit" && error.message}
                      </h1>
                    </div>
                    <p className="font-light text-sm">Didn&apos;t get code?</p>
                    <div
                      onClick={() => {}}
                      className="font-semibold text-sm text-primary"
                    >
                      Resend
                    </div>
                    <FormAffirmativeButton disabled={error.error} text="Verify" isLoading={false} />
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

export default Verify;