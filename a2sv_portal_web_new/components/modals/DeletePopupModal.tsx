import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import clsx from "clsx";
import { getNationality } from "../../helpers/getNationalityFlag";
import { ApolloError, useMutation } from "@apollo/client";
import { CREATE_GROUP_MUTATION } from "../../lib/apollo/Mutations/groupsMutations";
import FormAffirmativeButton from "../common/FormAffirmativeButton";
import FormRejectButton from "../common/FormRejectButton";
import FormField from "../common/FormField";
import FormDropdown from "../common/FormDropdown";
import Button from "../common/Button";
import { BiTrash } from "react-icons/bi";

export enum RoleTypes {
  STUDENT = "Student",
  HOE = "Head of Education",
  HOA = "Head of Academy",
}

interface FormValues {
  name: string;
  country: string;
  school: string;
}

type Props = {
  onClose: () => void;
  title: string;
  description: string;
};

const DeletePopupModal = (props: Props) => {
  const [errorMessage, setErrorMessage] = useState("");

  const INITIAL_VALUES = {} as FormValues;

  const FORM_VALIDATION = yup.object().shape({
    name: yup.string().required("Required").min(3).max(40),
    country: yup.string().required("Required"),
    school: yup.string().required("Required"),
  });

  const [selected, setSelected] = useState("");
  const onSelect = (e: any) => {
    setSelected(e.target.value);
  };

  return (
    <>
      <div className=" transition-all duration-200 py-8 text-[#565656] w-screen h-screen absolute top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-30 z-50">
        <div
          role="alert"
          className="flex flex-col gap-y-2 min-h-fit bg-white container mx-auto w-11/12 md:w-1/2 lg:w-2/5 xl:w-1/3 rounded-xl  px-8 py-5"
        >
          {/* <div className="w-full flex flex-col items-center">
            <div className="mt-3 w-full flex justify-between items-center">
              <h2 className="font-semibold text-lg">Assign User</h2>
              {JSON.stringify(selected)}

              <div className="cursor-pointer" onClick={() => props.onClose()}>
                <svg
                  className="font-bold text-gray-600"
                  width={24}
                  height={24}
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 7L7 21"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 7L21 21"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div> */}

          <div className="flex flex-col h-full gap-y-4 items-center justify-between">
            {/* <div className="cursor-pointer" onClick={() => props.onClose()}>
              <svg
                className="font-bold text-gray-600"
                width={24}
                height={24}
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 7L7 21"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 7L21 21"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div> */}

            <div className="rounded-full border-2 border-[#D72B2B] p-2">
              <BiTrash color="#D72B2B" size={36} />
            </div>
            <div className="flex flex-col items-center gap-y-1">
              <h1 className="font-bold text-lg">{props.title}</h1>
              <h1 className="font-semibold text-md text-[#A6A6A6]">
                {props.description}
              </h1>
            </div>
            <div className="w-full flex flex-col">
              <h1 className="font-semibold text-center text-md text-[#A6A6A6]">
                Are you sure?
              </h1>
              <div className="flex justify-end gap-x-2">
                <Button
                  text="Cancel"
                  classname="bg-white text-[#565656] font-semibold text-sm h-10"
                  onClick={() => props.onClose()}
                />
                <Button
                  text="Delete"
                  onClick={() => {}}
                  classname="text-white bg-[#D72B2B] font-semibold text-sm h-10"
                />
              </div>
            </div>
            {errorMessage && (
              <div className="bg-[#E4646451] py-1 rounded-md">
                <span className="text-[#E46464] px-4 text-xs">
                  {errorMessage}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletePopupModal;
