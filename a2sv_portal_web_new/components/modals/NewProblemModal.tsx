import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import clsx from "clsx";
import { ProblemDifficultyType } from "../../types/problems";
import { PlatformInfo } from "../problems/ProblemsTable";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { BiCopy } from "react-icons/bi";
import Tag from "../common/Tag";

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
};
const NewProblemModal = (props: Props) => {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const INITIAL_VALUES = {
    // status: QuestionStatus.NOT_SOLVED,
    // time_spent: 0,
    // total_attempts: 0,
    // wrong_submissions: 0
  } as FormValues;

  const FORM_VALIDATION = yup.object().shape({
    search: yup.string(),
    name: yup.string(),
    platform: yup.string(),
    difficulty: yup.string(),
    link: yup.string(),
    tags: yup.array(),
  });

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
                </div>
                <div className="">
                  <div className="flex flex-col justify-start gap-y-4">
                    <div className="flex items-center">
                      <div className="bg-white dark:bg-gray-100 rounded-full w-full h-8 my-1 flex flex-shrink-0 justify-start items-center relative">
                        <AiOutlineSearch className="absolute left-3" />
                        <Field
                          id="search"
                          name="search"
                          placeholder="Search for an existing problem"
                          type="text"
                          className={clsx(
                            "w-full text-sm placeholder-[#949494] border bg-white rounded-md focus:outline-none py-3 px-4 pl-8 my-2",
                            touched.search && errors.search
                              ? "border-red-500"
                              : "border-[#DCDCDC]"
                          )}
                        />
                      </div>
                    </div>
                    {/* <p className="w-full text-xs text-red-500">
                          {errors.search}
                        </p> */}
                  </div>
                  <div className="mt-4 mb-2 w-full flex justify-between items-center">
                    <h2 className="font-bold">Create New</h2>
                  </div>
                  <div className="flex flex-row gap-x-3 my-3">
                    <div className="flex flex-col w-3/5 justify-start gap-y-1">
                      <h1>Name</h1>
                      <div className="flex items-center">
                        <div className="bg-white dark:bg-gray-100 rounded-full w-full h-8 my-1 flex flex-shrink-0 justify-start items-center relative">
                          <Field
                            id="name"
                            name="name"
                            placeholder="Enter problem name"
                            type="text"
                            className={clsx(
                              "w-full text-sm placeholder-[#949494] border bg-white rounded-md focus:outline-none py-3 px-4 my-2",
                              touched.name && errors.name
                                ? "border-red-500"
                                : "border-[#DCDCDC]"
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col flex-auto justify-start gap-y-1">
                      <h1>Platform</h1>
                      <div className="flex items-center">
                        <div className="bg-white dark:bg-gray-100 rounded-full w-full h-8 my-1 flex flex-shrink-0 justify-start items-center relative">
                          <img
                            src="/icons/jira.svg"
                            alt=""
                            className="absolute left-3"
                          />
                          <Field
                            as="select"
                            name="platform"
                            className={clsx(
                              "w-full text-sm placeholder-yellow-50 border bg-white rounded-md focus:outline-none py-3 pl-8 my-2",
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
                            <option value="Hackerrank">Hackerrank</option>
                            <option value="Codeforces">Codeforces</option>
                          </Field>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-y-4 my-2 gap-x-4">
                    <div className="my-2">
                      <h1 className="mr-6">Difficulty</h1>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-white dark:bg-gray-100 rounded-full w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                        <Field
                          id="easy"
                          type="radio"
                          value={ProblemDifficultyType.EASY}
                          name="problem-status"
                          className="peer checkbox appearance-none focus:outline-none rounded-full border-2 border-green-700 checked:border-green-700 absolute cursor-pointer w-full h-full"
                        />
                        <div className="check-icon border-4 peer-checked:border-white peer-checked:bg-green-700 rounded-full w-full h-full z-1" />
                      </div>
                      <label
                        htmlFor="easy"
                        className="ml-2 text-sm leading-4 font-normal"
                      >
                        Easy
                      </label>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-white dark:bg-gray-100 rounded-full w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                        <Field
                          id="medium"
                          type="radio"
                          value={ProblemDifficultyType.MEDIUM}
                          checked
                          name="problem-status"
                          className="peer checkbox appearance-none focus:outline-none rounded-full border-2  border-yellow-400 checked:border-yellow-400 absolute cursor-pointer w-full h-full"
                        />
                        <div className="check-icon border-4 peer-checked:border-white peer-checked:bg-yellow-400 rounded-full w-full h-full z-1" />
                      </div>
                      <label
                        htmlFor="medium"
                        className="ml-2 text-sm leading-4 font-normal"
                      >
                        Medium
                      </label>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-white dark:bg-gray-100 rounded-full w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                        <Field
                          id="hard"
                          type="radio"
                          value={ProblemDifficultyType.HARD}
                          name="problem-status"
                          className="peer checkbox appearance-none focus:outline-none rounded-full border-2  border-red-700 checked:border-red-700 absolute cursor-pointer w-full h-full"
                        />
                        <div className="check-icon border-4 peer-checked:border-white peer-checked:bg-red-700 rounded-full w-full h-full z-1" />
                      </div>
                      <label
                        htmlFor="hard"
                        className="ml-2 text-sm leading-4 font-normal"
                      >
                        Hard
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col gap-x-3 my-3">
                    <h2>Link</h2>
                    <div className="flex flex-row justify-start gap-y-1 gap-x-2">
                      <div className="flex items-center w-4/6 gap-x-2">
                        <div className="bg-white dark:bg-gray-100 rounded-full w-full h-8 flex flex-shrink-0 justify-start items-center relative">
                          <Field
                            id="link"
                            name="link"
                            placeholder="Enter problem link"
                            type="text"
                            className={clsx(
                              "w-full text-sm placeholder-[#949494] border bg-white rounded-md focus:outline-none py-3 px-4",
                              touched.name && errors.name
                                ? "border-red-500"
                                : "border-[#DCDCDC]"
                            )}
                          />
                        </div>
                      </div>
                      <div className="flex flex-row items-center rounded-md py-3 px-2 gap-x-2 border">
                        <BiCopy />
                        <button>Copy</button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-start gap-y-2">
                    <h1>Tags</h1>
                    <div className="flex flex-col items-start gap-y-4">
                      <div className="bg-white dark:bg-gray-100 rounded-full w-3/6 h-8 my-1 flex flex-shrink-0 justify-start items-center relative">
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
                      <div className="flex flex-row flex-wrap gap-x-2">
                        {tags.map((tag: any, index: number) => (
                          <Tag value={tag} key={index}>
                            <h1>{tag}</h1>
                            <button onClick={() => deleteTag(index)}>x</button>
                          </Tag>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end items-center gap-x-3">
                    <button
                      onClick={() => props.onClose()}
                      className="min-w-min px-6 py-2 mt-4 text-sm font-semibold bg-primary bg-opacity-10 text-gray-600 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="min-w-min px-6 py-2 mt-4 text-sm font-semibold text-white bg-primary rounded-lg"
                    >
                      Submit
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

export default NewProblemModal;
