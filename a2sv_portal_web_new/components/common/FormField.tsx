import { clsx } from "clsx";
import { Field, FormikErrors, FormikTouched } from "formik";
import React from "react";

type Props = {
  id: string;
  name: string;
  placeholder: string;
  error?: string;
  touched?: boolean;
  props?: any;
};

const FormField = (props: Props) => {
  return (
    <div className="flex flex-col w-full">
      <Field
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        type="text"
        className={clsx(
          "w-full text-sm placeholder-[#949494] border resize-none bg-white rounded-md focus:outline-none py-3 px-4 my-2",
          props.error ? "border-red-500" : "border-[#DCDCDC]"
        )}
        {...props.props}
      />
      {props.error && (
        <div className="bg-red-400/20 w-full mt-2 p-2 px-4 rounded-md">
          <p className="w-full text-xs text-red-400">{props.error}</p>
        </div>
      )}
    </div>
  );
};

export default FormField;
