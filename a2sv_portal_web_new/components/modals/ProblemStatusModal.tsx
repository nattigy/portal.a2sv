import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import clsx from "clsx";
import FormAffirmativeButton from "../common/FormAffirmativeButton";
import FormRejectButton from "../common/FormRejectButton";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_PROBLEM_STATUS } from "../../lib/apollo/Mutations/problemsMutations";
import { ProblemStatus, UserProblem } from "../../types";
import FormRadio from "../common/FormRadio";

interface FormValues {
  status: ProblemStatus;
  time_spent: number;
  // wrong_submissions: number;
  total_attempts: number;
}

type Props = {
  onClose: () => void;
  errorMessage?: string;
  userId: string;
  topicId: string;
  seasonId: string;
  groupId: string;
  userProblem: UserProblem;
};
const ProblemStatusModal = (props: Props) => {
  const [updateProblemStatus, { error: updateError }] = useMutation(
    UPDATE_USER_PROBLEM_STATUS
  );

  const INITIAL_VALUES = {
    status: props.userProblem.status || ProblemStatus.NOT_SOLVED,
    time_spent: props.userProblem.numberOfMinutes,
    total_attempts: props.userProblem.numberOfAttempts,
  } as FormValues;

  const FORM_VALIDATION = yup.object().shape({
    status: yup.string().required("Required"),
    time_spent: yup.number().min(0).required("Required"),
    total_attempts: yup.number().min(0).required("Required"),
  });

  return (
    <>
      <div className=" transition-all duration-200 py-8 text-[#565656] w-screen h-screen absolute top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-30 z-50">
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={FORM_VALIDATION}
          onSubmit={async (values) => {
            await updateProblemStatus({
              variables: {
                updateProblemStatusInput: {
                  status: values.status,
                  numberOfMinutes: values.time_spent,
                  numberOfAttempts: values.total_attempts,
                  id: {
                    userId: props.userId,
                    topicId: props.topicId,
                    problemId: props.userProblem.problem.id,
                    seasonId: props.seasonId,
                    groupId: props.groupId,
                  },
                },
              },
              refetchQueries: "active",
              notifyOnNetworkStatusChange: true,
              onCompleted(data) {
                props.onClose();
              },
            });
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
                    <h2 className="font-bold">Problem Details</h2>
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
                      <FormRadio
                        className="accent-green-700 focus:accent-green-700"
                        id="solved"
                        name="status"
                        value={ProblemStatus.SOLVED}
                        valueName="Solved"
                      />
                      <FormRadio
                        className="accent-yellow-700 focus:accent-yellow-700"
                        id="not-solved"
                        name="status"
                        value={ProblemStatus.NOT_SOLVED}
                        valueName="Not Solved"
                      />
                      <FormRadio
                        className="accent-red-700 focus:accent-red-700"
                        id="unable-to-solve"
                        name="status"
                        value={ProblemStatus.UNABLE_TO_SOLVE}
                        valueName="Unable to Solve"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold ">Time spent (in minutes)</p>
                    <Field
                      name="time_spent"
                      type="number"
                      min={0}
                      placeholder="0"
                      className={clsx(
                        "border-2 w-24 rounded-md px-2 py-1 text-sm ",
                        touched.time_spent && errors.time_spent
                          ? "border-red-500"
                          : ""
                      )}
                    />
                  </div>
                  {/* <div className="flex justify-between items-center">
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
                  </div> */}
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold ">Total attempts </p>
                    <Field
                      name="total_attempts"
                      type="number"
                      min={0}
                      placeholder="0"
                      className={clsx(
                        "border-2 w-24 rounded-md px-2 py-1 text-sm ",
                        touched.total_attempts && errors.total_attempts
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
                    />
                  </div>
                  {props.errorMessage && (
                    <div className="bg-[#E4646451] py-1 rounded-md">
                      <span className="text-[#E46464] px-4 text-xs">
                        {props.errorMessage}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ProblemStatusModal;
