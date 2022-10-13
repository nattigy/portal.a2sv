import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import clsx from "clsx";
import { ProblemDifficultyType } from "../../types/problems";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import Tag from "../common/Tag";
import { ApolloError, useMutation } from "@apollo/client";
import {
  ADD_EXISTING_PROBLEM,
  CREATE_PROBLEM_MUTATION,
} from "../../lib/apollo/Mutations/problemsMutations";
import AutoCompleteProblems, {
  AutoCompleteProblemsProps,
  ProblemType,
} from "../common/AutoCompleteProblems";
import FormAffirmativeButton from "../common/FormAffirmativeButton";
import FormRejectButton from "../common/FormRejectButton";
import FormField from "../common/FormField";
import FormRadio from "../common/FormRadio";

interface FormValues {
  search: string;
  name: string;
  platform: string;
  difficulty: ProblemDifficultyType;
  link: string;
  tags: Array<string>[];
}

type Props = {
  onClose: () => void;
  topicId: number;
  seasonId: number;
  groupId: number;
};
const NewProblemModal = (props: Props) => {
  const [createNewProblem] = useMutation(CREATE_PROBLEM_MUTATION);
  const [addExistingProblem] = useMutation(ADD_EXISTING_PROBLEM);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const initialState: AutoCompleteProblemsProps = {
    id: 0,
    title: "",
  };
  const [display, setdisplay] = useState({
    add: true,
    create: true,
  });
  const [selected, setSelected] = useState(initialState);
  const [input, setInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [existingProblem, setExistingProblem] = useState<ProblemType | null>(
    null
  );

  const INITIAL_VALUES = {} as FormValues;

  const handleSearchProblem = (sel: ProblemType) => {
    setExistingProblem(sel);
  };
  let validationShape;
  if (existingProblem === null) {
    validationShape = yup.object().shape({
      name: yup.string().required(),
      platform: yup.string().required(),
      difficulty: yup.string().required(),
      link: yup.string().required(),
    });
  }

  const FORM_VALIDATION = validationShape;

  const onChange = (e: any) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e: any) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (
      key === "Enter" &&
      trimmedInput.length &&
      !tags.includes(trimmedInput)
    ) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setInput("");
    }
  };

  const deleteTag = (index: number) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  return (
    <>
      <div className=" transition-all duration-200 py-8 text-[#565656] w-screen h-screen absolute top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-30 z-50">
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={FORM_VALIDATION}
          onSubmit={async (values, actions) => {
            setIsLoading(true);
            if (existingProblem === null) {
              console.log("values", values);
              await createNewProblem({
                variables: {
                  createProblemInput: {
                    difficulty: values.difficulty,
                    link: values.link,
                    title: values.name,
                    tags: tags.map((tag) => {
                      return { name: tag };
                    }),
                    platform: values.platform,
                  },
                },
                refetchQueries: "active",
                notifyOnNetworkStatusChange: true,
                onCompleted: async (data) => {
                  console.log(data);
                  await addExistingProblem({
                    variables: {
                      updateGroupTopicSeasonInput: {
                        groupId: parseInt(props.groupId.toString()),
                        seasonId: parseInt(props.seasonId.toString()),
                        topicId: parseInt(props.topicId.toString()),
                        problems: [
                          {
                            problemId: parseInt(
                              data.createProblem.id.toString()
                            ),
                          },
                        ],
                      },
                    },
                    refetchQueries: "active",
                    notifyOnNetworkStatusChange: true,
                    onCompleted: (data) => {
                      console.log("SUCCESS", data);
                      setIsLoading(false);
                      props.onClose();
                    },
                    onError: (error) => {
                      console.log("error", error);
                      setErrorMessage((error as ApolloError).message);
                      setIsLoading(false);
                    },
                  });
                  props.onClose();
                },
                onError: (error) => {
                  setErrorMessage((error as ApolloError).message);
                  setIsLoading(false);
                },
              });
            } else {
              console.log("existing p id", existingProblem.id.toString());
              await addExistingProblem({
                variables: {
                  updateGroupTopicSeasonInput: {
                    groupId: parseInt(props.groupId.toString()),
                    seasonId: parseInt(props.seasonId.toString()),
                    topicId: parseInt(props.topicId.toString()),
                    problems: [
                      {
                        problemId: parseInt(existingProblem.id.toString()),
                      },
                    ],
                  },
                },
                refetchQueries: "active",
                notifyOnNetworkStatusChange: true,
                onCompleted: (data) => {
                  console.log("Add existing success", data);
                  setIsLoading(false);
                  props.onClose();
                },
                onError: (error) => {
                  setErrorMessage((error as ApolloError).message);
                  setIsLoading(false);
                },
              });
            }

            actions.resetForm();
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div
                role="alert"
                className="flex flex-col gap-y-3 min-h-fit justify-between bg-white container mx-auto w-11/12 md:w-1/2 lg:w-2/5 xl:w-1/3 rounded-xl  px-10 py-5"
              >
                <div className="w-full flex flex-col gap-y-2 items-center">
                  <div className="my-2 w-full flex justify-between items-center">
                    <h2 className="font-bold">Add New Problem</h2>
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
                    Add new problem under a topic. You can create new problem or
                    choose existing one
                  </p>
                  <div className="w-full flex flex-col justify-start gap-y-2">
                    <AutoCompleteProblems
                      handleSearchProblem={handleSearchProblem}
                    />
                    {/* <p className="w-full text-xs text-red-500">
                          {errors.search}
                        </p> */}
                  </div>
                </div>
                <div className="flex flex-col gap-y-4 my-2">
                  <div className="flex flex-col justify-start gap-y-4">
                    <div>
                      {existingProblem === null && (
                        <div className="w-full flex flex-col items-center">
                          <div className="my-3 w-full flex justify-between items-center">
                            <h2 className="font-bold">Create New</h2>
                          </div>
                          <div className="w-full">
                            <div className="flex flex-row gap-x-3 my-3">
                              <div className="flex flex-col w-3/5 justify-start gap-y-1">
                                <h1>Name</h1>
                                <div className="flex flex-col justify-start">
                                  <div className="flex items-center">
                                    <FormField
                                      id="name"
                                      name="name"
                                      placeholder="Enter problem name"
                                      error={errors.name}
                                      touched={touched.name}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col w-2/5 flex-auto justify-start gap-y-1">
                                <h1>Platform</h1>
                                <div className="flex flex-col justify-start relative">
                                  <div className="flex items-center">
                                    <img
                                      src="/icons/jira.svg"
                                      alt=""
                                      className="absolute left-3 z-10"
                                    />
                                    {/* <FormDropdown
                                      name="platform"
                                      placeholder="Select Platform"
                                      error={errors.platform}
                                      touched={touched.platform}
                                      options={[
                                        { name: "Leetcode", value: "Leetcode" },
                                        {
                                          name: "Hackerrank",
                                          value: "Hackerrank",
                                        },
                                        {
                                          name: "Codeforces",
                                          value: "Codeforces",
                                        },
                                      ]}
                                    /> */}
                                    <Field
                                      as="select"
                                      name="platform"
                                      className={clsx(
                                        "w-full text-sm border bg-white rounded-md focus:outline-none py-3 pl-8 my-2",
                                        touched.name && errors.name
                                          ? "border-red-500"
                                          : "border-[#DCDCDC]"
                                      )}
                                    >
                                      <option
                                        className="h-20"
                                        value=""
                                        selected
                                        disabled
                                        hidden
                                      >
                                        Select Platform
                                      </option>
                                      <option value="Leetcode">Leetcode</option>
                                      <option value="Hackerrank">
                                        Hackerrank
                                      </option>
                                      <option value="Codeforces">
                                        Codeforces
                                      </option>
                                    </Field>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-full">
                            <div className="flex flex-row gap-y-4 my-2 gap-x-4">
                              <h1 className="mr-4">Difficulty</h1>
                              <div className="flex gap-x-4">
                                <FormRadio
                                  className="accent-green-700 focus:accent-green-700"
                                  id="easy"
                                  name="difficulty"
                                  value={ProblemDifficultyType.EASY}
                                  valueName="Easy"
                                />
                                <FormRadio
                                  className="accent-yellow-700 focus:accent-yellow-700"
                                  id="medium"
                                  name="difficulty"
                                  value={ProblemDifficultyType.MEDIUM}
                                  valueName="Medium"
                                />
                                <FormRadio
                                  className="accent-red-700 focus:accent-red-700"
                                  id="hard"
                                  name="difficulty"
                                  value={ProblemDifficultyType.HARD}
                                  valueName="Hard"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="w-full">
                            <div className="flex flex-col gap-y-2 my-3">
                              <h2>Link</h2>
                              <div className="flex flex-col justify-start">
                                <div className="flex items-center">
                                  <FormField
                                    id="link"
                                    name="link"
                                    placeholder="Enter Problem link"
                                    error={errors.link}
                                    touched={touched.link}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-full">
                            <div className="flex flex-col justify-start gap-y-2">
                              <h1>Tags</h1>
                              <div className="flex flex-col items-start gap-y-4">
                                <div className="bg-white dark:bg-white-100 rounded-full w-3/6 h-8 my-1 flex flex-shrink-0 justify-start items-center relative">
                                  <AiOutlinePlus className="absolute left-3" />
                                  <Field
                                    id="tags"
                                    name="tags"
                                    placeholder="Add a tag and press Enter"
                                    value={input}
                                    onKeyDown={onKeyDown}
                                    onChange={onChange}
                                    type="text"
                                    className={clsx(
                                      "w-full text-xs placeholder-[#949494] border bg-white rounded-md focus:outline-none py-3 px-4 pl-8",
                                      touched.name && errors.name
                                        ? "border-red-500"
                                        : "border-[#DCDCDC]"
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="flex flex-row flex-wrap gap-x-2">
                                {tags.map((tag: any, index: number) => (
                                  <Tag value={tag} key={index}>
                                    <p className="text-xs">{tag}</p>
                                    <IoMdClose
                                      onClick={() => deleteTag(index)}
                                    />
                                  </Tag>
                                ))}
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
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end items-center gap-x-3">
                  <FormRejectButton
                    text="Cancel"
                    onClick={() => props.onClose()}
                  />
                  <FormAffirmativeButton isLoading={isSubmitting} text="Save" />{" "}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default NewProblemModal;
