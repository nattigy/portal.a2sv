import { clsx } from "clsx";
import { Field, FormikErrors, FormikTouched } from "formik";
import React from "react";

type Props = {
    id: string;
    name: string;
    placeholder: string;
    error?: string;
    touched?: boolean;
};

const FormField = (props: Props) => {
  return (
    <Field
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      type="text"
      className={clsx(
        "w-full text-sm placeholder-[#949494] border bg-white rounded-md focus:outline-none py-3 px-4 my-2",
        props.touched && props.error ? "border-red-500" : "border-[#DCDCDC]"
      )}
    />
  );
};

export default FormField;
