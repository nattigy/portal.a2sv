import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FormikProps } from "formik";
import { ProfileFormValues } from "./ProfileInfo";
import clsx from "clsx";

export type PhoneInputFieldProps = {
  name: string;
  onFocus: any;
  onChange: any;
  formik: FormikProps<ProfileFormValues>;
  placeholder: string;
  className: string;
  label: string;
};

const PhoneInputField = (props: PhoneInputFieldProps) => {
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
      <div className="w-2/3">
        <div className="flex flex-col w-full justify-between gap-y-1">
          <PhoneInput
            className={clsx(
              props.className,
              "border",
              errorMessage ? "border-red-500" : "border-[#D2D2D2]"
            )}
            name={props.name}
            onChange={props.onChange}
            onFocus={props.onFocus}
            placeholder={props.placeholder}
            value={props.formik.values?.phone}
          />
        </div>
        {errorMessage && (
          <div className="bg-red-400/20 w-full mt-2 p-2 px-4 rounded-md">
            <p className="w-full text-xs text-red-400">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneInputField;
