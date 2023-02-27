import React, { useState } from "react";
import * as yup from "yup";
import { format, setHours, setMinutes, setSeconds } from "date-fns";
import { Form, Formik } from "formik";
import { ApolloError, useMutation } from "@apollo/client";
import router from "next/router";
import Button from "../common/Button";
import ContestInfoItem from "../newcontest/ContestInfoItem";
import QuestionsItem from "../newcontest/QuestionsItem";
import {
  CREATE_CONTEST,
  EDIT_CONTEST,
} from "../../lib/apollo/Mutations/contestMutations";
import { Contest } from "../../types/contest";
import { ProblemType } from "../../types/problems";

type Props = {
  selectedQuestions: ProblemType[];
  contest?: Contest;
  setSelectedQuestions: React.Dispatch<React.SetStateAction<ProblemType[]>>;
  setSelectedQuestionsId: React.Dispatch<React.SetStateAction<Set<string>>>;
  isEditing?: boolean;
};

export type ContestInfoValues = {
  id: number;
  name: string;
  link: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  div: string;
  questions: Array<any>;
};
const ContestForm = ({
  selectedQuestions,
  contest,
  setSelectedQuestions,
  setSelectedQuestionsId,
  isEditing,
}: Props) => {
  const handleUnselectQuestion = (questionId: any) => {
    setSelectedQuestions((prev) =>
      prev.filter((item: any) => {
        return item.id != questionId;
      })
    );
    setSelectedQuestionsId(
      (prev) =>
        new Set(
          [...prev].filter((itemId: any) => {
            return itemId != questionId;
          })
        )
    );
  };

  const [addNewContest, {}] = useMutation(CREATE_CONTEST);
  const [editContest, {}] = useMutation(EDIT_CONTEST);

  const handleAddNewContest = async (values: ContestInfoValues) => {
    values.questions = selectedQuestions;
    await addNewContest({
      variables: {
        createContestInput: {
          name: values.name,
          div: values.div,
          link: values.link,
          startTime: values.startTime,
          endTime: values.endTime,
          problems: values.questions.map((item: ProblemType) => {
            return {
              problemId: item.id,
              platform: item.platform,
              difficulty: item.difficulty,
              title: item.title,
              link: item.link,
              tags: item.tags.map((tag: any) => {
                return {
                  name: tag.name,
                };
              }),
            };
          }),
        },
      },
      refetchQueries: "active",
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        router.back();
      },
    });
  };
  const handleEditContest = async (values: ContestInfoValues) => {
    values.questions = selectedQuestions;
    await editContest({
      variables: {
        updateContestInput: {
          startTime: values.startTime,
          name: values.name,
          link: values.link,
          endTime: values.endTime,
          div: values.div,
          contestId: router.query.contestId,
          problems: values.questions.map((item: ProblemType) => {
            return {
              problemId: item.id,
              platform: item.platform,
              difficulty: item.difficulty,
              title: item.title,
              link: item.link,
              tags: item.tags.map((tag: any) => {
                return {
                  name: tag.name,
                };
              }),
            };
          }),
        },
      },
      refetchQueries: "active",
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        router.back();
      },
    });
  };

  const FORM_VALIDATION = yup.object().shape({
    name: yup
      .string()
      .required("Required")
      .min(3, "Too Short!")
      .max(40, "Too Long!"),
    link: yup
      .string()
      .required("Required")
      .min(3, "Too Short!")
      .max(40, "Too Long!"),
    div: yup.string().required("Required"),
  });

  const INITIAL_VALUES = {
    name: contest?.name || "",
    link: contest?.link || "",
    div: contest?.div || "",
    startTime: contest?.startTime || new Date(),
    endTime: contest?.endTime || new Date(),
    questions: selectedQuestions,
  } as ContestInfoValues;

  return (
    <div className="flex flex-col gap-y-4">
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={FORM_VALIDATION}
        onSubmit={async (values, actions) => {
          if (isEditing) {
            await handleEditContest(values);
          } else {
            await handleAddNewContest(values);
          }
        }}
      >
        {(formik) => {
          return (
            <div className="w-full">
              <div className="flex justify-between py-2">
                <h1 className="font-bold text-2xl">
                  {isEditing ? "Edit Contest" : "Create New Contest"}
                </h1>

                <div className="py-2">
                  <Button
                    isLoading={formik.isSubmitting}
                    text={isEditing ? "Save Changes" : "Create New"}
                    onClick={formik.submitForm}
                    classname="bg-primary text-white rounded-md p-4 float-right"
                  />
                </div>
              </div>
              <Form id="profile-form" className=" gap-y-3">
                <ContestInfoItem formik={formik} />
                <QuestionsItem
                  formik={formik}
                  questions={selectedQuestions}
                  handleUnselectQuestion={handleUnselectQuestion}
                />
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default ContestForm;
