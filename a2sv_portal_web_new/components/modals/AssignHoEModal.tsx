import { ApolloError, useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { ASSIGN_HOE_TO_GROUP } from "../../lib/apollo/Mutations/groupsMutations";
import FormAffirmativeButton from "../common/FormAffirmativeButton";
import FormRejectButton from "../common/FormRejectButton";
import HOEAutocomplete from "../users/HOEAutocomplete";

type Props = {
  onClose: () => void;
  groupId: number;
};

const AssignHoEModal = (props: Props) => {
  const [assignUser] = useMutation(ASSIGN_HOE_TO_GROUP);

  const [errorMessage, setErrorMessage] = useState("");

  const [selected, setSelected] = useState<null | any>(null);

  return (
    <>
      <div className=" transition-all duration-200 py-8 text-[#565656] w-screen h-screen absolute top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-30 z-50">
        <Formik
          initialValues={{ name: "" }}
          onSubmit={async (values, actions) => {
            console.log(selected.id.toString(), props.groupId.toString());
            await assignUser({
              variables: {
                updateGroupInput: {
                  id: parseInt(props.groupId.toString()),
                  head: {
                    id: parseInt(selected.id.toString()),
                  },
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
            actions.resetForm();
          }}
        >
          {({ isSubmitting, handleChange, errors, touched, values }) => (
            <Form>
              <div
                role="alert"
                className="flex flex-col gap-y-2 min-h-[300px] bg-white container mx-auto w-11/12 md:w-1/2 lg:w-2/5 xl:w-1/3 rounded-xl  px-8 py-5"
              >
                <div className="w-full flex flex-col items-cente">
                  <div className="mt-3 w-full flex justify-between items-center">
                    <h2 className="font-semibold text-lg">Assign User</h2>
                    {JSON.stringify(selected)}

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
                </div>
                <p className="tracking-wider text-sm font-normal text-start text-[#949494]">
                  Assign head of education to a group
                </p>
                <div className="flex flex-col gap-y-4 my-2">
                  <div className="">
                    <div className="flex flex-col justify-start gap-y-4">
                      <div>
                        <HOEAutocomplete handleSearchStudent={setSelected} />
                        <p className="w-full text-xs text-red-500">
                          {errors.name}
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
                    <FormRejectButton
                      text="Cancel"
                      onClick={() => props.onClose()}
                    />
                    <FormAffirmativeButton
                      isLoading={isSubmitting}
                      text="Save"
                    />{" "}
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

export default AssignHoEModal;
