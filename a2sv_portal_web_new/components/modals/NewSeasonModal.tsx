import React, { useState } from "react";
import { Formik, Form, Field, FormikValues } from "formik";
import * as yup from "yup";
import clsx from "clsx";
import { AiOutlineUser } from "react-icons/ai";
import { ApolloError, useMutation } from "@apollo/client";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiCalendar, BiTime } from "react-icons/bi";

interface FormValues {
  season_name: string;
  start_date: string;
  end_date: string;
}

type Props = {
  onClose: () => void;
};

const NewSeasonModal = (props: Props) => {
  const INITIAL_VALUES = {} as FormValues;
  const [errorMessage, setErrorMessage] = useState("");

  const FORM_VALIDATION = yup.object().shape({
    season_name: yup.string().required("Required"),
    start_date: yup.string().required("Required"),
    end_date: yup.string().required("Required"),
  });

  return (
    <>
      <div className=" transition-all duration-200 py-8 text-[#565656] w-screen h-screen absolute top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-30 z-50">
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={FORM_VALIDATION}
          onSubmit={async (values, actions) => {}}
        >
          {({ setFieldValue, isSubmitting, values, errors, touched }) => (
            <Form>
              <div
                role="alert"
                className="flex flex-col gap-y-3 min-h-[400px] bg-white container mx-auto w-11/12 md:w-1/2 lg:w-2/5 xl:w-1/3 rounded-xl  px-8 py-5"
              >
                <div className="w-full flex flex-col">
                  <div className="my-3 w-full flex justify-between items-center">
                    <h2 className="font-semibold text-lg">Create New Season</h2>
                    <div
                      className="cursor-pointer"
                      onClick={() => props.onClose()}
                    >
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
                  <div>
                    <div>
                      <div className="w-full flex flex-col items-center">
                        <p className="tracking-wider text-md text-start text-[#949494]">
                          Add New Season where students can do specific
                          activities
                        </p>
                      </div>
                    </div>
                    <div className="my-4">
                      <div className="my-4">
                        <div className="w-full flex flex-col items-center">
                          <div className="my-2 w-full flex justify-between items-center">
                            <h2 className="font-semibold text-lg">
                              Season Name
                            </h2>
                          </div>
                        </div>
                        <div className="">
                          <div className="mt-4 flex flex-col justify-start gap-y-4">
                            <div className="flex flex-col items-center gap-y-2">
                              <div className="bg-white dark:bg-gray-100 rounded-full w-full h-8 flex flex-shrink-0 justify-start items-center relative">
                                <Field
                                  type="text"
                                  id="season_name"
                                  name="season_name"
                                  placeholder="Name"
                                  className={clsx(
                                    "w-full h-12 px-4 border rounded-md text-xs",
                                    touched.season_name && errors.season_name
                                      ? "border-red-500"
                                      : ""
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="my-4">
                      <div className="w-full flex flex-row gap-x-8">
                        <div className="w-1/2 flex flex-col items-center">
                          <div className="my-2 w-full">
                            <h2 className="font-semibold text-lg">
                              Start Date
                            </h2>
                          </div>
                          <div className="w-full flex justify-between items-center">
                            <div className="mt-4 w-full flex flex-col justify-start gap-y-4">
                              <div className="flex flex-col items-center gap-y-2">
                                <div className="bg-white dark:bg-gray-100 rounded-full w-full h-8 flex flex-shrink-0 justify-start items-center relative">
                                  <DateView
                                    autoComplete="off"
                                    className="w-full text-xs placeholder-[#767676] placeholder:text-xs rounded-md focus:outline-none border py-3 px-4 my-2"
                                    name="start"
                                    maxDate={values["end_date"] ? new Date(values["end_date"]) : null}
                                    placeholderText="Enter Start Date"
                                    selected={
                                      values["start_date"]
                                        ? new Date(values["start_date"])
                                        : null
                                    }
                                    onChange={(e: any) =>
                                      setFieldValue("start_date", e)
                                    }
                                    shouldCloseOnSelect={false}
                                    dateFormat="MMMM dd, yyyy"
                                    adjustDateOnChange
                                    showYearDropdown
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-1/2 flex flex-col items-center">
                          <div className="my-2 w-full">
                            <h2 className="font-semibold text-lg">End Date</h2>
                          </div>
                          <div className="w-full flex justify-between items-center">
                            <div className="mt-4 w-full flex flex-col justify-start gap-y-4">
                              <div className="flex flex-col items-center gap-y-2">
                                <div className="bg-white dark:bg-gray-100 rounded-full w-full h-8 flex flex-shrink-0 justify-start items-center relative">
                                  <DateView
                                    autoComplete="off"
                                    className="w-full text-xs placeholder-[#767676] rounded-md focus:outline-none border py-3 px-4 my-2"
                                    name="end"
                                    minDate={values["start_date"] ? new Date(values["start_date"]) : null}
                                    placeholderText="Enter End Date"
                                    selected={
                                      values["end_date"]
                                        ? new Date(values["end_date"])
                                        : null
                                    }
                                    onChange={(e: any) =>
                                      setFieldValue("end_date", e)
                                    }
                                    shouldCloseOnSelect={false}
                                    dateFormat="MMMM dd, yyyy"
                                    adjustDateOnChange
                                    showYearDropdown
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {errorMessage && (
                    <div className="bg-[#E4646451] py-1 rounded-md">
                      <span className="text-[#E46464] px-4 text-xs">
                        {errorMessage}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-end items-center gap-x-3">
                    <button
                      onClick={() => props.onClose()}
                      className="min-w-min px-6 py-3 mt-4 text-sm font-semibold bg-primary bg-opacity-10 text-gray-600 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="min-w-min flex items-center px-6 py-3 mt-4 text-sm font-semibold text-white bg-primary rounded-lg"
                    >
                      {/* {loading && (
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      )} */}
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default NewSeasonModal;
