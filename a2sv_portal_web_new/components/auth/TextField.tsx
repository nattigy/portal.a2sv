import clsx from "clsx";
import { Field, FormikProps } from "formik";
import React, { useState } from "react";
import { FormValues } from "./LoginForm";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export type InputProps = {
  id: string;
  name: string;
  placeholder: string;
  type: string;
  formik: FormikProps<FormValues>;
};

const CustomTextField: React.FC<InputProps> = (props: InputProps) => {
  const type = props.type;
  const [show, setShow] = useState(false);
  const hideIcon = () => {
    setShow(!show);
  };
  const isError =
    (props.formik.errors as any)[props.name] &&
    (props.formik.touched as any)[props.name];
  const errorMessage = (props.formik.errors as any)[props.name];
  return (
    <div className="flex flex-row justify-around">
      <Field
        autoComplete="off"
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        type={!show ? props.type : "text"}
        onChange={props.formik.handleChange}
        className={clsx(
          "w-full text-xs placeholder-[#767676] bg-[#EFF3F9] rounded-md focus:outline-none py-3 px-4 my-2"
          // isError
          //   ? "border border-red-500"
          //   : ""
        )}
      />
      <div className="relative flex items-center mt-1">
        {type === "password" && (
          <div className="flex absolute inset-y-0 left-0 items-center -pl-5 -ml-7 pointer-events-auto">
            {!show ? (
              <AiFillEye onClick={hideIcon} />
            ) : (
              <AiFillEyeInvisible onClick={hideIcon} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomTextField;
