import { useReactiveVar } from "@apollo/client";
import React, { ReactNode, useEffect, useState } from "react";
import BaseLayout from "../../components/common/BaseLayout";
import CustomDropdown, {
  CustomDropdownProps,
} from "../../components/common/CustomDropdown";
import NewTopicModal from "../../components/modals/NewTopicModal";
import SeasonSelecBox from "../../components/topics/SeasonSelecBox";
import TopicList from "../../components/topics/TopicList";
import TopicStruggledList from "../../components/topics/TopicStruggledList";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import { GraphqlUserRole } from "../../types/user";

const IndexPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const selectMenuItems = [
    {
      value: 7,
      label: "Education",
    },
    {
      value: 8,
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
  return (
    <BaseLayout sidebar={<Sidebar />}>
      {isModalOpen && <NewTopicModal onClose={() => setIsModalOpen(false)} />}
      <>
        <div className="flex flex-row justify-between">
          <div className="flex w-full items-center mb-2 gap-x-5 ">
            <h1 className="text-2xl font-bold text-gray-700">Topics</h1>
            <SeasonSelecBox
              handleSelect={(val) => setSelectedSeason(val)}
              selectMenuItems={selectMenuItems}
            />
          </div>
          {authUser.role !== GraphqlUserRole.STUDENT && (
            <button
              onClick={handleModalOpen}
              className="flex justify-center items-center w-44 px-2 text-sm font-semibold text-white bg-primary rounded-lg"
            >
              Add New Topic
            </button>
          )}
        </div>
        <div className="flex flex-col gap-y-4">
          {/* <TopicList selectedSeason={selectedSeason} title="Current" /> */}
          {/* <TopicList selectedSeason={selectedSeason} title="Recent" /> */}
          <TopicList selectedSeason={selectedSeason} title="All Covered" />
        </div>
      </>
    </BaseLayout>
  );
};

export default IndexPage;
