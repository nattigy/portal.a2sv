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
      <h1 className="text-sm font-semibold">{props.label}</h1>
      <div className="flex flex-col w-2/3 justify-between gap-y-1">
        <PhoneInput
          className={clsx(
            props.className,
            isError ? "border border-red-500" : "border border-[#D2D2D2]"
          )}
          name={props.name}
          onChange={props.onChange}
          onFocus={props.onFocus}
          placeholder={props.placeholder}
          value={props.formik.values?.phone}
        />
        <h1 className="text-xs font-light text-red-700">{errorMessage}</h1>
      </div>
    </div>
  );
};

export default PhoneInputField;
