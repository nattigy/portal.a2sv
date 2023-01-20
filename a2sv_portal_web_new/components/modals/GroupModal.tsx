import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { getNationality } from "../../helpers/getNationalityFlag";
import { ApolloError, useMutation } from "@apollo/client";
import {
  CREATE_GROUP_MUTATION,
  EDIT_GROUP,
} from "../../lib/apollo/Mutations/groupsMutations";
import FormAffirmativeButton from "../common/FormAffirmativeButton";
import FormRejectButton from "../common/FormRejectButton";
import FormField from "../common/FormField";
import FormDropdown from "../common/FormDropdown";
import HOEAutocomplete from "../users/HOEAutocomplete";
import { Group } from "../../types/group";
import { FaChevronDown } from "react-icons/fa";
import { count } from "console";
import { COUNTRIES } from "../../helpers/constants";
import { MdAdd } from "react-icons/md";

export enum RoleTypes {
  STUDENT = "Student",
  HOE = "Head of Education",
  HOA = "Head of Academy",
}

interface FormValues {
  name: string;
  country: string;
  school: string;
  headId?: string;
}

type Props = {
  isEditing: boolean;
  group?: Group;
  onClose: () => void;
};

const GroupModal = ({ isEditing, group, onClose }: Props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addNewGroup] = useMutation(CREATE_GROUP_MUTATION);
  const [editGroup] = useMutation(EDIT_GROUP);

  console.log(group, "Group");
  const INITIAL_VALUES: FormValues = {
    name: group?.name || "",
    country: group?.country || "",
    school: group?.school || "",
    headId: group?.head?.id,
  };

  const FORM_VALIDATION = yup.object().shape({
    name: yup.string().required("Required").min(3).max(40),
    country: yup.string().required("Required"),
    school: yup.string().required("Required"),
  });

  const [selected, setSelected] = useState<null | any>();

  return (
    <>
      <div className=" transition-all duration-200 py-8 text-[#565656] w-screen h-screen absolute top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-30 z-50">
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={FORM_VALIDATION}
          onSubmit={async (values, actions) => {
            if (isEditing) {
              await editGroup({
                variables: {
                  updateGroupInput: {
                    groupId: group?.id,
                    name: values.name,
                    school: values.school,
                    country: values.country,
                    headId: selected?.id,
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
            } else {
              setIsLoading(true);
              await addNewGroup({
                variables: {
                  createGroupInput: {
                    headId: selected?.id,
                    country: values.country,
                    name: values.name,
                    school: values.school,
                  },
                },
                refetchQueries: "active",
                notifyOnNetworkStatusChange: true,
                onCompleted: (data) => {
                  setIsLoading(false);
                  onClose();
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
          {({ isSubmitting, handleChange, errors, touched, values }) => (
            <Form>
              <div
                role="alert"
                className="flex flex-col gap-y-3 min-h-fit bg-white container mx-auto w-11/12 md:w-1/2 lg:w-2/5 xl:w-1/3 rounded-xl  px-8 py-5"
              >
                {JSON.stringify(errors)}
                <div className="w-full flex flex-col items-center">
                  <div className="my-3 w-full flex justify-between items-center">
                    {isEditing ? (
                      <h2 className="font-semibold text-lg">
                        Edit {group?.name}
                      </h2>
                    ) : (
                      <h2 className="font-semibold text-lg">
                        Create New Group
                      </h2>
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
                  {isEditing ? (
                    <p className="tracking-wider text-md text-start text-[#949494]">
                      You can edit the information related to the group. Make
                      sure to save inorder to see the changes.
                    </p>
                  ) : (
                    <p className="tracking-wider text-md text-start text-[#949494]">
                      Add new group to the system and easily track everything.{" "}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <div className="flex flex-col justify-start">
                    <div className="flex flex-col items-center">
                      <FormField
                        id="name"
                        placeholder="Group Name"
                        name="name"
                        touched={touched.name}
                        error={errors.name}
                      />
                      {errors.name && (
                        <div className="bg-red-400/20 w-full p-2 px-4 rounded-md">
                          <p className="w-full text-xs text-red-400">
                            {errors.name}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex flex-col justify-start">
                    <div className="flex items-center my-2 relative">
                      <FormDropdown
                        name="country"
                        placeholder="Select Country"
                        flag={getNationality(values.country)}
                        options={COUNTRIES.map((country) => ({
                          name: country,
                          value: country,
                        }))}
                        icon={<FaChevronDown size={16} />}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex flex-col justify-start">
                    <div className="flex flex-col items-center">
                      <div className="flex w-full items-center gap-x-4">
                        <HOEAutocomplete
                          user={group?.head}
                          handleSearchStudent={setSelected}
                        />
                        <div className="bg-primary/10 rounded-full p-1">
                          <MdAdd color="#5956E9" size={24} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full my-2">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg">Institute</h2>
                  </div>
                  <div className="flex flex-col justify-start">
                    <div className="flex flex-col items-center">
                      <FormField
                        id="school"
                        name="school"
                        placeholder="School"
                        error={errors.school}
                        touched={touched.school}
                      />
                      {errors.school && (
                        <div className="bg-red-400/20 w-full p-2 px-4 rounded-md">
                          <p className="w-full text-xs text-red-400">
                            {errors.school}
                          </p>
                        </div>
                      )}
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

export default GroupModal;
