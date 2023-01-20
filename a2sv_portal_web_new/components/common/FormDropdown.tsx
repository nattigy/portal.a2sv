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
  flag?: string ;
  options: optionsProp[];
};

const FormDropdown = (props: Props) => {
  return (
    <div className=" rounded-full w-full h-8 flex flex-shrink-0 justify-start relative items-center outline-none focus:outline-none">
      <div className="flex items-center justify-center absolute my-auto text-[#949494] right-2 top-0 bottom-0 w-6 h-6 z-10">
        {props.icon}
      </div>
      {props.flag && (
        <div className="absolute left-2 z-10">
          <img
            src={props.flag}
            className="w-6 rounded-full"
            alt=""
          />
        </div>
      )}
      <Field
        as="select"
        name={props.name}
        placeholder={props.placeholder}
        className={clsx(
          "bg-white w-full h-12  border rounded-md appearance-none caret-transparent text-xs",
          props.touched && props.error ? "border-red-500" : "",
          props.flag?"px-10":"px-4"
        )}
      >
        {/* <option className="h-20 text-pink-400" value="" selected disabled hidden>
          {props.placeholder}
        </option> */}

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
