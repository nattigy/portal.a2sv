import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BaseLayout from "../../../components/common/BaseLayout";
import Button from "../../../components/common/Button";
import EmptyState from "../../../components/common/EmptyState";
import { LoaderSmall } from "../../../components/common/Loaders";
import TopicModal from "../../../components/modals/TopicModal";
import GlobalTopicItem from "../../../components/topics/GlobalTopicItem";
import GroupTopicItem from "../../../components/topics/GroupTopicItem";
import TopicList from "../../../components/topics/TopicList";
import TopicsFilter from "../../../components/topics/TopicsFilter";
import TopicStruggledList from "../../../components/topics/TopicStruggledList";
import WithPermission from "../../../lib/Guard/WithPermission";
import {
  useGetAllTopics, useGetSeasonTopics,
} from "../../../lib/hooks/useTopics";
import { Topic } from "../../../types/topic";
import { GraphqlUserRole } from "../../../types/user";

const IndexPage = () => {
  const router = useRouter();
  const [isAddTopicToGroupModalOpen, setIsAddTopicToGroupModalOpen] =
    useState(false);

  const [fetchSeasonTopics, { data, refetch, loading ,error}] =
  useGetSeasonTopics(
      router.query?.seasonId?.toString() || ""
    );

    const [fetchGroupSeasonTopics, { data:seasonTopicData, refetch:seasonTopicRefetch, loading:seasonTopicLoading ,error:seasonTopicError}] =
    useGetSeasonTopics(
        router.query?.seasonId?.toString() || ""
      );
  // const {
  //   data: allTopics,
  //   loading: allTopcisLoading,
  //   error:allTopicsError,
  // } = useGetAllTopics();

  const handleAddTopicToGroupModalOpen = () => {
    setIsAddTopicToGroupModalOpen(true);
  };

  const [topics, setTopics] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    fetchSeasonTopics();
  }, [tabIndex, refetch, fetchSeasonTopics]);



  useEffect(() => {
    // if (tabIndex == 0) {
    //   if (allTopics) {
    //     setTopics(allTopics?.topics?.items);
    //   }
    // } else {
      if (data) {
        setTopics(data.seasonsTopics?.items.map((item: any) => item.topic));
      }
    // }
  }, [refetch, data, tabIndex]);

  const [checkedState, setCheckedState] = useState(
    new Array(topics.length).fill(false)
);
const handleOnChange = (idx:number) => {
  const updatedCheckedState = checkedState.map((item, index) =>
    index === idx ? !item : item
  );
  setCheckedState(updatedCheckedState);

}
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
            <h1 className="text-lg font-semibold text-gray-700">All Topics</h1>
            {/* {JSON.stringify(data)} */}
            {/* {JSON.stringify(router.query?.seasonId)} */}
            {/* {JSON.stringify(error)} */}

          </div>
          {/* <WithPermission allowedRoles={[GraphqlUserRole.HEAD_OF_EDUCATION]}>
            <Button
              onClick={handleAddTopicToGroupModalOpen}
              text="Add Topic to Group"
              classname="bg-primary text-white text-xs"
            />
          </WithPermission> */}
          <WithPermission allowedRoles={[GraphqlUserRole.HEAD_OF_ACADEMY]}>
            <Button
              onClick={handleAddTopicToGroupModalOpen}
              text="Add Topic to Season"
              classname="bg-primary text-white text-xs"
            />
          </WithPermission>
        </div>
        {/* <WithPermission allowedRoles={[GraphqlUserRole.HEAD_OF_EDUCATION]}>
          <TopicsFilter
            handleTabChange={handleTabChange}
            activeIndex={tabIndex}
          />
        </WithPermission> */}

        <div className="w-full flex flex-col gap-y-4">
          {loading ? (
            <div className="h-full w-full flex justify-center items-center">
              <LoaderSmall />
            </div>
          ) : // ) : error ? (
          //   <p>Something went wrong</p>
          topics?.length === 0 ? (
            <EmptyState />
          ) : (
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3 gap-x-12">
              {topics.map((topic:Topic,idx:number)=>
              <GlobalTopicItem idx={idx} key={idx} season={{
                id: router.query.seasonId?.toString() || "",
                name: router.query.season?.toString() || "",
              }} topic={topic} />
              
              )}

            </div>
          )}
        </div>
       


        <div className="w-full flex flex-col md:flex-row justify-between">
          <div className=" justify-between flex items-center mb-2 gap-x-5 ">
            <h1 className="text-lg font-semibold text-gray-700">Group Topics</h1>
          </div>
          <WithPermission allowedRoles={[GraphqlUserRole.HEAD_OF_EDUCATION]}>
            <Button
              onClick={handleAddTopicToGroupModalOpen}
              text=""
              classname="bg-primary text-white text-xs"
            />
          </WithPermission>
        </div>
        {/* <WithPermission allowedRoles={[GraphqlUserRole.HEAD_OF_EDUCATION]}>
          <TopicsFilter
            handleTabChange={handleTabChange}
            activeIndex={tabIndex}
          />
        </WithPermission> */}

        <div className="w-full flex flex-col gap-y-4">
          {loading ? (
            <div className="h-full w-full flex justify-center items-center">
              <LoaderSmall />
            </div>
          ) : // ) : error ? (
          //   <p>Something went wrong</p>
          topics?.length === 0 ? (
            <EmptyState />
          ) : (
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3 gap-x-12">
              {topics.map((topic:Topic,idx:number)=>
              <GroupTopicItem idx={idx} key={idx} season={{
                id: router.query.seasonId?.toString() || "",
                name: router.query.season?.toString() || "",
              }} topic={topic} isChecked={checkedState[idx]} handleOnChange={()=>handleOnChange(idx)}/>
              
              )}

            </div>
          )}
        </div>






      </div>
    </BaseLayout>
  );
};

export default IndexPage;
