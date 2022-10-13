import clsx from "clsx";
import { Field } from "formik";
import React from "react";

export type optionsProp = {
  name: string;
  value: any;
};

type Props = {
  name: string;
  placeholder: string;
  error?: string;
  icon?: any;
  touched?: boolean;
  options: optionsProp[];
};

const FormDropdown = (props: Props) => {
  return (
    <div className=" rounded-full w-full h-8 flex flex-shrink-0 justify-start items-center relative">
      {props.icon}
      <Field
        as="select"
        name={props.name}
        className={clsx(
          "bg-white w-full h-12 px-8 border rounded-md",
          props.touched && props.error ? "border-red-500" : ""
        )}
      >
        <option className="h-20" value="" selected disabled hidden>
          {props.placeholder}
        </option>

        {props.options.map((option: optionsProp, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
        
      </Field>
    </div>
  );
};

export default FormDropdown;
