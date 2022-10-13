import { useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import AddTopicToGroupModal from "../modals/AddTopicToGroupModal";
import NewTopicModal from "../modals/NewTopicModal";
import TopicList from "../topics/TopicList";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import { GraphqlUserRole } from "../../types/user";
import {useGetAllTopicsBySeasonIdQuery} from "../../lib/hooks/useTopics";
import { LoaderSmall } from "./Loaders";

const selectMenuItems = [
  {
    id: 3,
    name: "Education",
  },
  {
    id: 4,
    name: "Camp",
  },
];

const HOATopicsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddTopicToGroupModalOpen, setIsAddTopicToGroupModalOpen] =
    useState(false);
  const [selectedSeason, setSelectedSeason] = useState(selectMenuItems[0]);
  const [fetchUsers, { data, refetch, loading }] =
    useGetAllTopicsBySeasonIdQuery(selectedSeason.id);

  const authUser = useReactiveVar(authenticatedUser) as AuthUser;

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedSeason, refetch]);

  return (
    <>
      {isAddTopicToGroupModalOpen && (
        <AddTopicToGroupModal
          seasonId={selectedSeason.id}
          onClose={() => setIsAddTopicToGroupModalOpen(false)}
          groupId={authUser?.headToGroup?.id}
        />
      )}
      {isModalOpen && <NewTopicModal onClose={() => setIsModalOpen(false)} />}
      <>
        <div className="w-full my-2  flex flex-col md:flex-row justify-between">
          <div className="my-2 justify-between flex items-center mb-2 gap-x-5 ">
            <h1 className="text-2xl font-bold text-gray-700">Topics </h1>
          </div>
          {authUser.role === GraphqlUserRole.HEAD_OF_ACADEMY && (
            <button
              onClick={handleModalOpen}
              className="flex w-full justify-center items-center md:w-44 p-2 text-sm font-semibold text-white bg-primary rounded-lg"
            >
              Add New Topic
            </button>
          )}
        </div>
        <div className="flex flex-col gap-y-4">
          {loading ? (
            <div className="w-full flex justify-center items-center">
              <LoaderSmall />
            </div>
          ) : (
            <TopicList  season={selectedSeason} topics={data?.topics} title="All Topics" />
          )}
        </div>
      </>
    </>
  );
};

export default HOATopicsPage;
