import { useReactiveVar } from "@apollo/client";
import React, { useState } from "react";
import NewTopicModal from "../modals/NewTopicModal";
import TopicList from "./TopicList";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import { GraphqlUserRole } from "../../types/user";
import {
  useGetAllTopics,
  
} from "../../lib/hooks/useTopics";
import { LoaderSmall } from "../common/Loaders";


const HOATopicsPage = () => {
  const [isNewTopicModalOpen, setIsNewTopicModalOpen] = useState(false);
  const { data, refetch, loading } = useGetAllTopics();

  const authUser = useReactiveVar(authenticatedUser) as AuthUser;
  // useEffect(() => {
  //   useGetAllTopics();
  // }, [refetch]);

  return (
    <>
      {isNewTopicModalOpen && (
        <NewTopicModal onClose={() => setIsNewTopicModalOpen(false)} />
      )}
      <>
        <div className="w-full my-2  flex flex-col md:flex-row justify-between">
          <div className="my-2 justify-between flex items-center mb-2 gap-x-5 ">
            <h1 className="text-2xl font-bold text-gray-700">Topics </h1>
          </div>
          {authUser.role === GraphqlUserRole.HEAD_OF_ACADEMY && (
            <button
              onClick={()=>setIsNewTopicModalOpen(true)}
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
            <TopicList topics={data?.topics} title="All Topics" />
          )}
        </div>
      </>
    </>
  );
};

export default HOATopicsPage;
