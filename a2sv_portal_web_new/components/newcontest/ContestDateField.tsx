import React, { useState } from "react";
import DateView from "react-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getIn, FormikProps } from "formik";
import clsx from "clsx";
import { BiCalendar, BiTime } from "react-icons/bi";

export type ContestDateFieldProps = {
  name: string;
  onChange: any;
  type?: string;
  formik: FormikProps<any>;
  placeholder: string;
  className: string;
};

const ContestTimeDateField = (props: ContestDateFieldProps) => {
  const isError =
    (props.formik.errors as any)[props.name] &&
    (props.formik.touched as any)[props.name];
  const errorMessage = (props.formik.errors as any)[props.name];
  console.log(props.type);
  return (
    <div className="w-full flex justify-between items-center">
      <div className="w-full flex justify-between">
        <div className="w-full px-2">
          <div className="relative">
            {props.type === "date" ? (
              <DateView
                className={clsx(
                  props.className,
                  isError ? "border border-red-500" : "border border-[#D2D2D2]"
                )}
                name={props.name}
                placeholderText={props.placeholder}
                selected={
                  props.formik.values[props.name]
                    ? new Date(props.formik.values[props.name])
                    : null
                }
                onChange={props.onChange}
                shouldCloseOnSelect={false}
                dateFormat="MMMM dd, yyyy"
                adjustDateOnChange
                showYearDropdown
              />
            ) : (
              <DatePicker
                className={clsx(
                  props.className,
                  isError ? "border border-red-500" : "border border-[#D2D2D2]"
                )}
                name={props.name}
                placeholderText={props.placeholder}
                showTimeSelect
                showTimeSelectOnly
                selected={
                  props.formik.values[props.name]
                    ? new Date(props.formik.values[props.name])
                    : null
                }
                onChange={props.onChange}
                dateFormat="h:mm aa"
              />
            )}
            {props.type &&
              (props.type === "date" ? (
                <BiCalendar className="absolute top-1/3 left-2" />
              ) : (
                <BiTime className="absolute top-1/3 left-2" />
              ))}
          </div>
          <h1 className="text-xs font-light text-red-700">{errorMessage}</h1>
        </div>
      </div>
    </div>
  );
};

export default ContestTimeDateField;
