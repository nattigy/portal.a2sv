import { ApolloError, useMutation } from "@apollo/client";
import { format, setHours, setMinutes, setSeconds } from "date-fns";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import BaseLayout from "../../../components/common/BaseLayout";
import Button from "../../../components/common/Button";
import ContestInfoItem from "../../../components/newcontest/ContestInfoItem";
import NewContestSidebarItem from "../../../components/newcontest/NewContestSidebarItem";
import QuestionsItem, {
  NewContestQuestionProps,
} from "../../../components/newcontest/QuestionsItem";
import { CREATE_CONTEST_MUTATION } from "../../../lib/apollo/Mutations/contestMutations";
import { ProblemDifficultyType } from "../../../types/problems";

type Props = {};

export type ContestInfoValues = {
  id: number;
  name: string;
  link: string;
  date: Date;
  time: Date;
  hour: number;
  minute: number;
  div: string;
  questions: Array<any>;
};

const IndexPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addNewContest] = useMutation(CREATE_CONTEST_MUTATION);
  const [selectedQuestions, setSelectedQuestions] = useState<Array<any>>([]);
  const [selectedQuestionsId, setSelectedQuestionsId] = useState<Set<string>>(
    new Set()
  );
  const router = useRouter();

  const handleSelectedQuestion = (question: any) => {
    setSelectedQuestions((prev) => {
      const name = [...prev, question];
      return name;
    });
    setSelectedQuestionsId((prev) => new Set([...prev, question.id]));
  };

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

  const Sidebar: React.FC = () => {
    return (
      <NewContestSidebarItem
        selectedQuestionsId={selectedQuestionsId}
        handleSelect={handleSelectedQuestion}
      />
    );
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
    // hour: yup.number().required("Required"),
    // minute: yup.number().required("Required").min(1),
    // questions: yup.array().min(1)
  });

  // const questions: Array<NewContestQuestionProps> = [
  //   {
  //     id: 1,
  //     difficulty: ProblemDifficultyType.EASY,
  //     title: "Dima and Stairs Dima and Stairs Dima and Stairs",
  //     tags: [
  //       "Dynamic Prograaming",
  //       "Greedy",
  //       "Stack",
  //       "Queue",
  //       "Hash Table",
  //       "Stack",
  //       "Dynamic Programming",
  //     ],
  //   },
  //   {
  //     id: 2,
  //     difficulty: ProblemDifficultyType.MEDIUM,
  //     title: "Dima and Stairs",
  //     tags: ["Dynamic Prograaming", "Greedy"],
  //   },
  //   {
  //     id: 3,
  //     difficulty: ProblemDifficultyType.HARD,
  //     title: "Dima and Stairs",
  //     tags: ["Dynamic Prograaming", "Greedy"],
  //   },
  // ];

  const INITIAL_VALUES = {
    name: "",
    link: "",
    hour: 0,
    minute: 0,
    div: "",
    date: new Date(),
    time: new Date(),
    questions: selectedQuestions,
  } as ContestInfoValues;

  return (
    <BaseLayout sidebar={<Sidebar />}>
      <div className="flex flex-col gap-y-4">
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={FORM_VALIDATION}
          onSubmit={async (values, actions) => {
            let startDate = values.date;
            startDate = setHours(startDate, values.time.getHours());
            startDate = setMinutes(startDate, values.time.getMinutes());
            startDate = setSeconds(startDate, values.time.getSeconds());
            let endDate = startDate;
            endDate = setHours(endDate, startDate.getHours() + values.hour);
            endDate = setMinutes(
              endDate,
              startDate.getMinutes() + values.minute
            );
            values.questions = selectedQuestions;
            const createContestInput = {
              name: values.name,
              div: values.div,
              link: values.link,
              startTime: startDate,
              endTime: endDate,
              problems: values.questions.map((item: any) => {
                return {
                  id: item.id,
                };
              }),
            };
            setIsLoading(true);
            await addNewContest({
              variables: {
                createContestInput: createContestInput,
              },
              refetchQueries: "active",
              notifyOnNetworkStatusChange: true,
              onCompleted: (data) => {
                setIsLoading(false);
                router.back();
                console.log("Completed", data);
              },
              onError: (error) => {
                setErrorMessage((error as ApolloError).message);
                console.log(error);
                setIsLoading(false);
              },
            });
          }}
        >
          {(formik) => {
            return (
              <div className="w-full">
                <div className="flex justify-between py-2">
                  <h1 className="font-bold text-2xl">Create New Contest</h1>
                  <div className="py-2">
                    <Button
                      isLoading={isLoading}
                      text="Create"
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
    </BaseLayout>
  );
};

export default IndexPage;
