import { Formik, Form } from "formik";
import React from "react";
import CustomTextField from "../../components/auth/TextField";
import FormAffirmativeButton from "../../components/common/FormAffirmativeButton";

interface ResetFormValues {
  confirmPassword: string;
  password: string;
}

const INITIAL_VALUES = {
  password: "",
  confirmPassword: "",
} as ResetFormValues;

const reset = () => {
  return (
    <div className="min-h-screen flex items-center">
    <div className="flex flex-col gap-y-2 mx-auto h-fit border w-11/12 md:w-1/2 lg:w-2/5 xl:w-1/3 rounded-xl px-12 py-8 shadow-lg">
      <h1 className="font-semibold text-3xl">Reset Password</h1>
      <p className="font-light">Please enter a new password</p>
      <p className="font-light text-gray-500 text-xs">Password must be at least 8 characters long</p>
      <Formik initialValues={INITIAL_VALUES} onSubmit={() => {}}>
        {(formik) => (
          <div>
            <Form>
              <div className="flex flex-col gap-2">

              <CustomTextField
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                formik={formik}
              />
              <CustomTextField
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                formik={formik}
              />
              <FormAffirmativeButton
              text="Verify"
              isLoading={false}
              />
              </div>

            </Form>
          </div>
        )}
      </Formik>
    </div>
    </div>
  );
};

export default reset;
