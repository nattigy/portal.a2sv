import clsx from "clsx";
import { Field, FormikProps } from "formik";
import React, { useState } from "react";
import { BiCalendar, BiTime } from "react-icons/bi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { zeroPad } from "../../helpers/zeropad";

export type DurationFieldProps = {
  name: string;
  formik: FormikProps<any>;
  className: string;
};
const DurationField = (props: DurationFieldProps) => {
  const isError =
    (props.formik.errors as any)[props.name] &&
    (props.formik.touched as any)[props.name];
  const errorMessage = (props.formik.errors as any)[props.name];
  const [value, setValue] = useState(props.formik.values[props.name])

  const increment = () => {
    if (value < 59) {
      setValue(value+1)
    }
  }

  const decrement = () => {
    if (value > 0) {
      setValue(value+1)
    }
  }

  return (
    <div className="w-full flex justify-between items-center">
      <div className="w-full flex justify-between">
        <div className="w-full px-2">
          <div className="relative">
            <Field
              className={clsx(
                props.className,
                isError ? "border border-red-500" : "border border-[#D2D2D2]"
              )}
              name={props.name}
              value={zeroPad(value, 2)}
              type="text"
            />
            <div className="flex flex-col absolute top-1 right-1">
              <FiChevronUp onClick={increment} size={16} />
              <FiChevronDown onClick={decrement} size={16} />
            </div>
          </div>
          <h1 className="text-xs font-light text-red-700">{errorMessage}</h1>
        </div>
      </div>
    </div>
  );
};

export default DurationField;
