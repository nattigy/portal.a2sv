import React, { useState } from "react";
import { Formik, Form, Field, FormikValues } from "formik";
import * as yup from "yup";
import clsx from "clsx";
import { AiOutlineUser } from "react-icons/ai";

export enum SeasonTypes {
  CAMP = "Camp",
  EDUCATION = "Education",
}

interface FormValues {
  season: SeasonTypes;
  group: number;
  resources: Array<string>[];
}

type Props = {
  onClose: () => void;
};

const NewTopicModal = (props: Props) => {
  const groups: Array<string> = ["12", "31", "32", "33"];
  const INITIAL_VALUES = {} as FormValues;
  const [input, setInput] = useState("");
  const [resources, setResources] = useState<string[]>([]);

  const clickHandler = () => {
    const trimmedInput = input.trim();

    if (trimmedInput.length && !resources.includes(trimmedInput)) {
      setResources((prevState) => [...prevState, trimmedInput]);
      setInput("");
    }
  };

  const onChange = (e: any) => {
    const { value } = e.target;
    setInput(value);
  };

  const deleteResource = (index: number) => {
    setResources((prevState) => prevState.filter((resource, i) => i !== index));
  };

  const FORM_VALIDATION = yup.object().shape({
    season: yup.string().required("Required"),
    group: yup.number().required("Required"),
    resources: yup.array(),
  });

  return (
    <>
      <div className=" transition-all duration-200 py-8 text-[#565656] w-screen h-screen absolute top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-30 z-50">
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values: FormikValues) => {
            console.log("values", values);
          }}
        >
          {({ isSubmitting, values, errors, touched }) => (
            <Form>
              <div
                role="alert"
                className="flex flex-col gap-y-3 min-h-[400px] bg-white container mx-auto w-11/12 md:w-1/2 lg:w-2/5 xl:w-1/3 rounded-xl  px-8 py-5"
              >
                <div className="w-full flex flex-col items-center">
                  <div className="my-3 w-full flex justify-between items-center">
                    <h2 className="font-semibold text-lg">Create New Topic</h2>
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
                        <div className="my-3 w-full flex justify-between items-center">
                          <h2 className="font-semibold text-lg">Seasons</h2>
                        </div>
                        <p className="tracking-wider text-md text-start text-[#949494]">
                          This season will be used to give students problems
                          with respect to the seasons
                        </p>
                      </div>
                      <div className="mt-4">
                        <div className="flex flex-col justify-start gap-y-4">
                          <div className="flex items-center">
                            <div className="bg-white dark:bg-gray-100 rounded-full w-full h-8 flex flex-shrink-0 justify-start items-center relative">
                              <AiOutlineUser
                                size={20}
                                className="absolute left-2"
                              />
                              <Field
                                as="select"
                                name="roles"
                                className={clsx(
                                  "w-full h-12 px-8 border rounded-md",
                                  touched.season && errors.season
                                    ? "border-red-500"
                                    : ""
                                )}
                              >
                                <option
                                  className="h-20"
                                  value=""
                                  selected
                                  disabled
                                  hidden
                                >
                                  Select Seasons
                                </option>
                                <option value="education">Education</option>
                                <option value="camp">Camp</option>
                              </Field>
                            </div>
                          </div>
                          {/* <p className="w-full text-xs text-red-500">
                            {errors.season}
                          </p> */}
                        </div>
                      </div>
                    </div>
                    <div className="my-4">
                      <div className="w-full flex flex-col items-center">
                        <div className="my-3 w-full flex justify-between items-center">
                          <h2 className="font-semibold text-lg">
                            Group Assigned
                          </h2>
                        </div>
                      </div>
                      <div className="my-4">
                        <div className="flex flex-col justify-start gap-y-4">
                          <div className="flex items-center">
                            <div className="bg-white dark:bg-gray-100 rounded-full w-full h-8 flex flex-shrink-0 justify-start items-center relative">
                              <AiOutlineUser
                                size={20}
                                className="absolute left-2"
                              />
                              <Field
                                as="select"
                                name="groups"
                                className={clsx(
                                  "w-full h-12 px-8 border rounded-md",
                                  touched.group && errors.group
                                    ? "border-red-500"
                                    : ""
                                )}
                              >
                                <option
                                  className="h-20"
                                  value=""
                                  selected
                                  disabled
                                  hidden
                                >
                                  Select Group
                                </option>
                                {groups.map((group: any, index: number) => (
                                  <option value={group} key={index}>
                                    {`Group ${group}`}
                                  </option>
                                ))}
                              </Field>
                            </div>
                          </div>
                          {/* <p className="w-full text-xs text-red-500">
                            {errors.group}
                          </p> */}
                        </div>
                      </div>
                      <div className="my-4">
                        <div className="w-full flex flex-col items-center">
                          <div className="my-3 w-full flex justify-between items-center">
                            <h2 className="font-semibold text-lg">
                              Resource Links
                            </h2>
                          </div>
                        </div>
                        <div className="my-4">
                          <div className="flex flex-row flex-wrap gap-x-2 gap-y-2">
                            {resources.map((resource: any, index: number) => (
                              <div
                                className="bg-white p-2 dark:bg-gray-100 rounded-md w-full flex flex-shrink-0 justify-between items-center py-2 relative"
                                key={index}
                              >
                                <h1 className="text-sm">{resource}</h1>
                                <button onClick={() => deleteResource(index)}>
                                  x
                                </button>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 flex flex-col justify-start gap-y-4">
                            <div className="flex flex-col items-center gap-y-2">
                              <div className="bg-white dark:bg-gray-100 rounded-full w-full h-8 flex flex-shrink-0 justify-start items-center relative">
                                <Field
                                  type="text"
                                  id="resources"
                                  name="resources"
                                  onChange={onChange}
                                  value={input}
                                  placeholder="Add Link for the Resources"
                                  className={clsx(
                                    "w-full h-12 px-4 border rounded-md",
                                    touched.resources && errors.resources
                                      ? "border-red-500"
                                      : ""
                                  )}
                                />
                              </div>
                              <div>
                                <button onClick={clickHandler}>+</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

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
                      className="min-w-min px-6 py-3 mt-4 text-sm font-semibold text-white bg-primary rounded-lg"
                    >
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

export default NewTopicModal;
