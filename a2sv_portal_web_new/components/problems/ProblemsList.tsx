import { useMutation, useReactiveVar } from "@apollo/client";
import React from "react";
import {
  ADD_PROBLEM_TO_GROUP_SEASON_TOPIC,
  REMOVE_PROBLEM_FROM_GROUP_SEASON_TOPIC,
} from "../../lib/apollo/Mutations/problemsMutations";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import { ProblemType } from "../../types";
import ProblemsDraggableItem from "./ProblemsDraggableItem";

type Props = {
  groupProblems: any[];
  allProblems: any[];
  seasonId?: string;
  topicId?: string;
  group?: boolean;
};

const ProblemsList = ({
  groupProblems,
  allProblems,
  group,
  seasonId,
  topicId,
}: Props) => {
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;
  const [
    addGroupSeasonTopicProblems,
    { loading: addLoading, error: addError },
  ] = useMutation(ADD_PROBLEM_TO_GROUP_SEASON_TOPIC);

  const [
    removeGroupSeasonTopicProblems,
    { loading: removeLoading, error: removeError },
  ] = useMutation(REMOVE_PROBLEM_FROM_GROUP_SEASON_TOPIC);

  const handleAddGroupSeasonTopicProblems = async (problemId: string) => {
    await addGroupSeasonTopicProblems({
      variables: {
        groupSeasonTopicId: {
          groupId: authUser.groupId,
          seasonId: seasonId,
          topicId: topicId,
        },
        problemIds: [problemId],
      },
      refetchQueries: "active",
      notifyOnNetworkStatusChange: true,
    });
  };

  const handleRemoveGroupSeasonTopicProblems = async (problemId: string) => {
    await removeGroupSeasonTopicProblems({
      variables: {
        groupSeasonTopicId: {
          groupId: authUser.groupId,
          seasonId: seasonId,
          topicId: topicId,
        },
        problemIds: [problemId],
      },
      refetchQueries: "active",
      notifyOnNetworkStatusChange: true,
    });
  };

  const allDraggingOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const groupDraggingOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const allProblemsDragDropped = (e: React.DragEvent<HTMLDivElement>) => {
    let transferredItemId = e.dataTransfer.getData("problemId");
    let transferredItemSource = e.dataTransfer.getData("problemSource");
    if (transferredItemSource === "group") {
      handleRemoveGroupSeasonTopicProblems(transferredItemId);
    }
  };

  const groupProblemsDragDropped = (e: React.DragEvent<HTMLDivElement>) => {
    let transferredItemId = e.dataTransfer.getData("problemId");
    let transferredItemSource = e.dataTransfer.getData("problemSource");
    if (transferredItemSource === "all") {
      handleAddGroupSeasonTopicProblems(transferredItemId);
    }
  };

  return (
    <div className="w-full flex gap-4 my-4">
      <div className="w-full flex flex-col gap-y-3">
        <h1>Group Problems</h1>
        <div
          className="flex flex-col gap-y-2 w-full p-2 bg-gray-200 min-h-[500px] h-fit"
          onDragOver={(e) => groupDraggingOver(e)}
          onDrop={(e) => groupProblemsDragDropped(e)}
        >
          {groupProblems &&
            groupProblems.map((problem: ProblemType, index: number) => {
              return (
                <ProblemsDraggableItem
                  key={index}
                  problem={problem}
                  group={true}
                  seasonId={seasonId}
                  topicId={topicId}
                />
              );
            })}
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-3">
        <h1>All Problems</h1>
        <div
          className="flex flex-col gap-y-2 w-full p-2 bg-gray-200 min-h-[500px] h-fit"
          onDragOver={(e) => allDraggingOver(e)}
          onDrop={(e) => allProblemsDragDropped(e)}
        >
          {allProblems &&
            allProblems.map((problem: ProblemType, index: number) => {
              return (
                <ProblemsDraggableItem
                  key={index}
                  problem={problem}
                  group={false}
                  seasonId={seasonId}
                  topicId={topicId}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ProblemsList;
