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
    <div className="flex flex-col gap-2 bg-white p-4">
      <h1 className="px-2 font-semibold">Contest Info</h1>
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
              <Form id="profile-form" className="w-full flex gap-y-2">
                <ContestTimeDateField
                  className="w-full text-xs placeholder-[#767676] rounded-md focus:outline-none py-3 px-8 my-2"
                  formik={formik}
                  onChange={(e: any) => formik.setFieldValue("date", e)}
                  name="date"
                  type="date"
                  placeholder="Enter Date"
                />
                <ContestTimeDateField
                  className="w-full text-xs placeholder-[#767676] rounded-md focus:outline-none py-3 px-8 my-2 overflow-y-scroll"
                  formik={formik}
                  onChange={(e: any) => formik.setFieldValue("time", e)}
                  name="time"
                  type="time"
                  placeholder="Enter Time"
                />
                <div className="flex ">
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
                <DivisionDropdownField
                  className="w-full text-xs placeholder-[#767676] rounded-md focus:outline-none py-3 px-8 my-2"
                  formik={formik}
                  placeholder="Select Division"
                  name="division"
                />
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContestInfoItem;
