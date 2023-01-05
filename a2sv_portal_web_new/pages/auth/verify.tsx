import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { boolean } from "yup";
import OTPField from "../../components/auth/OTPField";
import CustomTextField from "../../components/auth/TextField";
import FormAffirmativeButton from "../../components/common/FormAffirmativeButton";
import { RESEND_OTP_MUTATION, RESET_PASSWORD_MUTATION, VERIFY_PASSWORD_MUTATION } from "../../lib/apollo/Mutations/authMutations";
import { differenceInMinutes, format, formatDistance, intervalToDuration } from "date-fns";
import clsx from "clsx";

interface VerifyFormValues {
  otp: string;
}


const Verify = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState({
    error: true,
    type: "fill",
    message: "",
  });
  const [verifyOtp, { data, loading, }] = useMutation(VERIFY_PASSWORD_MUTATION);
  const [resendOtp, { loading: resendLoading, }] = useMutation(RESEND_OTP_MUTATION);
  const [countDown, setCountDown] = useState(new Date())
  const resendTime = new Date(2023, 1, 3, 12, 46, 0, 0)
  const [remainingTime, setRemainingTime] = useState("")
  const [isResendActive, setIsResendActive] = useState(false)
  let timerId = setInterval(() => {
    setCountDown(new Date())
  }, 1000);

  useEffect(() => {
    return () => {
      clearInterval(timerId)
    }
  }, [])


  useEffect(() => {
    const mins = intervalToDuration({
      start: countDown,
      end: new Date(resendTime),
    }).minutes || 0

    const secs = intervalToDuration({
      start: countDown,
      end: new Date(resendTime),
    }).seconds || 0

    if (mins > 0 || secs > 0) {
      const timeLeft = `${(mins / 100)?.toFixed(2).toString().slice(2)}:${(secs / 100)?.toFixed(2).toString().slice(2)}`
      setRemainingTime(timeLeft)
    } else {
      clearInterval(timerId)
      setIsResendActive(true)
      console.log("nati")
    }
  }, [countDown])



  const INITIAL_VALUES = {
    otp: ""
  } as VerifyFormValues;

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

  const handleResend = () => {
    console.log("resend clicked")
  }

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
              try {
                await verifyOtp({
                  variables: {
                    otpCode: parseInt(otp),
                    email: typeof window !== undefined && localStorage.getItem("email") || ""
                  },
                  refetchQueries: "active",
                  notifyOnNetworkStatusChange: true,
                  onError(error) {
                    setError({
                      error: true,
                      type: "submit",
                      message: error.message,
                    });
                  },
                  onCompleted(data) {
                    localStorage.setItem("reset-token", data?.validateOtp?.accessToken)
                    router.push("/auth/reset")
                  },
                })
              } catch (error) {
                console.log("error ")
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
                    <div className="flex items-center gap-x-2" >
                      <button
                        type="button"
                        onClick={handleResend}
                        disabled={!isResendActive}
                        className={
                          clsx(
                            "font-semibold text-sm bg-transparent",
                            isResendActive ? "text-primary" : "text-gray-600"
                          )
                        }
                      >
                        Resend
                      </button>
                      <span className={
                        clsx(
                          isResendActive ? "hidden" : "flex"
                        )
                      }> {remainingTime} </span>
                    </div>
                    <FormAffirmativeButton disabled={error.error} text="Verify" isLoading={loading} />
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
