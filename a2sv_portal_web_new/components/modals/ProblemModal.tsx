import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import clsx from "clsx";
import { ProblemDifficultyType, ProblemType } from "../../types/problems";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import Tag from "../common/Tag";
import { ApolloError, useMutation } from "@apollo/client";
import {
  ADD_PROBLEM_TO_SEASON_TOPIC,
  CREATE_PROBLEM,
  UPDATE_PROBLEM,
} from "../../lib/apollo/Mutations/problemsMutations";
import FormAffirmativeButton from "../common/FormAffirmativeButton";
import FormRejectButton from "../common/FormRejectButton";
import FormField from "../common/FormField";
import FormRadio from "../common/FormRadio";
import ProblemsAutocomplete from "../problems/ProblemsAutocomplete";
import CloseIcon from "../common/CloseIcon";

interface FormValues {
  search: string;
  name: string;
  platform: string;
  difficulty: ProblemDifficultyType;
  link: string;
  tags: Array<string>;
}

type Props = {
  onClose: () => void;
  isEditing: boolean;
  topicId?: string;
  seasonId?: string;
  problem?: ProblemType;
  addProblemToSeasonTopic?: boolean;
};

const ProblemModal = (props: Props) => {
  const [createProblem] = useMutation(CREATE_PROBLEM);
  const [editProblem] = useMutation(UPDATE_PROBLEM);
  const [addProblemToSeasonTopic] = useMutation(ADD_PROBLEM_TO_SEASON_TOPIC);

  const [errorMessage, setErrorMessage] = useState("");

  const [input, setInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [existingProblem, setExistingProblem] = useState<ProblemType | null>(
    null
  );
  useEffect(() => {
    setTags(props.problem?.tags.map((tag: any) => tag.name) || []);
  }, []);

  const INITIAL_VALUES: FormValues = {
    name: props.problem?.title || "",
    search: "",
    difficulty:
      ProblemDifficultyType[
        (props.problem?.difficulty.toUpperCase() as ProblemDifficultyType) ||
          "MEDIUM"
      ],
    link: props.problem?.link || "",
    platform: props.problem?.platform || "",
    tags: [],
  };

  const handleSearchProblem = (sel: ProblemType) => {
    setExistingProblem(sel);
  };
  let validationShape;
  if (existingProblem === null) {
    validationShape = yup.object().shape({
      name: yup.string().required("*Required"),
      platform: yup.string().required("*Required"),
      difficulty: yup.string().required("*Required"),
      link: yup.string().required("*Required"),
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
  const handleAddProblemToSeasonTopic = async (problemId: string) => {
    await addProblemToSeasonTopic({
      variables: {
        problemIds: [problemId],
        seasonTopicId: {
          seasonId: props.seasonId,
          topicId: props.topicId,
        },
      },
      refetchQueries: "active",
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        props.onClose();
      },
      onError: (error) => {
        setErrorMessage((error as ApolloError).message);
      },
    });
  };
  const handleCreateProblem = async (values: FormValues) => {
    await createProblem({
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
        if (props.addProblemToSeasonTopic)
          handleAddProblemToSeasonTopic(data.createProblem.id);
        else {
          props.onClose();
        }
      },
      onError: (error) => {
        setErrorMessage((error as ApolloError).message);
      },
    });
  };
  const handleEditProblem = async (values: FormValues) => {
    await editProblem({
      variables: {
        updateProblemInput: {
          problemId: props.problem?.id,
          difficulty: values.difficulty,
          link: values.link,
          platform: values.platform,
          tags: tags.map((tag) => {
            return { name: tag };
          }),
          title: values.name,
        },
      },
      refetchQueries: "active",
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        props.onClose();
      },
      onError: (error) => {
        setErrorMessage((error as ApolloError).message);
      },
    });
  };

  return (
    <>
      <div className=" transition-all duration-200 py-8 text-[#565656] w-screen h-screen absolute top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-30 z-50">
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={FORM_VALIDATION}
          onSubmit={async (values, actions) => {
            if (props.isEditing) {
              await handleEditProblem(values);
            } else if (existingProblem === null) {
              await handleCreateProblem(values);
            } else {
              await handleAddProblemToSeasonTopic(existingProblem.id);
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
                    {props.isEditing ? (
                      <h2 className="font-semibold text-lg">Edit Problem</h2>
                    ) : (
                      <h2 className="font-semibold text-lg">Add New Problem</h2>
                    )}
                    <CloseIcon onClose={() => props.onClose()} />
                  </div>
                  {/* {props.isEditing ? (
                    <p>You can replace the problem from the exisiting ones.</p>
                  ) : (
                    <p className="tracking-wider text-sm text-start">
                      Add new problem under a topic. You can create new problem
                      or choose existing one
                    </p>
                  )} */}
                  {!props.isEditing && props.addProblemToSeasonTopic && (
                    <div className="w-full flex flex-col justify-start gap-y-2">
                      <ProblemsAutocomplete
                        handleSearchProblem={handleSearchProblem}
                      />
                      {/* <p className="w-full text-xs text-red-500">
                          {errors.search}
                        </p> */}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-y-4">
                  <div className="flex flex-col justify-start gap-y-4">
                    <div>
                      {existingProblem === null && (
                        <div className="w-full flex flex-col items-center">
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

                                    <Field
                                      as="select"
                                      name="platform"
                                      className={clsx(
                                        "w-full text-sm border bg-white rounded-md focus:outline-none py-3 pl-8 my-2",
                                        errors.platform
                                          ? "border-red-500"
                                          : "border-[#DCDCDC]"
                                      )}
                                    >
                                      <option
                                        className="h-20"
                                        value=""
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
                                  {errors.platform && (
                                      <div className="bg-red-400/20 w-full mt-2 p-2 px-4 rounded-md">
                                        <p className="w-full text-xs text-red-400">
                                          {errors.platform}
                                        </p>
                                      </div>
                                    )}
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
                                      touched.tags && errors.tags
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
                  <FormAffirmativeButton isLoading={isSubmitting} text="Save" />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ProblemModal;
