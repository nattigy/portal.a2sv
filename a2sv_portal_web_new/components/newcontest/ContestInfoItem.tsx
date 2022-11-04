import React, { ReactNode } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import DOBInputField from "../profile/DOBInputField";
import ContestTimeDateField from "./ContestDateField";
import DurationField from "./DurationField";
import DivisionDropdownField from "./DivisionDropdownField";

export type ContestInfoValues = {
  id: number;
  date: string;
  time: string;
  hour: number;
  minute: number;
  division: string;
};

const FORM_VALIDATION = yup.object().shape({
  // firstname: yup.string().min(3, "Too Short!").max(40, "Too Long!"),
  // lastname: yup.string().min(3, "Too Short!").max(40, "Too Long!"),
  // email: yup
  //   .string()
  //   .required("Required")
  //   .email("email should have the format user@example.com"),
  // phone: yup.string().length(12),
  // linkedin: yup.string(),
  // dob: yup.date().required("Required"),
});

const ContestInfoItem = () => {
  const INITIAL_VALUES = {
    hour: 0,
    minute: 0,
    // status: QuestionStatus.NOT_SOLVED,
    // time_spent: 0,
    // total_attempts: 0,
    // wrong_submissions: 0
  } as ContestInfoValues;

  return (
    <div className="bg-white p-4 rounded-md">
      <h1 className="p-2 font-semibold">Contest Info</h1>
      <div>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(formik) => (
            <div>
              <Form id="profile-form" className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-y-3">
                <DivisionDropdownField
                  className="w-full text-xs placeholder-[#767676] rounded-md focus:outline-none py-3 px-8 "
                  formik={formik}
                  placeholder="Select Division"
                  name="division"
                />
                <ContestTimeDateField
                  className="w-full text-xs placeholder-[#767676] rounded-md focus:outline-none py-3 px-8"
                  formik={formik}
                  onChange={(e: any) => formik.setFieldValue("date", e)}
                  name="date"
                  type="date"
                  placeholder="Enter Date"
                />
                <ContestTimeDateField
                  className="w-full text-xs placeholder-[#767676] rounded-md focus:outline-none py-3 px-8 overflow-y-scroll"
                  formik={formik}
                  onChange={(e: any) => formik.setFieldValue("time", e)}
                  name="time"
                  type="time"
                  placeholder="Enter Time"
                />
                <div className="flex">
                  <DurationField
                    className="w-16 text-xs font-semibold placeholder-[#767676] rounded-md focus:outline-none py-3 px-4"
                    formik={formik}
                    name="hour"
                  />
                  <DurationField
                    className="w-16 text-xs font-semibold placeholder-[#767676] rounded-md focus:outline-none py-3 px-4"
                    formik={formik}
                    name="minute"
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

export default ContestInfoItem;
