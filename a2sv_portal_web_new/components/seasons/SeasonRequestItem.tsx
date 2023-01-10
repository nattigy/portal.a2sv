import { useMutation } from "@apollo/client";
import React from "react";
import { ACCEPT_OR_REJECT_SEASON_REQUEST } from "../../lib/apollo/Mutations/seasonsMutations";
import { JoinRequest } from "../../types/season";
import FormAffirmativeButton from "../common/FormAffirmativeButton";
import FormRejectButton from "../common/FormRejectButton";

export type SeasonRequestItemProps = {
  head: {
    id: string;
    email: string;
    userProfile: { firstName: string; lastName: string };
  };
  season: { id: string; name: string };
  group: { id: string; name: string };
};

const SeasonRequestItem = ({ head, season, group }: SeasonRequestItemProps) => {
  const [acceptOrRejectRequest, { loading, data, error }] = useMutation(
    ACCEPT_OR_REJECT_SEASON_REQUEST
  );

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
              {head.userProfile
                ? head.userProfile.firstName + head.userProfile.lastName + " "
                : head.email + " "}
            </span>
            requested to start
            <span className="font-semibold">{" " + season.name}</span> for
            <span className="font-semibold">{" " + group.name}</span>
          </p>
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                handleRequest(JoinRequest.REJECTED);
              }}
              className="py-2 px-4 border bg-white bg-opacity-100 border-primary text-primary text-xs min-w-min  mt-4 font-semibold rounded-lg"
            >
              Decline
            </button>
            <button
              onClick={() => {
                handleRequest(JoinRequest.APPROVED);
              }}
              className="py-2 px-4 border bg-primary bg-opacity-100 border-primary text-white text-xs min-w-min  mt-4 font-semibold rounded-lg"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonRequestItem;