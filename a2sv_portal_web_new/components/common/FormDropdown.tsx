import clsx from "clsx";
import { Field, FormikProps } from "formik";
import React, { useRef } from "react";
import { getNationality } from "../../helpers/getNationalityFlag";

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
  img?: string;
  options: optionsProp[];
};

const FormDropdown = (props: Props) => {
  return (
    <div className="relative rounded-full w-full flex flex-col flex-shrink-0 justify-center items-start outline-none focus:outline-none text-[#949494]">
      {props.img && (
        <div className="absolute left-2 z-10">
          <img src={props.img} className="w-6 rounded-full" alt="" />
        </div>
      )}
      <div className="flex flex-col items-center w-full relative">
        <div className="flex items-center justify-center absolute my-auto right-2  top-0 bottom-0 w-6  z-10">
          {props.icon}
        </div>
        <Field
          as="select"
          name={props.name}
          placeholder={props.placeholder}
          className={clsx(
            "bg-white w-full h-10 border rounded-md appearance-none caret-transparent text-sm ",
            props.error ? "border-red-500" : "",
            props.img ? "px-10" : "px-4"
          )}
        >
          <option
            className="h-20 text-lg"
            value=""
            selected
            disabled
            hidden
          >
            {props.placeholder}
          </option>

          {props.options.map((option: optionsProp, index) => (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </Field>
      </div>
      {props.error && (
        <div className="bg-red-400/20 w-full mt-2 p-2 px-4 rounded-md">
          <p className="w-full text-xs text-red-400">{props.error}</p>
        </div>
      )}
    </div>
  );
};

export default FormDropdown;
