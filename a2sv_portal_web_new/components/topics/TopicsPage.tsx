import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import { useGetAllTopics } from "../../lib/hooks/useTopics";
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
  const { data, refetch, loading } = useGetAllTopics();
  const [currentPath, setCurrentPath] = useState<number>(0);
  const [tabIndex, setTabIndex] = useState(0);
  const router = useRouter();
  //   const [loadUsers, { loading, data, error, refetch }] =
  //     useFilteredUsers(tabIndex);
  const [selected, setSelected] = useState(0);
  //   useEffect(() => {
  //     loadUsers();
  //   }, [tabIndex, refetch]);

  //   useEffect(() => {
  //     if (data) {
  //       console.log("data is ", data.users[0]);
  //       setUsersData(data.users);
  //       setSelected(data.users[0].id);
  //     }
  //   }, [refetch, data]);

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
          {authUser.role === GraphqlUserRole.HEAD_OF_EDUCATION && (
            <Button
              onClick={handleAddTopicToGroupModalOpen}
              text="Add Topic to Group"
              classname="bg-primary text-white text-xs"
            />
          )}
        </div>
        {authUser.role === GraphqlUserRole.HEAD_OF_EDUCATION && (
          <TopicsFilter
            handleTabChange={handleTabChange}
            activeIndex={tabIndex}
          />
        )}

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
          // ) : error ? (
          //   <p>Something went wrong</p>
          ) : data?.topics.length === 0 ? (
            <EmptyState />
          ) : (
            <TopicList
              season={{ id: 1, name: "Camp" }}
              topics={data?.topics}
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
