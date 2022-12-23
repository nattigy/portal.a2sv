import clsx from "clsx";
import { Field, FormikProps } from "formik";
import React, { useRef } from "react";

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
    <div className=" rounded-full w-full h-8 flex flex-shrink-0 justify-start relative items-center outline-none focus:outline-none appearance-none">
      <div className="flex items-center justify-center absolute right-2 top-0 w-8 h-8 z-10">
        {props.icon}
      </div>
      <Field
        as="select"
        name={props.name}
        className={clsx(
          "bg-white w-full h-12 px-10 border rounded-md appearance-none caret-transparent",
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
