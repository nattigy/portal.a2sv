import { useReactiveVar } from "@apollo/client";
import React, { useState } from "react";
import BaseLayout from "../../../components/common/BaseLayout";
import TopicStruggledList from "../../../components/topics/TopicStruggledList";
import {
  authenticatedUser,
  AuthUser,
} from "../../../lib/constants/authenticated";
import { GraphqlUserRole } from "../../../types/user";
import HOETopicsPage from "../../../components/topics/HOETopicsPage";

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
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;

  const ActiveComponent = ({
    user,
  }: {
    user: {
      id: string;
      role: string;
      status: string;
      email: string;
    };
  }) => {
    switch (user.role) {
      case GraphqlUserRole.STUDENT: {
        return <HOETopicsPage groupId={authUser?.id} />;
      }
      case GraphqlUserRole.HEAD_OF_EDUCATION: {
        return <HOETopicsPage groupId={authUser?.headToGroup?.id} />;
      }
      case GraphqlUserRole.HEAD_OF_ACADEMY: {
        return <></>;
      }
      default: {
        return <HOETopicsPage groupId={authUser?.headToGroup?.id} />;
      }
    }
  };
  return (
    <BaseLayout sidebar={<Sidebar />}>
      <ActiveComponent user={authUser as any} />
    </BaseLayout>
  );
};

export default IndexPage;
