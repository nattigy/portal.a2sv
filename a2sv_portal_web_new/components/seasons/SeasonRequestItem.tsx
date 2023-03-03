import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ACCEPT_OR_REJECT_SEASON_REQUEST } from "../../lib/apollo/Mutations/seasonsMutations";
import { JoinRequest } from "../../types/season";
import Button from "../common/Button";
import FormAffirmativeButton from "../common/FormAffirmativeButton";
import FormRejectButton from "../common/FormRejectButton";

export type SeasonRequestItemProps = {
  season: { id: string; name: string };
  group: {
    id: string;
    name: string;
    head: {
      id: string;
      email: string;
      userProfile: { firstName: string; lastName: string };
    };
  };
};

const SeasonRequestItem = ({ season, group }: SeasonRequestItemProps) => {
  const { head } = group;
  const [acceptOrRejectRequest, { loading, data, error, reset }] = useMutation(
    ACCEPT_OR_REJECT_SEASON_REQUEST
  );
  const [isApproved, setIsApproved] = useState(false);

  const handleRequest = async (joinRequest: JoinRequest) => {
    await acceptOrRejectRequest({
      variables: {
        updateGroupSeasonJoinRequestInput: {
          groupId: group.id,
          joinRequest: joinRequest,
          seasonId: season.id,
        },
      },
      refetchQueries: "active",
      notifyOnNetworkStatusChange: true,
      onError(error, clientOptions) {
        setTimeout(() => {
          reset();
        }, 2000);
      },
    });
  };

  return (
    <div>
      <div className="flex items-start gap-x-2">
        <div className="">
          <img
            className="w-16"
            src={"/images/group-students-profile.svg"}
            alt=""
          />
        </div>
        <div>
          <p className="text-xs">
            <span className="font-semibold">
              {head?.userProfile
                ? head?.userProfile?.firstName +
                  head?.userProfile?.lastName +
                  " "
                : head?.email + " "}
            </span>
            requested to start
            <span className="font-semibold"> {season.name}</span> for
            <span className="font-semibold"> {group.name}</span>
          </p>
          <div className="flex justify-between items-center">
            <Button
              isLoading={loading && !isApproved}
              onClick={() => {
                setIsApproved(false);
                handleRequest(JoinRequest.REJECTED);
              }}
              text="Decline"
              classname="py-2 px-4 border bg-white bg-opacity-100 border-primary text-primary text-xs min-w-min  mt-4 font-semibold rounded-lg"
            />
            <Button
              isLoading={loading && isApproved}
              text="Approve"
              onClick={() => {
                setIsApproved(true);
                handleRequest(JoinRequest.APPROVED);
              }}
              classname="py-2 px-4 border bg-primary bg-opacity-100 border-primary text-white text-xs min-w-min  mt-4 font-semibold rounded-lg"
            />
          </div>
        </div>
      </div>
      {error && (
        <div className="bg-red-400/20 w-full mt-2 p-2 px-4 rounded-md">
          <p className="w-full text-xs text-red-400">{error.message}</p>
        </div>
      )}
    </div>
  );
};

export default SeasonRequestItem;
