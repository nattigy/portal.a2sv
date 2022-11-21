import React, { ReactNode } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import DOBInputField from "../profile/DOBInputField";
import ContestTimeDateField from "./ContestDateField";
import DurationField from "./DurationField";
import DivisionDropdownField from "./DivisionDropdownField";
import ContestTextField from "./ContestTextField";

type Props = {
  formik: any;
};

const ContestInfoItem = ({ formik }: Props) => {
  return (
    <div className="bg-white p-4 rounded-md">
      <h1 className="p-2 font-semibold">Contest Info</h1>
      <div>
        <div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-y-3 mb-4">
            <ContestTextField
              className="w-full text-xs placeholder-[#767676] rounded-md focus:outline-none py-3 px-8"
              name="name"
              placeholder="Enter Name"
              formik={formik}
            />
            <ContestTextField
              className="w-full text-xs placeholder-[#767676] rounded-md focus:outline-none py-3 px-8 "
              name="link"
              placeholder="Enter Link"
              formik={formik}
            />
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-y-3">
            <DivisionDropdownField
              className="w-full text-xs placeholder-[#767676] rounded-md focus:outline-none py-3 px-8 "
              formik={formik}
              placeholder="Select Division"
              name="div"
            />
            <ContestTimeDateField
              className="w-full text-xs placeholder-[#767676] rounded-md focus:outline-none py-3 px-8"
              formik={formik}
              onChange={(e: any) => {
                console.log(e);
                formik.setFieldValue("date", new Date(e));
              }}
              name="date"
              type="date"
              placeholder="Enter Date"
            />
            <ContestTimeDateField
              className="w-full text-xs placeholder-[#767676] rounded-md focus:outline-none py-3 px-8 overflow-y-scroll"
              formik={formik}
              onChange={(e: any) => {
                console.log(e, "Time");
                formik.setFieldValue("time", new Date(e));
              }}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestInfoItem;
