import { useReactiveVar } from "@apollo/client";
import React, { ReactNode, useEffect, useState } from "react";
import BaseLayout from "../../components/common/BaseLayout";
import CustomDropdown, {
  CustomDropdownProps,
} from "../../components/common/CustomDropdown";
import HOATopicsPage from "../../components/common/HOATopicsPage";
import HOETopicsPage from "../../components/common/HOETopicsPage";
import AddTopicToGroupModal from "../../components/modals/AddTopicToGroupModal";
import NewTopicModal from "../../components/modals/NewTopicModal";
import SeasonSelecBox from "../../components/topics/SeasonSelecBox";
import TopicList from "../../components/topics/TopicList";
import TopicStruggledList from "../../components/topics/TopicStruggledList";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import { GraphqlUserRole } from "../../types/user";

const IndexPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddTopicToGroupModalOpen, setIsAddTopicToGroupModalOpen] = useState(false)
  const selectMenuItems = [
    {
      value: 2,
      label: "Education",
    },
    {
      value: 1,
      label: "Camp",
    },
  ];
  const [selectedSeason, setSelectedSeason] = useState(
    selectMenuItems[0]
  );
  const dropdown: CustomDropdownProps = {
    label: "",
    options: ["Education", "Camp"],
  };

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


  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleAddTopicToGroupModalOpen = () => {
    setIsAddTopicToGroupModalOpen(true);
  };



  const ActiveComponent = ({ user }: {
    user: {
      id: string,
      role: string,
      status: string
      email: string,
    }
  }) => {

    switch (user.role) {
      case GraphqlUserRole.STUDENT: {
        return <HOETopicsPage groupId={authUser?.headToGroup?.id} />
      }
      case GraphqlUserRole.HEAD_OF_EDUCATION: {
        return <HOETopicsPage groupId={authUser?.headToGroup?.id} />
      }
      case GraphqlUserRole.HEAD_OF_ACADEMY: {
        return <HOATopicsPage />
      }
      default: {
        return <HOETopicsPage groupId={authUser?.headToGroup?.id} />
      }
    }

  }
  return (
    <BaseLayout sidebar={<Sidebar />}>
      <ActiveComponent user={authUser as any} />
    </BaseLayout>
  );
}

export default IndexPage;
