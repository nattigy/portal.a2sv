import React, { useState } from "react";
import AutoCompleteField from "../../components/users/HOEAutocomplete";
import AutoCompleteSearch from "../../components/topics/TopicsAutocomplete";
import BaseLayout from "../../components/common/BaseLayout";
import Button from "../../components/common/Button";
import SeasonList from "../../components/seasons/SeasonList";
import SeasonSidebarItem from "../../components/seasons/SeasonSidebarItem";
import SeasonModal from "../../components/modals/SeasonModal";
import { useReactiveVar } from "@apollo/client";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import { GraphqlUserRole } from "../../types/user";
import WithPermission from "../../lib/Guard/WithPermission";

const IndexPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;

  const Sidebar: React.FC = () => {
    return <SeasonSidebarItem />;
  };

  return (
    <BaseLayout sidebar={<Sidebar />}>
      {isModalOpen && (
        <SeasonModal
          groupId={authUser?.headToGroup?.id}
          isEditing={false}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between rounded-md">
          <h1 className="font-bold text-2xl">Season</h1>
          <div className="flex gap-x-2">
            <WithPermission
              allowedRoles={[
                GraphqlUserRole.HEAD_OF_ACADEMY,
                GraphqlUserRole.HEAD_OF_EDUCATION,
              ]}
            >
              <Button
                onClick={handleModalOpen}
                text="Create New"
                classname="bg-primary text-white text-xs"
              />
            </WithPermission>
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          {/* <h1 className="font-semibold text-md">Current</h1> */}
          {JSON.stringify(authUser.headToGroup?.id || authUser.groupId)}
          <SeasonList groupId={authUser.headToGroup?.id || authUser.groupId} />
        </div>

        {/* <div className="flex flex-col gap-y-4">
          <h1 className="font-semibold text-md">Previous</h1>
          <SeasonList seasons={data?.group?.seasons} />
        </div> */}
      </div>
    </BaseLayout>
  );
};

export default IndexPage;
