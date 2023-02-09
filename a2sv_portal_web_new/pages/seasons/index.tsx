import React, { useEffect, useState } from "react";
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
import {
  useGetAllSeasons,
  useGetGroupSeasons,
} from "../../lib/hooks/useSeasons";
import EmptyState from "../../components/common/EmptyState";
import { LoaderSmall } from "../../components/common/Loaders";
import SeasonRequestModal from "../../components/modals/SeasonRequestModal";
import { SeasonType } from "../../types/season";
import GroupSeasonItem from "../../components/seasons/GroupSeasonItem";

const IndexPage = () => {
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState<boolean>(false);
  const { data, loading, error } = useGetAllSeasons({});
  const [groupSeasons, setGroupSeasons] = useState([]);
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;
  const [
    getGroupSeasons,
    {
      data: groupSeasonData,
      loading: groupSeasonLoading,
      error: groupSeasonError,
    },
  ] = useGetGroupSeasons(authUser?.id);

  useEffect(() => {
    if (authUser.role == GraphqlUserRole.HEAD_OF_EDUCATION) {
      getGroupSeasons();
    }
  }, []);

  useEffect(() => {
    if (
      authUser.role == GraphqlUserRole.HEAD_OF_EDUCATION &&
      groupSeasonData?.groupSeasons?.items
    ) {
      setGroupSeasons(
        groupSeasonData.groupSeasons.items.map(
          (item: { season: SeasonType }) => item.season
        )
      );
    }
  }, [groupSeasonData]);

  const handleNewSeasonModalOpen = () => {
    setIsNewModalOpen(true);
  };

  const handleRequestSeasonModalOpen = () => {
    setIsRequestModalOpen(true);
  };

  const Sidebar: React.FC = () => {
    return <SeasonSidebarItem />;
  };

  return (
    <BaseLayout sidebar={<Sidebar />}>
      {isNewModalOpen && (
        <SeasonModal
          groupId={authUser?.headToGroup?.id}
          isEditing={false}
          onClose={() => setIsNewModalOpen(false)}
        />
      )}
      {isRequestModalOpen && (
        <SeasonRequestModal onClose={() => setIsRequestModalOpen(false)} />
      )}

<WithPermission allowedRoles={[GraphqlUserRole.HEAD_OF_ACADEMY,GraphqlUserRole.HEAD_OF_EDUCATION]}>

      <div className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between rounded-md">
          <h1 className="text-lg font-semibold">Global Seasons</h1>
          <div className="flex gap-x-2">
            <WithPermission allowedRoles={[GraphqlUserRole.HEAD_OF_ACADEMY]}>
              <Button
                onClick={handleNewSeasonModalOpen}
                text="Create New"
                classname="bg-primary text-white text-xs"
              />
            </WithPermission>
            <WithPermission allowedRoles={[GraphqlUserRole.HEAD_OF_EDUCATION]}>
              <Button
                onClick={handleRequestSeasonModalOpen}
                text="Request New Season"
                classname="bg-primary text-white text-xs"
              />
            </WithPermission>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          {error ? (
            <div>Something went wrong</div>
          ) : data?.seasons?.items.length === 0 ? (
            <div className="h-full flex items-center">
              <EmptyState />
            </div>
          ) : loading ? (
            <div className="w-full flex h-full items-center justify-center min-w-full min-h-full">
              <LoaderSmall />
            </div>
          ) : (
            <SeasonList seasons={data?.seasons?.items} />
          )}
        </div>
      </div>
      </WithPermission>

      <WithPermission allowedRoles={[GraphqlUserRole.HEAD_OF_EDUCATION]}>
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center justify-between rounded-md">
            <h1 className="text-lg font-semibold">Group Seasons</h1>
          </div>
          <div className="flex flex-col gap-y-4">
            {groupSeasonError ? (
              <div>Something went wrong</div>
            ) : groupSeasonData?.groupSeasons?.items?.length === 0 ? (
              <div className="h-full flex items-center">
                <EmptyState />
              </div>
            ) : groupSeasonLoading ? (
              <div className="w-full flex h-full items-center justify-center min-w-full min-h-full">
                <LoaderSmall />
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {groupSeasons.map((item: any, index: number) => (
                <GroupSeasonItem key={index} seasonProps={item} />
              ))}
            </div>)
              // <SeasonList seasons={groupSeasons} />
            }
          </div>
        </div>
      </WithPermission>
    </BaseLayout>
  );
};

export default IndexPage;
