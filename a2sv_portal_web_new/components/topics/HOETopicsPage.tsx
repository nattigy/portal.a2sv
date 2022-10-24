import { useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import AddTopicToGroupModal from "../modals/AddTopicToGroupModal";
import TopicList from "../topics/TopicList";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import { GraphqlUserRole } from "../../types/user";
import { useGetAllTopicsByGroupAndSeasonIdQuery } from "../../lib/hooks/useTopics";
import Button from "../common/Button";
import EmptyState from "../common/EmptyState";
import { LoaderSmall } from "../common/Loaders";


type Props = {
  groupId: number;
};
//TODO: fix hardcoded values
const HOETopicsPage = ({ groupId }: Props) => {
  const [isAddTopicToGroupModalOpen, setIsAddTopicToGroupModalOpen] =
    useState(false);


  const authUser = useReactiveVar(authenticatedUser) as AuthUser;

  const handleAddTopicToGroupModalOpen = () => {
    setIsAddTopicToGroupModalOpen(true);
  };

  const [fetchTopics, { data, refetch, loading, error }] =
    useGetAllTopicsByGroupAndSeasonIdQuery(1, groupId);

  useEffect(() => {
    fetchTopics();
  }, [ refetch, groupId]);

  return (
    <>
      {isAddTopicToGroupModalOpen && (
        <AddTopicToGroupModal
          onClose={() => setIsAddTopicToGroupModalOpen(false)}
          groupId={authUser?.headToGroup?.id}
          seasonId={1}
        />
      )}
      <div className="h-full">
        <div className="w-full flex flex-col md:flex-row justify-between">
          <div className=" justify-between flex items-center mb-2 gap-x-5 ">
            <h1 className="text-2xl font-bold text-gray-700">Topics</h1>
          </div>
          {authUser.role === GraphqlUserRole.HEAD_OF_EDUCATION && (
            <Button
              onClick={handleAddTopicToGroupModalOpen}
              text="Add Topic to Group"
            />
          )}
        </div>
        <div className="h-full flex flex-col gap-y-4">
          {loading ? (
            <div className=" h-full w-full flex justify-center items-center">
              <LoaderSmall />
            </div>
          ) : error ? (
            <p>Something went wrong</p>
          ) : data?.topics.length === 0 ? (
            <EmptyState />
          ) : (
            <TopicList
              season={{id:1,name:"Camp"}}
              topics={data?.topics}
              groupId={groupId}
              title="All Topics"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default HOETopicsPage;