import React, { useState } from "react";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getIn, FormikProps } from "formik";
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
      <h1 className="text-sm font-semibold">
        {props.label}
        <span className="text-red-700">*</span>
      </h1>
      <div className="flex w-2/3 justify-between gap-x-3">
        <div className="w-full">
          <DateView
            className={clsx(
              props.className,
              errorMessage ? "border border-red-500" : "border border-[#D2D2D2]"
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
          {errorMessage && (
            <div className="bg-red-400/20 w-full mt-2 p-2 px-4 rounded-md">
              <p className="w-full text-xs text-red-400">{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DOBInputField;
