import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { boolean } from "yup";
import OTPField from "../../components/auth/OTPField";
import CustomTextField from "../../components/auth/TextField";
import FormAffirmativeButton from "../../components/common/FormAffirmativeButton";
import { RESEND_OTP_MUTATION, RESET_PASSWORD_MUTATION, VERIFY_PASSWORD_MUTATION } from "../../lib/apollo/Mutations/authMutations";
import { differenceInMinutes, Duration, format, formatDistance, intervalToDuration, isAfter } from "date-fns";
import clsx from "clsx";
import { useCheckOTPStatus } from "../../lib/hooks/useUsers";

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
  const [remainingTime, setRemainingTime] = useState("")
  const [isResendActive, setIsResendActive] = useState(false)
  const userEmail = typeof window !== undefined && localStorage.getItem("email") || ""
  const { data: otpStatus, refetch } = useCheckOTPStatus(userEmail)
  const [resendTime, setResendTime] = useState(new Date())
  useEffect(() => {
    let exp_time = new Date()
    if (otpStatus) {
      exp_time = new Date(new Date(otpStatus.checkOtpStatus).getTime() + 2 * 60000);
    }
    setResendTime(exp_time)
  }, [otpStatus, refetch])

  useEffect(() => {
    let timerId = setInterval(() => {
      setCountDown(new Date())
    }, 1000);


    const durations: Duration = intervalToDuration({
      start: resendTime,
      end: new Date(),
    })

    // console.log(resendTime, durations, new Date(), isAfter(resendTime, new Date()))
    // if (resendTime > new Date() && durations.minutes && durations.minutes > 0 || durations.seconds && durations.seconds > 0) {

    if (isAfter(resendTime, new Date())) {
      const timeLeft = `${(durations.minutes && durations.minutes / 100)?.toFixed(2).toString().slice(2)}:${(durations.seconds && durations.seconds / 100)?.toFixed(2).toString().slice(2)}`
      setRemainingTime(timeLeft)
      setIsResendActive(false)
    } else {
      setIsResendActive(true)
    }
    return () => {
      clearInterval(timerId)
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

  const handleResend = async () => {
    console.log("resend clicked")
    try {
      await resendOtp({
        variables: {
          email: userEmail
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
          let exp_time = new Date()
          if (otpStatus) {
            exp_time = new Date(new Date().getTime() + 2 * 60000);
          }
          setResendTime(exp_time)
          setIsResendActive(false)
        },
      })
    } catch (error) {
      console.log("error ")
    }
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
                    email: userEmail
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
