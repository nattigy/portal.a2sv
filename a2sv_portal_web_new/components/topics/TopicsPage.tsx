import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import WithPermission from "../../lib/Guard/WithPermission";
import { useGetAllGroupTopicsBySeasonIdQuery, useGetAllTopics } from "../../lib/hooks/useTopics";
import { GraphqlUserRole } from "../../types/user";
import Button from "../common/Button";
import EmptyState from "../common/EmptyState";
import { LoaderSmall } from "../common/Loaders";
import TopicList from "./TopicList";
import TopicsFilter from "./TopicsFilter";

type Props = {
  groupId: string;
};
const TopicsPage = (props: Props) => {
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;
  const [isAddTopicToGroupModalOpen, setIsAddTopicToGroupModalOpen] =
    useState(false);

  const handleAddTopicToGroupModalOpen = () => {
    setIsAddTopicToGroupModalOpen(true);
  };

  const router = useRouter();
  const seasonId = router.query.season

  const [fetchSeasonTopics, { data, refetch, loading }] = useGetAllGroupTopicsBySeasonIdQuery(seasonId ? seasonId.toString() : "");
  const [seasonTopics, setSeasonTopics] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
    useEffect(() => {
      fetchSeasonTopics();
    }, [tabIndex, refetch, fetchSeasonTopics]);

    console.log("Data", data)
    useEffect(() => {
      if (data) {
        setSeasonTopics(data?.seasonTopics?.items);
      }
    }, [refetch, data]);

  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <>
      {/* {isAddTopicToGroupModalOpen && (
        <AddTopicToGroupModal
          onClose={() => setIsAddTopicToGroupModalOpen(false)}
          groupId={authUser?.headToGroup?.id}
          seasonId={1}
        />
      )} */}
      <div className="h-full">
        <div className="w-full flex flex-col md:flex-row justify-between">
          <div className=" justify-between flex items-center mb-2 gap-x-5 ">
            <h1 className="text-2xl font-bold text-gray-700">Topics</h1>
          </div>
          <WithPermission allowedRoles={[GraphqlUserRole.HEAD_OF_EDUCATION]}>
            <Button
              onClick={handleAddTopicToGroupModalOpen}
              text="Add Topic to Group"
              classname="bg-primary text-white text-xs"
            />
          </WithPermission>
        </div>
        <WithPermission allowedRoles={[GraphqlUserRole.HEAD_OF_EDUCATION]}>
          <TopicsFilter
            handleTabChange={handleTabChange}
            activeIndex={tabIndex}
          />
        </WithPermission>

        {/* {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <LoaderSmall color="#5956E9" />
        </div>
      ) : error ? (
        <p>Something went wrong</p>
      ) : ( */}

        <div className="flex flex-col items-center gap-y-4">
          {loading ? (
            <div className=" h-full w-full flex justify-center items-center">
              <LoaderSmall />
            </div>
          ) : // ) : error ? (
          //   <p>Something went wrong</p>
          data?.seasonTopics?.length === 0 ? (
            <EmptyState />
          ) 
          : (
            <TopicList
              season={{ id: 1, name: "Camp" }}
              topics={seasonTopics}
              groupId={props.groupId}
              title="All Topics"
            />
          )}
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default TopicsPage;
