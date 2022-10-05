import { Field, FormikProps } from "formik";
import React from "react";
import { Menu } from "@headlessui/react";
import clsx from "clsx";

export type DurationFieldProps = {
  name: string;
  placeholder: string;
  formik: FormikProps<any>;
  className: string;
};

const DivisionDropdownField = (props: DurationFieldProps) => {
  const isError =
    (props.formik.errors as any)[props.name] &&
    (props.formik.touched as any)[props.name];
  const errorMessage = (props.formik.errors as any)[props.name];
  return (
    <div className="w-full flex justify-between items-center">
      <div className="w-full flex justify-between">
        <div className="w-full px-2">
          <div className="bg-white dark:bg-gray-100 rounded-full w-full h-8 flex flex-shrink-0 justify-start items-center relative">
            <Field
              as="select"
              name={props.name}
              className={clsx(
                props.className,
                isError ? "border border-red-500" : "border border-[#D2D2D2]"
              )}
            >
              <option className="h-20" value="" selected disabled hidden>
                Select Division
              </option>
              <option value="Div 1">Div 1</option>
              <option value="Div 2">Div 2</option>
              <option value="Div 3">Div 3</option>
            </Field>
            <div className="absolute left-3">
              <svg
                className="w-6 h-6"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.7801 13.1238C12.8784 12.9308 13.0171 12.7576 13.1884 12.6143C13.3596 12.4709 13.5599 12.3603 13.7777 12.2888C13.9955 12.2173 14.2265 12.1863 14.4573 12.1976C14.6882 12.2089 14.9143 12.2622 15.1227 12.3546C15.5529 12.6031 15.891 12.9666 16.0921 13.3966C16.2931 13.8267 16.3475 14.303 16.2482 14.7623C16.2073 15.2139 15.9921 15.637 15.6418 15.9546C15.2914 16.2723 14.8292 16.4633 14.3391 16.4931M14.3391 16.4931V17.7931M11.4712 18.5623C13.9722 17.6931 16.4733 17.1777 19.1244 18.1546L19.6913 23.3623C18.9404 24.9351 17.8181 26.3333 16.4066 27.4547C14.2974 26.5663 12.6173 24.9915 11.6879 23.0316L11.4712 18.5623Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                />
                <path
                  d="M12.7799 13.1226L11.5377 13.2303L12.3714 8.03028C12.1296 7.22259 11.1959 6.49181 10.8041 6.76874C9.22843 11.9765 7.66944 17.1919 7.38599 22.6996L1 29.8458C2.58399 30.0073 4.20133 30.2381 5.46019 29.8458L11.0042 25.7227C11.118 25.6208 11.2542 25.5426 11.4036 25.4934C11.553 25.4442 11.7121 25.4252 11.8701 25.4376C12.0282 25.45 12.1815 25.4935 12.3197 25.5652C12.458 25.637 12.578 25.7353 12.6715 25.8534L18.574 30.915C19.9996 31.1842 20.7416 30.7611 21 30.3304L17.6653 26.2457"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                />
                <path
                  d="M12.3883 8.02994C13.172 8.11455 15.0728 8.79917 12.7051 6.59147C11.8381 5.7607 10.104 4.72223 10.821 6.7684"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                />
                <path
                  d="M12.9969 6.88464L18.1907 3.18462L18.7826 1L16.0065 1.53846L12.1382 6.15387"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                />
              </svg>
            </div>
          </div>

          <h1 className="text-xs font-light text-red-700">{errorMessage}</h1>
        </div>
      </div>
    </div>
  );
};

export default DivisionDropdownField;
