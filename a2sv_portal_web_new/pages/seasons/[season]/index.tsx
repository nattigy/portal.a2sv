import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BaseLayout from "../../../components/common/BaseLayout";
import Button from "../../../components/common/Button";
import EmptyState from "../../../components/common/EmptyState";
import { LoaderSmall } from "../../../components/common/Loaders";
import TopicModal from "../../../components/modals/TopicModal";
import TopicList from "../../../components/topics/TopicList";
import TopicsFilter from "../../../components/topics/TopicsFilter";
import TopicStruggledList from "../../../components/topics/TopicStruggledList";
import {
  authenticatedUser,
  AuthUser,
} from "../../../lib/constants/authenticated";
import WithPermission from "../../../lib/Guard/WithPermission";
import {
  useGetAllGroupTopicsBySeasonIdQuery,
  useGetAllTopics,
} from "../../../lib/hooks/useTopics";
import { GraphqlUserRole } from "../../../types/user";

const IndexPage = () => {
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;
  const [isAddTopicToGroupModalOpen, setIsAddTopicToGroupModalOpen] =
    useState(false);
  const {
    data: allTopics,
    loading: allTopcisLoading,
    error,
  } = useGetAllTopics();

  const handleAddTopicToGroupModalOpen = () => {
    setIsAddTopicToGroupModalOpen(true);
  };
  const router = useRouter();
  const [fetchSeasonTopics, { data, refetch, loading }] =
    useGetAllGroupTopicsBySeasonIdQuery(
      router.query?.seasonId?.toString() || ""
    );
  const [topics, setTopics] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  // useEffect(() => {
  //   if (!router.isReady) return;
  //   fetchSeasonTopics({
  //     variables: {
  //       filterSeasonTopicInput: {
  //         seasonId: router.query?.seasonId?.toString() || "",
  //       },
  //     },
  //   });
  //   // codes using router.query
  // }, [router.isReady,refetch,data,fetchSeasonTopics]);

  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    fetchSeasonTopics();
  }, [tabIndex, refetch, fetchSeasonTopics]);

  useEffect(() => {
    if (tabIndex == 0) {
      if (allTopics) {
        setTopics(allTopics?.topics?.items);
      }
    } else {
      if (data) {
        setTopics(data.seasonTopics?.items.map((item:any)=>item.topic));
      }
    }
  }, [refetch, data, tabIndex, allTopics]);

  const Sidebar: React.FC = () => {
    return (
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-y-5">
          <p className="font-bold">Topics struggling with</p>
          <TopicStruggledList />
        </div>

        <div className="flex-col flex items-center">
          <p className="text-sm">Are You Strugging with a Topic?</p>
          <img src="/images/struggling.svg" className="w-3/5" alt="" />
          <p className="text-[#747474] font-light text-sm">
            Don’t worry we’ll give you a reliable hand. Don’t give up keep
            pushing!
          </p>
        </div>
      </div>
    );
  };

  return (
    <BaseLayout sidebar={<Sidebar />}>
      {isAddTopicToGroupModalOpen && (
        <TopicModal
          isEditing={false}
          onClose={() => setIsAddTopicToGroupModalOpen(false)}
          seasonId={router.query?.seasonId?.toString() || ""}
        />
      )}
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

        <div className="w-full flex flex-col  gap-y-4">
          {loading ? (
            <div className=" h-full w-full flex ">
              <LoaderSmall />
            </div>
          ) : // ) : error ? (
          //   <p>Something went wrong</p>
          topics.length=== 0 ? (
            <EmptyState />
          ) : (
            <TopicList
              season={{
                id: router.query.seasonId?.toString() || "",
                name: router.query.season?.toString() || "",
              }}
              topics={topics}
              title="Topics"
            />
          )}
        </div>
        {/* )} */}
      </div>
    </BaseLayout>
  );
};

export default IndexPage;
