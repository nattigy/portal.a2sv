import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormAffirmativeButton from "../common/FormAffirmativeButton";
import FormRejectButton from "../common/FormRejectButton";
import FormField from "../common/FormField";
import { BiCalendar } from "react-icons/bi";
import { ApolloError, useMutation } from "@apollo/client";
import {
  CREATE_SEASON,
  EDIT_SEASON,
} from "../../lib/apollo/Mutations/seasonsMutations";
import { Season, SeasonType } from "../../types/season";
import FormDropdown from "../common/FormDropdown";

interface FormValues {
  name: string;
  type: string;
  startDate: string;
  endDate: string;
}

type Props = {
  isEditing: boolean;
  season?: Season;
  groupId?: string;
  onClose: () => void;
};

const SeasonModal = ({ isEditing, season, onClose, groupId }: Props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [createSeason] = useMutation(CREATE_SEASON);
  const [editSeason] = useMutation(EDIT_SEASON);
  const initialValues: FormValues = {
    type: season?.seasonType || "",
    name: season?.name || "",
    startDate: season?.startDate.toString() || "",
    endDate: season?.endDate.toString() || "",
  };
  const FORM_VALIDATION = yup.object().shape({
    name: yup.string().required("Required"),
    startDate: yup.string().required("Required"),
    endDate: yup.string().required("Required"),
    type: yup.string().required("Required"),
  });

  return (
    <>
      <div className=" transition-all duration-200 py-8 text-[#565656] w-screen h-screen absolute top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-30 z-50">
        <Formik
          initialValues={initialValues}
          validationSchema={FORM_VALIDATION}
          onSubmit={async (values, actions) => {
            if (!isEditing) {
              await createSeason({
                variables: {
                  createSeasonInput: {
                    name: values.name,
                    groupId: groupId,
                    seasonType: values.type,
                    endDate: values.endDate,
                    startDate: values.startDate,
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
              await editSeason({
                variables: {
                  updateSeasonId: season?.id,
                  updateSeasonInput: {
                    endDate: values.endDate,
                    id: season?.id,
                    name: values.name,
                    seasonType: values.type,
                    startDate: values.startDate,
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
            }
          }}
        >
          {({ setFieldValue, isSubmitting, values, errors, touched }) => (
            <Form>
              <div
                role="alert"
                className="flex flex-col gap-y-3 min-h-[400px] bg-white container mx-auto w-11/12 md:w-1/2 lg:w-2/5 xl:w-1/3 rounded-xl  px-8 py-5"
              >
                {JSON.stringify(errors)}
                <div className="w-full flex flex-col">
                  <div className="my-3 w-full flex justify-between items-center">
                    {isEditing ? (
                      <h2 className="font-semibold text-lg">{season?.name}</h2>
                    ) : (
                      <h2 className="font-semibold text-lg">
                        Create New Season
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
                  <div className="w-full flex flex-col items-center">
                    {isEditing ? (
                      <p className="tracking-wider text-md text-start text-[#949494]">
                        You can edit the information related to the season. Make
                        sure to save inorder to see the changes.
                      </p>
                    ) : (
                      <p className="tracking-wider text-md text-start text-[#949494]">
                        Add New Season where students can do specific activities
                      </p>
                    )}
                  </div>
                  <div className="w-full flex flex-col items-center gap-y-2">
                    <div className="w-full my-2">
                      <div className="w-full flex flex-col items-center">
                        <div className="w-full flex justify-between items-center">
                          <h2 className="font-semibold text-lg">Season Name</h2>
                        </div>
                      </div>
                      <div className="flex flex-col justify-start">
                        <div className="flex items-center">
                          <FormField
                            id="name"
                            name="name"
                            placeholder="Name"
                            error={errors.name}
                            touched={touched.name}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-start gap-y-4 w-full">
                      <div className="w-full flex flex-col items-center">
                        <div className="w-full flex justify-between items-center">
                          <h2 className="font-semibold text-lg">Season Type</h2>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FormDropdown
                          name="type"
                          placeholder="Select Season"
                          error={errors.type}
                          touched={touched.type}
                          options={[
                            {
                              name: "Camp",
                              value: SeasonType.CAMP,
                            },
                            {
                              name: "Education",
                              value: SeasonType.EDUCATION,
                            },
                            {
                              name: "Project",
                              value: SeasonType.PROJECT,
                            },
                          ]}
                        />
                      </div>
                    </div>
                    <div className="w-full flex flex-row gap-x-12 my-2">
                      <div className="w-1/2 flex flex-col items-center">
                        <div className="w-full">
                          <h2 className="font-semibold text-lg">Start Date</h2>
                        </div>
                        <div className="w-full flex flex-col justify-start">
                          <div className="flex items-center my-2 relative">
                            <DateView
                              autoComplete="off"
                              className="w-full text-xs placeholder-[#767676] placeholder:text-xs rounded-md focus:outline-none border py-3 px-4"
                              name="start"
                              maxDate={
                                values["endDate"]
                                  ? new Date(values["endDate"])
                                  : null
                              }
                              placeholderText="Enter Start Date"
                              selected={
                                values["startDate"]
                                  ? new Date(values["startDate"])
                                  : null
                              }
                              onChange={(e: any) =>
                                setFieldValue("startDate", e)
                              }
                              shouldCloseOnSelect={false}
                              dateFormat="MMMM dd, yyyy"
                              adjustDateOnChange
                              showYearDropdown
                            />
                            <div className="absolute right-2">
                              <BiCalendar size={18} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/2 flex flex-col items-center">
                        <div className="w-full">
                          <h2 className="font-semibold text-lg">End Date</h2>
                        </div>
                        <div className="w-full flex flex-col justify-start">
                          <div className="flex items-center my-2 relative">
                            <DateView
                              autoComplete="off"
                              className="w-full text-xs placeholder-[#767676] rounded-md focus:outline-none border py-3 px-4"
                              name="end"
                              minDate={
                                values["startDate"]
                                  ? new Date(values["startDate"])
                                  : null
                              }
                              placeholderText="Enter End Date"
                              selected={
                                values["endDate"]
                                  ? new Date(values["endDate"])
                                  : null
                              }
                              onChange={(e: any) => setFieldValue("endDate", e)}
                              shouldCloseOnSelect={false}
                              dateFormat="MMMM dd, yyyy"
                              adjustDateOnChange
                              showYearDropdown
                            />
                            <div className="absolute right-2">
                              <BiCalendar size={18} />
                            </div>
                          </div>
                        </div>
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

export default SeasonModal;
