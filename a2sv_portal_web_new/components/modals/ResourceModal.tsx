import * as yup from "yup";
import { Form, Formik, FormikProps } from "formik";
import React, { useRef, useState } from "react";
import { Resource } from "../../types/resource";
import FormAffirmativeButton from "../common/FormAffirmativeButton";
import FormDropdown from "../common/FormDropdown";
import FormField from "../common/FormField";
import FormRejectButton from "../common/FormRejectButton";
import HOEAutocomplete from "../users/HOEAutocomplete";
import { getGoogleIcon } from "../../helpers/getGoogleIcon";
import { MdChevronRight } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { ADD_SEASON_TOPIC_RESOURCES } from "../../lib/apollo/Mutations/seasonsMutations";
import { ApolloError, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

interface FormValues {
  name: string;
  type: string;
  description: string;
  link: string;
}

type Props = {
  isEditing: boolean;
  resource?: Resource;
  onClose: () => void;
};

const TextAreaInput = ({ field, form, ...props }: any) => {
  return <textarea rows={3} className="resize-none" {...field} {...props} />;
};

const ResourceModal = ({ isEditing, resource, onClose }: Props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [addResource] = useMutation(ADD_SEASON_TOPIC_RESOURCES);

  const INITIAL_VALUES: FormValues = {
    name: resource?.name || "",
    type: resource?.type || "",
    description: resource?.description || "",
    link: resource?.link || "",
  };

  const FORM_VALIDATION = yup.object().shape({
    name: yup.string().required("Required").min(3).max(40),
    type: yup.string().required("Required"),
    link: yup.string().required("Required"),
  });

  return (
    <>
      <div className=" transition-all duration-200 py-8 text-[#565656] w-screen h-screen absolute top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-30 z-50">
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={FORM_VALIDATION}
          onSubmit={async (values, actions) => {
            await addResource({
              variables: {
                createSeasonTopicInput: {
                  seasonId: router.query.seasonId?.toString(),
                  topicId: router.query.topicId?.toString(),
                  seasonTopicResources: [
                    {
                      description: values.description,
                      link: values.link,
                      name: values.name,
                      type: values.type?.toUpperCase(),
                      seasonId: router.query.seasonId?.toString(),
                      topicId: router.query.topicId?.toString(),
                    },
                  ],
                },
              },
              refetchQueries: "active",
              notifyOnNetworkStatusChange: true,
              onCompleted: (data) => {
                onClose();
              },
              onError: (error) => {
                setErrorMessage((error as ApolloError).message);
              },
            });
          }}
        >
          {({ isSubmitting, handleChange, errors, touched, values }) => (
            <Form>
              <div
                role="alert"
                className="flex flex-col gap-y-3 min-h-fit bg-white container mx-auto w-11/12 md:w-1/2 lg:w-2/5 xl:w-1/3 rounded-xl  px-8 py-5"
              >
                <div className="w-full flex flex-col items-center">
                  <div className="my-3 w-full flex justify-between items-center">
                    {isEditing ? (
                      <h2 className="font-semibold text-lg">
                        Edit {resource?.name}
                      </h2>
                    ) : (
                      <h2 className="font-semibold text-lg">Add Resource</h2>
                    )}
                    <div className="cursor-pointer" onClick={() => onClose()}>
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
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-md">Name</h2>
                  </div>
                  <div className="flex flex-col justify-start">
                    <div className="flex flex-col items-center">
                      <FormField
                        id="name"
                        placeholder="Add name of the resource"
                        name="name"
                        touched={touched.name}
                        error={errors.name}
                      />
                      <p className="w-full text-xs text-red-500">
                        {errors.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-md">Resource Type</h2>
                  </div>

                  <div className="flex flex-col justify-start">
                    <div className="flex items-center my-2 relative">
                      <div className="absolute left-2 z-10">
                        <img
                          src={getGoogleIcon(values.type)}
                          className="w-6"
                          alt=""
                        />
                      </div>
                      <FormDropdown
                        name="type"
                        placeholder="Select Resource Type"
                        options={[
                          { name: "Doc", value: "doc" },
                          { name: "Sheet", value: "sheet" },
                          { name: "Slide", value: "ppt" },
                          { name: "PDF", value: "pdf" },
                          { name: "Video", value: "video" },
                        ]}
                        icon={<FaChevronDown size={16} />}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-md">Description</h2>
                  </div>

                  <div className="flex flex-col justify-start">
                    <div className="flex flex-col items-center">
                      <FormField
                        id="description"
                        placeholder="Add a description"
                        name="description"
                        touched={touched.description}
                        error={errors.description}
                        props={{ component: TextAreaInput }}
                      />
                      <p className="w-full text-xs text-red-500">
                        {errors.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-md">Resource Link</h2>
                  </div>

                  <div className="flex flex-col justify-start">
                    <div className="flex flex-col items-center">
                      <FormField
                        id="link"
                        placeholder="Resource Link"
                        name="link"
                        touched={touched.link}
                        error={errors.link}
                      />
                      <p className="w-full text-xs text-red-500">
                        {errors.link}
                      </p>
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
                <div className="flex justify-end items-center gap-x-3">
                  <FormRejectButton text="Cancel" onClick={() => onClose()} />
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

export default ResourceModal;
