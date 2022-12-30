import { ApolloError, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { MAKE_SEASON_REQUEST } from "../../lib/apollo/Mutations/seasonsMutations";
import Button from "../common/Button";

type Props = {
  seasonId: string;
  groupId: string;
  onClose: () => void;
};

const SeasonRequestConfirmationModal = ({
  onClose,
  seasonId,
  groupId,
}: Props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requestNewSeason, { loading, data, error }] =
    useMutation(MAKE_SEASON_REQUEST);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleConfirmRequestNewModal = async () => {
    await requestNewSeason({
      variables: {
        addGroupToASeasonInput: {
          groupId: groupId,
          seasonId: seasonId,
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
  };

  return (
    <>
      <div className="transition-all duration-200 h-full flex justify-center items-center text-[#565656] absolute top-0 left-0 right-0 bg-gray-900 bg-opacity-30 z-[100] p-10">
        <div
          role="alert"
          className="flex flex-col gap-y-2 min-h-fit bg-white container mx-auto w-11/12 md:w-1/2 lg:w-3/5 xl:w-1/2 rounded-xl  px-8 py-5"
        >
          <div className="flex flex-col h-full gap-y-4 items-center justify-between">
            <div className="flex flex-col items-center gap-y-1">
              <h1 className="font-bold text-lg">
                Send Request to Start Season?
              </h1>
            </div>
            <div className="w-full flex flex-col">
              <h1 className="font-semibold text-center text-md text-[#A6A6A6] pb-4">
                You’re about to send a request to start “Camp Season Group 3”
              </h1>
              <div className="flex justify-end gap-x-2">
                <Button
                  text="Cancel"
                  classname="bg-white text-[#565656] font-semibold text-sm h-10"
                  onClick={onClose}
                />
                <Button
                  isLoading={isLoading}
                  text="Confirm"
                  onClick={handleConfirmRequestNewModal}
                  classname="text-white bg-primary font-semibold text-sm h-10"
                />
              </div>
              {errorMessage && (
                <div className="bg-[#E4646451] py-1 rounded-md">
                  <span className="text-[#E46464] px-4 text-xs">
                    {errorMessage}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeasonRequestConfirmationModal;
