import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import CustomTextField from "../../components/auth/TextField";
import Link from "next/link";

export interface FormValues {
  email: string;
  password: string;
}

const INITIAL_VALUES = {
  email: "",
  password: "",
} as FormValues;

const FORM_VALIDATION = yup.object().shape({
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
});

const LoginForm = () => {
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
          onSubmit={(values: any) => {
            console.log(values);
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
                {/* <div className="bg-[#E4646451] py-1 rounded-md">
                  <span className="text-[#E46464] px-4 text-xs">
                    Invalid Email or Password
                  </span>
                </div> */}
                <div className="mt-3">
                  <Link href="/">
                    <span className="text-sm text-[#434343] font-Poppins font-light cursor-pointer">
                      Forgot Password?
                    </span>
                  </Link>
                </div>
                <button className="w-full px-6 py-2 mt-4 text-sm font-bold text-white bg-[#5956E9] rounded-lg">
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
