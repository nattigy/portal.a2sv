import clsx from "clsx";
import React, { useEffect, useState } from "react";
import CustomFormField, { FormInputProps } from "./CustomFormField";

type CustomInputProps = {
  inputProps: FormInputProps;
  type: string;
  label: string;
};

const FileForm = (props: CustomInputProps) => {
  const [profile, setProfile] = useState<File>();
  const [cv, setCv] = useState<File>();
  const [preview, setPreview] = useState<string>();

  useEffect(() => {
    if (profile) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result?.toString());
      };
      reader.readAsDataURL(profile);
    } else {
      setPreview("");
    }
  }, [preview, profile]);

  return (
    <div className="w-full flex justify-between items-center p-2">
      <h1 className="text-sm font-semibold">{props.label}</h1>
      {props.type === "photo" && (
        <div
          className={clsx(
            "flex justify-center items-center w-2/3 h-full",
            (props.inputProps.formik.errors as any)[props.inputProps.name]
              ? "border border-red-500"
              : ""
          )}
        >
          <div className="w-1/5 h-32 flex justify-start">
            <img
              className="rounded-full w-12 h-12 border border-[#626262]"
              src={preview ? preview : "/images/default-profile.svg"}
              alt=""
            />
          </div>
          <label
            htmlFor="dropzone-photo"
            className="flex flex-col justify-center items-center w-full h-32 border border-[#D2D2D2] rounded-lg cursor-pointer hover:bg-gray-100 dark:border-[#D2D2D2] dark:hover:border-gray-500 dark:hover:bg-gray-200"
          >
            <div className="flex flex-col justify-center items-center pt-5 pb-6">
              <div className="bg-[#5956E91F] rounded-full">
                <svg
                  aria-hidden="true"
                  className="p-2 w-10 h-10 text-[#5956E9]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
              </div>
              <p className="leading-7 text-sm">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="leading-7 text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <CustomFormField
              id="dropzone-photo"
              name={props.inputProps.name}
              type="file"
              formik={props.inputProps.formik}
              placeholder=""
              setFile={setProfile}
            />
          </label>
        </div>
      )}
      {props.type === "file" && (
        <div className="w-2/3">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col justify-center items-center w-full h-12 border border-[#D2D2D2] rounded-lg cursor-pointer hover:bg-gray-100 dark:border-[#D2D2D2] dark:hover:border-gray-500 dark:hover:bg-gray-200"
          >
            {cv ? (
              <div className="w-full flex justify-between p-4">
                <h1>{cv.name}</h1>
              </div>
            ) : (
              <CustomFormField
                id="dropzone-file"
                name={props.inputProps.name}
                type="file"
                formik={props.inputProps.formik}
                placeholder=""
                setFile={setCv}
              />
            )}
          </label>
        </div>
      )}
    </div>
  );
};

export default FileForm;
