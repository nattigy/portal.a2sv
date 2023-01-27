import React, { useState } from "react";
import { Formik, Form, Field, FormikValues } from "formik";
import * as yup from "yup";
import clsx from "clsx";
import { ApolloError, useMutation } from "@apollo/client";
import {
  ADD_SEASON_TOPIC,
  CREATE_TOPIC_MUTATION,
  EDIT_TOPIC,
} from "../../lib/apollo/Mutations/topicsMutations";
import FormAffirmativeButton from "../common/FormAffirmativeButton";
import FormRejectButton from "../common/FormRejectButton";
import FormField from "../common/FormField";
import TopicsAutocomplete, { TopicType } from "../topics/TopicsAutocomplete";
import { Topic } from "../../types/topic";
interface FormValues {
  topic_title: string;
  description: string;
}

type Props = {
  isEditing: boolean;
  topic?: Topic;
  onClose: () => void;
  seasonId?: string;
  newTopic?: boolean;
};

const TopicModal = (props: Props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [addNewTopic, { loading, error, data }] = useMutation(
    CREATE_TOPIC_MUTATION
  );
  const [editTopic, { loading: editLoading, error: editError }] =
    useMutation(EDIT_TOPIC);
  const [addTopicToSeason] = useMutation(ADD_SEASON_TOPIC);
  const [existingTopic, setExistingTopic] = useState<TopicType | null>(null);

  const INITIAL_VALUES: FormValues = {
    topic_title: props.topic?.name || "",
    description: props.topic?.description || "",
  };
  let validationShape;
  if (existingTopic === null) {
    validationShape = yup.object().shape({
      topic_title: yup.string().required("Required"),
      description: yup.string().required("Required"),
    });
  
  }
  const FORM_VALIDATION = validationShape;

  return (
    <>
      <div className=" transition-all duration-200 py-8 text-[#565656] w-screen h-screen absolute top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-30 z-50">
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={FORM_VALIDATION}
          onSubmit={async (values, actions) => {
            if (props.isEditing) {
              await editTopic({
                variables: {
                  updateTopicInput: {
                    description: values.description,
                    name: values.topic_title,
                    topicId: props.topic?.id,
                  },
                },
                refetchQueries: "active",
                notifyOnNetworkStatusChange: true,
                onCompleted: () => {
                  props.onClose();
                },
                onError: (error) => {
                  setErrorMessage((error as ApolloError).message);
                },
              });
            } else {
              if (existingTopic === null) {
                await addNewTopic({
                  variables: {
                    createTopicInput: {
                      name: values.topic_title,
                      description: values.description,
                    },
                  },
                  refetchQueries: "active",
                  notifyOnNetworkStatusChange: true,
                  onCompleted: async(data) => {
                    await addTopicToSeason({
                      variables: {
                        createSeasonTopicInput: {
                          seasonId: props.seasonId,
                          topicId: data.createTopic.id,
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

                    props.onClose();
                  },
                  onError: (error) => {
                    setErrorMessage((error as ApolloError).message);
                  },
                });
              } else {
                await addTopicToSeason({
                  variables: {
                    createSeasonTopicInput: {
                      seasonId: props.seasonId,
                      topicId: existingTopic?.id,
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
              }
            }
            actions.resetForm();
          }}
        >
          {({ isSubmitting, values, errors, touched }) => (
            <Form>
              <div
                role="alert"
                className="flex flex-col gap-y-3 min-h-[400px] bg-white container mx-auto w-11/12 md:w-1/2 lg:w-2/5 xl:w-1/3 rounded-xl  px-8 py-5"
              >
                <div className="w-full flex flex-col">
                  <div className="my-3 w-full flex justify-between items-center">
                    {props.isEditing ? (
                      <h2 className="font-semibold text-lg">Edit Topic</h2>
                    ) : (
                      <h2 className="font-semibold text-lg">
                        Create New Topic
                      </h2>
                    )}
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
                  <p className="text-sm">
                    Add new problem under a topic. You can create new problem or
                    choose existing one
                  </p>
                  <div className="w-full flex flex-col gap-y-2">
                    <div className="w-full">
                      {!props.newTopic && (
                        <div className="mt-4">
                          <div className="flex flex-col justify-start gap-y-4">
                            <div className={clsx("flex items-center")}>
                              <TopicsAutocomplete
                                handleSearchTopic={setExistingTopic}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {!existingTopic && (
                      <>
                        {/* <h2 className="font-semibold text-lg">
                          Create New Topic
                        </h2> */}

                        <div className="w-full">
                          <div className="flex justify-between items-center">
                            <h2 className="font-medium text-sm">Topic Title</h2>
                          </div>
                          <div className="flex flex-col justify-start">
                            <div className="flex items-center">
                              <FormField
                                id="topic_title"
                                name="topic_title"
                                placeholder="Add Title of the topic"
                                error={errors.topic_title}
                                touched={touched.topic_title}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="w-full flex flex-col items-center">
                            <div className="w-full flex justify-between items-center">
                              <h2 className="font-medium text-sm">
                                Topic Description
                              </h2>
                            </div>
                          </div>
                          <div className="flex flex-col justify-start">
                            <div className="flex items-center">
                              <FormField
                                id="description"
                                name="description"
                                placeholder="Add description of the topic"
                                error={errors.description}
                                touched={touched.description}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {errorMessage && (
                    <div className="bg-[#E4646451] py-1 rounded-md">
                      <span className="text-[#E46464] px-4 text-xs">
                        {errorMessage}
                      </span>
                    </div>
                  )}
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
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default TopicModal;
