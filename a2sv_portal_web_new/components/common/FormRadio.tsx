import clsx from "clsx";
import { Field } from "formik";
import React from "react";

type Props = {
  id: string;
  name: string;
  value: string;
  valueName: string;
  className: string;
  checked?: boolean;
};

const FormRadio = (props: Props) => {
  return (
    <div className="flex items-center gap-x-1">
      <div className="flex justify-center align-center w-4 h-4 rounded-full border-1">
        <Field
          className={clsx(props.className, "cursor-pointer h-full w-full")}
          id={props.id}
          type="radio"
          name={props.name}
          value={props.value}
        />
      </div>
      <label htmlFor={props.id} className=" text-sm leading-4 font-normal">
        {props.valueName}
      </label>
    </div>
  );
};

export default FormRadio;
