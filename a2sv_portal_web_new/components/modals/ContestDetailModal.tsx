import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import clsx from "clsx";
import FormAffirmativeButton from "../common/FormAffirmativeButton";
import FormRejectButton from "../common/FormRejectButton";
import FormRadio from "../common/FormRadio";
import { UPDATE_USER_CONTEST_PROBLEM } from "../../lib/apollo/Mutations/contestMutations";
import { ApolloError, useMutation } from "@apollo/client";
import { ContestProblem, ContestStatus } from "../../types/contest";

export enum QuestionStatus {
  SOLVED_IN = "SOLVED_IN",
  SOLVED_AFTER = "SOLVED_AFTER",
  NOT_SOLVED = "NOT_SOLVED",
  UNABLE_TO_SOLVE = "UNABLE_TO_SOLVE",
}

interface FormValues {
  status: ContestStatus;
  numberOfMinutes: number;
  numberOfAttempts: number;
}

type Props = {
  userId: string;
  contestProblemData: ContestProblem;
  onClose: () => void;
};
const ContestDetailModal = ({userId, contestProblemData, onClose}: Props) => {
  const [updateContestProblem, { error }] = useMutation(
    UPDATE_USER_CONTEST_PROBLEM
  );

  const INITIAL_VALUES: FormValues = {
    status: contestProblemData.status || ContestStatus.NOT_SOLVED,
    numberOfMinutes: contestProblemData.numberOfMinutes || 0,
    numberOfAttempts: contestProblemData.numberOfAttempts || 0,
  };

  const FORM_VALIDATION = yup.object().shape({
    status: yup.string().required("Required"),
    numberOfMinutes: yup.number().min(0).required("Required"),
    numberOfAttempts: yup.number().min(0).required("Required"),
  });

  return (
    <>
      <div className=" transition-all duration-200 py-8 text-[#565656] w-screen h-screen absolute top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-30 z-50">
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={FORM_VALIDATION}
          onSubmit={async (values, actions) => {
            await updateContestProblem({
              variables: {
                updateUserContestProblemInput: {
                  contestId: contestProblemData.contestId,
                  numberOfAttempts: values.numberOfAttempts,
                  problemId: contestProblemData.problem.id,
                  numberOfMinutes: values.numberOfMinutes,
                  status: values.status,
                  userId: userId,
                },
              },
              refetchQueries: "active",
              notifyOnNetworkStatusChange: true,
              onCompleted: (data) => {
                onClose();
              },
              onError: (error) => {
                // setErrorMessage((error as ApolloError).message);
              },
            });
            actions.resetForm();
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div
                role="alert"
                className="flex flex-col gap-y-3 min-h-[400px] bg-white container mx-auto w-11/12 md:w-1/2 lg:w-2/5 xl:w-1/3 rounded-xl  px-10 py-5"
              >
                <div className="w-full flex flex-col items-center">
                  <div className="my-3 w-full flex justify-between items-center">
                    <h2 className="font-bold">Problem Name</h2>
                    <div
                      className="cursor-pointer"
                      onClick={() => onClose()}
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
                      <FormRadio
                        id="solved_in"
                        className="accent-green-700 focus:accent-green-700"
                        value={ContestStatus.SOLVED_IN_CONTEST}
                        // checked={QuestionStatus.SOLVED_IN == }
                        name="status"
                        valueName="Solved In"
                      />
                      <FormRadio
                        id="solved_after"
                        className="accent-primary focus:accent-primary"
                        value={ContestStatus.SOLVED_AFTER_CONTEST}
                        name="status"
                        valueName="Solved After"
                      />
                      <FormRadio
                        id="unable_to_solve"
                        className="accent-red-700 focus:accent-red-700"
                        value={ContestStatus.UNABLE_TO_SOLVE}
                        name="status"
                        valueName="Unable to Solve"
                      />
                      <FormRadio
                        id="not_solved"
                        className="accent-gray-700 focus:accent-gray-700"
                        value={ContestStatus.NOT_SOLVED}
                        name="status"
                        valueName="Not Solved"
                        checked={true}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold ">Time spent </p>
                    <Field
                      name="numberOfMinutes"
                      type="number"
                      min={0}
                      placeholder="in minutes"
                      className={clsx(
                        "border-2 w-24 rounded-md px-2 py-1 text-sm ",
                        touched.numberOfMinutes && errors.numberOfMinutes
                          ? "border-red-500"
                          : ""
                      )}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold ">Number of Attempts </p>
                    <Field
                      name="numberOfAttempts"
                      type="number"
                      min={0}
                      // placeholder="in minutes"
                      className={clsx(
                        "border-2 w-24 rounded-md px-2 py-1 text-sm ",
                        touched.numberOfAttempts && errors.numberOfAttempts
                          ? "border-red-500"
                          : ""
                      )}
                    />
                  </div>
                  {error && (
                    <div className="bg-[#E4646451] py-1 rounded-md">
                      <span className="text-[#E46464] px-4 text-xs">
                        Unable to update your contest status!
                      </span>
                    </div>
                  )}
                  <div className="flex justify-end items-center gap-x-3">
                    <FormRejectButton
                      text="Cancel"
                      onClick={() => onClose()}
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
