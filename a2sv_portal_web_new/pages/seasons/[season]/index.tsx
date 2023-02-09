import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BaseLayout from "../../../components/common/BaseLayout";
import Button from "../../../components/common/Button";
import EmptyState from "../../../components/common/EmptyState";
import { LoaderSmall } from "../../../components/common/Loaders";
import TopicModal from "../../../components/modals/TopicModal";
import GlobalTopicItem from "../../../components/topics/GlobalTopicItem";
import GroupTopicItem from "../../../components/topics/GroupTopicItem";
import HOATopicsPage from "../../../components/topics/HOATopicsPage";
import HOETopicsPage from "../../../components/topics/HOETopicsPage";
import TopicList from "../../../components/topics/TopicList";
import TopicsFilter from "../../../components/topics/TopicsFilter";
import TopicStruggledList from "../../../components/topics/TopicStruggledList";
import {
  authenticatedUser,
  AuthUser,
} from "../../../lib/constants/authenticated";
import WithPermission from "../../../lib/Guard/WithPermission";
import {
  useGetAllTopics,
  useGetGroupSeasonTopics,
  useGetSeasonTopics,
} from "../../../lib/hooks/useTopics";
import { Topic } from "../../../types/topic";
import { GraphqlUserRole } from "../../../types/user";

const IndexPage = () => {
  
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
      <div className="h-full">
        <WithPermission allowedRoles={[GraphqlUserRole.HEAD_OF_ACADEMY]}>
          <HOATopicsPage/>
        </WithPermission>
        <WithPermission allowedRoles={[GraphqlUserRole.HEAD_OF_EDUCATION]}>
          <HOETopicsPage/>
        </WithPermission>
      </div>
    </BaseLayout>
  );
};

export default IndexPage;
