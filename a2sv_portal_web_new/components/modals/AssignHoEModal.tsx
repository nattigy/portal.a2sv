import { ApolloError, useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import AutoCompleteField,{AutoCompleteFieldProps} from "../common/AutoCompleteField";
import { useFilteredUsers } from "../../lib/hooks/useUsers";
import { ASSIGN_USER_TO_GROUP } from "../../lib/apollo/Mutations/usersMutations";

type Props = {
  onClose: () => void;
  groupId:number;
};

const AssignHoEModal = (props: Props) => {
  const [assignUser,{loading:isLoading}] = useMutation(ASSIGN_USER_TO_GROUP)

  const [errorMessage, setErrorMessage] = useState("");
  const initialState:AutoCompleteFieldProps = {
        id: 0,
        email: ""
    };
  const [selected, setSelected] = useState(initialState);

  const [usersData, setUsersData] = useState([]);
  const [loadUsers, { loading, data, error, refetch }] = useFilteredUsers(2);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (data) {
      setUsersData(data.users);
    }
  }, [refetch, data]);


  return (
    <>
      <div className=" transition-all duration-200 py-8 text-[#565656] w-screen h-screen absolute top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-30 z-50">
        <Formik
          initialValues={{ name: "" }}
          onSubmit={async (values, actions) => {
            await assignUser({
              variables: {
                updateUserInput: {
                    id: parseInt(selected.id.toString()),
                    groupId: parseInt(props.groupId.toString())
                  }
              },
              refetchQueries: "active",
              notifyOnNetworkStatusChange: true,
              onCompleted: (data) => {
                props.onClose()
              },
              onError: (error) => {
                setErrorMessage((error as ApolloError).message);
              }
            })
            actions.resetForm()


          }}
        >
          {({ isSubmitting, handleChange, errors, touched, values }) => (
            <Form>
              <div
                role="alert"
                className="flex flex-col gap-y-3 min-h-[300px] bg-white container mx-auto w-11/12 md:w-1/2 lg:w-2/5 xl:w-1/3 rounded-xl  px-8 py-5"
              >
                <div className="w-full flex flex-col items-center">
                  <div className="my-3 w-full flex justify-between items-center">
                    <h2 className="font-semibold text-lg">Assign User</h2>

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
                        <AutoCompleteField students={usersData} setSelected={setSelected} selected={selected} />
                        <p className="w-full text-xs text-red-500">
                          {errors.name}
                        </p>
                      </div>
                    </div>
                  </div>


                  {
                      errorMessage && (
                        <div className="bg-[#E4646451] py-1 rounded-md">
                          <span className="text-[#E46464] px-4 text-xs">
                            {errorMessage}
                          </span>
                        </div>
                      )
                    }


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
                      className="flex justify-center items-center min-w-min px-6 py-3 mt-4 text-sm font-semibold text-white bg-primary rounded-lg"
                    >
                      {isLoading && (
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      )}
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

export default AssignHoEModal;
