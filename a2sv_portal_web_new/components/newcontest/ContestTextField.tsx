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
  const [value, setValue] = useState(props.formik.values[props.name]);

  return (
    <div className="w-full flex justify-between items-center">
      <div className="w-full flex justify-between">
        <div className="w-full px-2">
          <Field
            className={clsx(
              props.className,
              isError ? "border border-red-500" : "border border-[#D2D2D2]"
            )}
            name={props.name}
            placeholder={props.placeholder}
            type="text"
          />
        </div>
        {/* <h1 className="text-xs font-light text-red-700">{errorMessage}</h1> */}
      </div>
    </div>
  );
};

export default ContestTextField;
