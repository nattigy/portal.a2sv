import clsx from "clsx";
import { Field, FormikProps } from "formik";
import React from "react";
import { ProfileFormValues } from "./ProfileInfo";

export type FormInputProps = {
  id: string;
  name: string;
  placeholder: string;
  type: string;
  formik: FormikProps<ProfileFormValues>;
  options?: Array<string>;
  setFile?: React.Dispatch<React.SetStateAction<File | undefined>>;
  readOnly?: boolean;
};

const CustomFormField: React.FC<FormInputProps> = (props: FormInputProps) => {
  const isError =
    (props.formik.errors as any)[props.name] &&
    (props.formik.touched as any)[props.name];
  const errorMessage = (props.formik.errors as any)[props.name];
  return (
    <div>
      {props.type === "text" && (
        <div>
          <Field
            readOnly={props.readOnly}
            id={props.id}
            name={props.name}
            placeholder={props.placeholder}
            type="text"
            className={clsx(
              "w-full text-sm  placeholder-[#767676] rounded-md focus:outline-none py-3 px-4",
              errorMessage ? "border border-red-500" : "border border-[#D2D2D2]"
            )}
          />
          {errorMessage && (
            <div className="bg-red-400/20 w-full mt-2 p-2 px-4 rounded-md">
              <p className="w-full text-xs text-red-400">{errorMessage}</p>
            </div>
          )}
        </div>
      )}
      {props.type === "file" && (
        <input
          id={props.id}
          placeholder={props.placeholder}
          type="file"
          onChange={(event: any) => {
            props.formik.setFieldValue("file", event.target.files[0]);
            props.setFile?.(event.target.files[0]);
          }}
          className="hidden"
        />
      )}
    </div>
  );
};

export default CustomFormField;
