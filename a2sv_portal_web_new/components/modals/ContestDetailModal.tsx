import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import clsx from "clsx";
import FormAffirmativeButton from "../common/FormAffirmativeButton";
import FormRejectButton from "../common/FormRejectButton";

export enum QuestionStatus {
  SOLVED = "SOLVED",
  NOT_SOLVED = "NOT_SOLVED",
  UNABLE_TO_SOLVE = "UNABLE_TO_SOLVE",
}

interface FormValues {
  status: QuestionStatus;
  time_spent: number;
  wrong_submissions: number;
}

type Props = {
  onClose: () => void;
};
const ContestDetailModal = (props: Props) => {
  const INITIAL_VALUES = {
    // status: QuestionStatus.NOT_SOLVED,
    // time_spent: 0,
    // total_attempts: 0,
    // wrong_submissions: 0
  } as FormValues;

  const FORM_VALIDATION = yup.object().shape({
    status: yup.string().required("Required"),
    time_spent: yup.number().min(0).required("Required"),
    wrong_submissions: yup.number().min(0).required("Required"),
  });

  return (
    <>
      <div className=" transition-all duration-200 py-8 text-[#565656] w-screen h-screen absolute top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-30 z-50">
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={FORM_VALIDATION}
          onSubmit={() => {}}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div
                role="alert"
                className="flex flex-col gap-y-3 min-h-[400px] bg-white container mx-auto w-11/12 md:w-1/2 lg:w-2/5 xl:w-1/3 rounded-xl  px-10 py-5"
              >
                <div className="w-full flex flex-col items-center">
                  <div className="my-3 w-full flex justify-between items-center">
                    <h2 className="font-bold">Contest Problem Details</h2>
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
                  <p className="tracking-wider text-sm text-start">
                    Relevant information related to the question including
                    submission details
                  </p>
                </div>
                <div className="flex flex-col gap-y-4 my-2">
                  <div className="">
                    <div className="my-2">
                      <p className="text-lg font-semibold ">Status </p>
                    </div>
                    <div className="flex flex-col justify-start gap-y-4">
                      <div className="flex items-center">
                        <div className="bg-white dark:bg-gray-100 rounded-full w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                          <Field
                            id="solved"
                            type="radio"
                            value={QuestionStatus.SOLVED}
                            name="problem-status"
                            className="peer checkbox appearance-none focus:outline-none rounded-full border-2 border-green-700 checked:border-indigo-700 absolute cursor-pointer w-full h-full"
                          />
                          <div className="check-icon border-4 peer-checked:bg-indigo-700 rounded-full w-full h-full z-1" />
                        </div>
                        <label
                          htmlFor="solved"
                          className="ml-2 text-sm leading-4 font-normal text-gray-800"
                        >
                          Solved
                        </label>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-white dark:bg-gray-100 rounded-full w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                          <Field
                            id="unable-to-solve"
                            type="radio"
                            value={QuestionStatus.UNABLE_TO_SOLVE}
                            name="problem-status"
                            className="peer checkbox appearance-none focus:outline-none rounded-full border-2  border-red-700 checked:border-indigo-700 absolute cursor-pointer w-full h-full"
                          />
                          <div className="check-icon border-4 peer-checked:bg-indigo-700 rounded-full w-full h-full z-1" />
                        </div>
                        <label
                          htmlFor="unable-to-solve"
                          className="ml-2 text-sm leading-4 font-normal text-gray-800"
                        >
                          Unable to solve
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold ">Time spent </p>
                    <Field
                      name="time_spent"
                      type="number"
                      min={0}
                      placeholder="in minutes"
                      className={clsx(
                        "border-2 w-24 rounded-md px-2 py-1 text-sm ",
                        touched.time_spent && errors.time_spent
                          ? "border-red-500"
                          : ""
                      )}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold ">Wrong submissions </p>
                    <Field
                      name="wrong_submissions"
                      type="number"
                      min={0}
                      placeholder="in minutes"
                      className={clsx(
                        "border-2 w-24 rounded-md px-2 py-1 text-sm ",
                        touched.wrong_submissions && errors.wrong_submissions
                          ? "border-red-500"
                          : ""
                      )}
                    />
                  </div>
                  <div className="flex justify-end items-center gap-x-3">
                    <FormRejectButton
                      text="Cancel"
                      onClick={() => props.onClose()}
                    />
                    <FormAffirmativeButton
                      isLoading={isSubmitting}
                      text="Save"
                    />{" "}
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

export default ContestDetailModal;
