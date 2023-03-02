import clsx from "clsx";
import { Field, FormikProps } from "formik";
import React, { useState } from "react";

type ContestTextFieldProps = {
  name: string;
  formik: FormikProps<any>;
  placeholder: string;
  className: string;
};

const ContestTextField = (props: ContestTextFieldProps) => {
  const isError =
    (props.formik.errors as any)[props.name] &&
    (props.formik.touched as any)[props.name];
  const errorMessage = (props.formik.errors as any)[props.name];

  return (
    <div className="flex flex-col px-2">
      <div className="w-full flex justify-between items-center">
        <div className="w-full flex justify-between">
          <div className="w-full">
            <Field
              className={clsx(
                props.className,
                errorMessage ? "border border-red-500" : "border border-[#D2D2D2]"
              )}
              name={props.name}
              placeholder={props.placeholder}
              type="text"
            />
          </div>

          {/* <h1 className="text-xs font-light text-red-700">{errorMessage}</h1> */}
        </div>
      </div>
      {errorMessage && (
        <div className="bg-red-400/20 w-full mt-2 p-2 px-4 rounded-md">
          <p className="w-full text-xs text-red-400">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ContestTextField;
