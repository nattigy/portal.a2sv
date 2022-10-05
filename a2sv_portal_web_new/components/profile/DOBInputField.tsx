import React, { useState } from "react";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getIn, FormikProps } from "formik";
import { ProfileFormValues } from "./PersonalDetails";
import clsx from "clsx";

export type DOBInputFieldProps = {
  name: string;
  onChange: any;
  formik: FormikProps<any>;
  placeholder: string;
  className: string;
  label: string;
};

const DOBInputField = (props: DOBInputFieldProps) => {
  const isError =
    (props.formik.errors as any)[props.name] &&
    (props.formik.touched as any)[props.name];
  const errorMessage = (props.formik.errors as any)[props.name];
  return (
    <div className="w-full flex justify-between items-center p-2">
      <h1 className="text-sm font-semibold">{props.label}</h1>
      <div className="flex w-2/3 justify-between gap-x-3">
        <div className="w-full">
          <DateView
            className={clsx(
              props.className,
              isError ? "border border-red-500" : "border border-[#D2D2D2]"
            )}
            name={props.name}
            placeholderText={props.placeholder}
            selected={
              props.formik.values["dob"]
                ? new Date(props.formik.values["dob"])
                : null
            }
            onChange={props.onChange}
            shouldCloseOnSelect={false}
            dateFormat="MMMM dd, yyyy"
            adjustDateOnChange
            showYearDropdown
          />
          <h1 className="text-xs font-light text-red-700">{errorMessage}</h1>
        </div>
      </div>
    </div>
  );
};

export default DOBInputField;
