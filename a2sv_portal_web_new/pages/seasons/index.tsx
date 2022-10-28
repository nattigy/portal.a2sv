import React, { useState } from "react";
import AutoCompleteField from "../../components/users/HOEAutocomplete";
import AutoCompleteSearch from "../../components/topics/TopicsAutocomplete";
import BaseLayout from "../../components/common/BaseLayout";
import Button from "../../components/common/Button";
import { SeasonItemProps } from "../../components/seasons/SeasonItem";
import SeasonList from "../../components/seasons/SeasonList";
import SeasonSidebarItem from "../../components/seasons/SeasonSidebarItem";
import SeasonModal from "../../components/modals/SeasonModal";
import { useGetGroupSeasons } from "../../lib/hooks/useSeasons";
import { useReactiveVar } from "@apollo/client";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";

const IndexPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;
  const {data,loading,error} = useGetGroupSeasons(authUser?.headToGroup?.id);


  const seasons: Array<SeasonItemProps> = [
    {
      seasonId: 1,
      seasonName: "Camp 2021",
      seasonDescription: "Description about the season",
      students: [],
    },
    {
      seasonId: 2,
      seasonName: "Camp 2021",
      seasonDescription: "Description about the season",
      students: [],
    },
    {
      seasonId: 3,
      seasonName: "Camp 2021",
      seasonDescription: "Description about the season",
      students: [],
    },
  ];
  const Sidebar: React.FC = () => {
    return <SeasonSidebarItem />;
  };

  return (
    <BaseLayout sidebar={<Sidebar />}>
      {isModalOpen && <SeasonModal isEditing={false} onClose={() => setIsModalOpen(false)} />}
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between rounded-md">
          <h1 className="font-bold text-2xl">Season</h1>
          <div className="flex gap-x-2">
            <Button
              onClick={handleModalOpen}
              text="Create New"
              classname="bg-primary text-white text-xs"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <h1 className="font-semibold text-md">Current</h1>
          <SeasonList seasons={seasons} />
        </div>
        <div className="flex flex-col gap-y-4">
          <h1 className="font-semibold text-md">Previous</h1>
          <SeasonList seasons={seasons} />
        </div>
      </div>
    </BaseLayout>
  );
};

export default IndexPage;
