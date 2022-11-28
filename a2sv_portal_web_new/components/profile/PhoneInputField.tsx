import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import PropTypes from "prop-types";
import "react-phone-number-input/style.css";
import { getIn, FormikProps } from "formik";
import { ProfileFormValues } from "./ProfileInfo";

export type PhoneInputFieldProps = {
  name: string;
  onChange: any;
  formik: FormikProps<ProfileFormValues>;
  placeholder: string;
  className: string;
  label: string;
  country: string;
};

const PhoneInputField = (props: PhoneInputFieldProps) => {
  return (
    <div className="w-full flex justify-between items-center p-2">
      <h1 className="text-sm font-semibold">{props.label}</h1>
      <div className="flex w-2/3 justify-between gap-x-3">
        <PhoneInput
          className={props.className}
          name={props.name}
          onChange={props.onChange}
          placeholder={props.placeholder}
          value={props.formik.values?.phone}
          defaultCountry={props.country as any}

        />
      </div>
      {/* <div className="flex h-5 items-end text-red-100 text-xs">
          {isError && getIn(errors, name)}
        </div> */}
    </div>
  );
};

export default PhoneInputField;
