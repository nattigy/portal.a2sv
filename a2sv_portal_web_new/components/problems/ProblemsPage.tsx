import React, { ReactNode, useEffect, useState } from "react";
import { ProblemType } from "../../types/problems";
import { ApolloError, useMutation, useReactiveVar } from "@apollo/client";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import { GraphqlUserRole } from "../../types/user";
import {
  useAllProblems,
  useGetProblemsByGroupSeasonTopic,
  useGetSeasonTopicProblems,
} from "../../lib/hooks/useProblems";
import { LoaderSmall } from "../common/Loaders";
import Button from "../common/Button";
import SearchField from "../common/SearchField";
import EmptyState from "../common/EmptyState";
import ProblemModal from "../modals/ProblemModal";
import MenuItem from "../common/MenuItem";
import TopicModal from "../modals/TopicModal";
import DeletePopupModal from "../modals/DeletePopupModal";
import { REMOVE_SEASON_TOPIC } from "../../lib/apollo/Mutations/topicsMutations";
import { useRouter } from "next/router";
import ProblemsTable from "./ProblemsTable";
import { getSVGIcon } from "../../helpers/getSVGPath";
import WithPermission from "../../lib/Guard/WithPermission";
import ProblemsList from "./ProblemsList";
import { MdOutlineTableView, MdViewList } from "react-icons/md";
import { AiOutlineTable } from "react-icons/ai";
import StudentProblemsTable from "./StudentProblemsTable";

export type PlatformInfo = {
  id: string;
  name: string;
};
type ProblemsPageProps = {
  topicName: string;
  seasonId: string;
  topicId: string;
};

const ProblemsPage = (props: ProblemsPageProps) => {
  const { seasonId, topicId } = props;
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;
  const [tableView, setTableView] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddNewProblemModalOpen, setIsAddNewProblemModalOpen] =
    useState<boolean>(false);

  const [loadSeasonTopicProblems, { data, loading, error }] =
    useGetSeasonTopicProblems(seasonId, topicId);
  const [
    loadGroupSeasonTopicProblems,
    {
      data: groupData,
      loading: groupLoading,
      error: groupError,
      refetch: groupRefetch,
    },
  ] = useGetProblemsByGroupSeasonTopic(
    seasonId,
    topicId,
    authUser.headToGroup?.id || authUser.groupId
  );
  const [
    removeSeasonTopic,
    { loading: removeTopicLoading, error: removeTopicError },
  ] = useMutation(REMOVE_SEASON_TOPIC);

  const [seasonTopicProblems, setSeasonTopicProblems] = useState<any[]>([]);
  const [groupSeasonTopicProblems, setGroupSeasonTopicProblems] = useState<
    ProblemType[]
  >([]);
  const [filteredSeasonTopicProblems, setFilteredSeasonTopicProblems] =
    useState<any[]>([]);

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };
  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const handleModalOpen = () => {
    setIsAddNewProblemModalOpen(true);
  };

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if ((authUser as any).role !== GraphqlUserRole.HEAD_OF_ACADEMY) {
      loadGroupSeasonTopicProblems();
    }
    loadSeasonTopicProblems();
  }, [authUser, loadGroupSeasonTopicProblems, loadSeasonTopicProblems]);

  useEffect(() => {
    if (data) {
      setSeasonTopicProblems(
        data?.seasonTopic?.seasonTopicProblems?.map((item: any) => item.problem)
      );
    }
  }, [data]);

  useEffect(() => {
    if (groupData) {
      const allproblemsId = new Set();
      const groupFetchedProblems =
        groupData?.groupSeasonTopic?.groupSeasonTopicProblems?.map(
          (item: any) => {
            allproblemsId.add(item.problem.id);
            return item.problem;
          }
        );

      setGroupSeasonTopicProblems(groupFetchedProblems);
      let intersect = seasonTopicProblems.filter(
        (i: ProblemType) => !allproblemsId.has(i.id)
      );
      setFilteredSeasonTopicProblems(intersect);
    }
  }, [groupData, seasonTopicProblems]);

  const router = useRouter();
  return (
    <>
      {isAddNewProblemModalOpen && (
        <ProblemModal
          isEditing={false}
          {...props}
          onClose={() => setIsAddNewProblemModalOpen(false)}
        />
      )}
      {isEditModalOpen && (
        <TopicModal
          isEditing={true}
          onClose={() => setIsEditModalOpen(false)}
          seasonId={""}
        />
      )}
      {isDeleteModalOpen && (
        <DeletePopupModal
          title="Delete Topic"
          errorMessage={(removeTopicError as ApolloError)?.message || ""}
          isLoading={removeTopicLoading}
          description="This will delete the topic from topic set"
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={async () => {
            await removeSeasonTopic({
              variables: { seasonId: props.seasonId, topicId: props.topicId },
              refetchQueries: "active",
              notifyOnNetworkStatusChange: true,
              onCompleted: (data) => {
                setIsDeleteModalOpen(false);
                router.back();
              },
            });
          }}
        />
      )}
      <div className="h-full font-semibold text-[#565656]">
        <div className="w-full font-semibold text-xl text-[#565656]">
          <div className="w-full flex items-center justify-between relative">
            <h1 className="capitalize text-xl font-semibold">
              {props.topicName}
            </h1>
            <div className="flex flex-row items-center gap-x-3 mb-2">
              <WithPermission
                allowedRoles={[GraphqlUserRole.HEAD_OF_EDUCATION]}
              >
                <div
                  onClick={() => {
                    setTableView(!tableView);
                  }}
                >
                  {tableView ? (
                    <AiOutlineTable color="#5956e9" size={28} />
                  ) : (
                    <MdViewList color="#5956e9" size={28} />
                  )}
                </div>
              </WithPermission>

              <SearchField
                onChange={(e) => handleSearch}
                placeholder="Search a problem"
                id="problem"
              />
              {(authUser as any).role !== GraphqlUserRole.STUDENT && (
                <Button
                  onClick={handleModalOpen}
                  text="Add New Problem"
                  classname="bg-primary text-white text-xs"
                />
              )}
              {(authUser as any).role === GraphqlUserRole.HEAD_OF_ACADEMY && (
                <MenuItem
                  color="#000000"
                  menuItems={[
                    // {
                    //   title: "Edit Topic",
                    //   onClick: (e: any) => {
                    //     e.stopPropagation();
                    //     handleEditModalOpen();
                    //   },
                    // },
                    {
                      title: "Delete Topic",
                      onClick: (e: any) => {
                        e.stopPropagation();
                        handleDeleteModalOpen();
                      },
                      icon: getSVGIcon("delete"),
                    },
                  ]}
                />
              )}
              {/* <MenuItem
                color="#000000"
                menuItems={[
                  {
                    title: "Delete Topic",
                    onClick: (e: any) => {
                      setIsDeleteModalOpen(true);
                    },
                  },
                ]}
              /> */}
            </div>
          </div>
        </div>
        {loading ? (
          <div className="w-full flex items-center justify-center">
            <LoaderSmall />
          </div>
        ) : error ? (
          <p>Something went wrong</p>
        ) : seasonTopicProblems.length === 0 ? (
          <EmptyState />
        ) : (
          <div>
            <WithPermission allowedRoles={[GraphqlUserRole.HEAD_OF_ACADEMY]}>
              <ProblemsTable
                problems={seasonTopicProblems}
                seasonId={props.seasonId}
                topicId={props.topicId}
                group={false}
              />
            </WithPermission>
            <WithPermission allowedRoles={[GraphqlUserRole.STUDENT]}>
              <div className="flex flex-col gap-y-[2rem]">
                <StudentProblemsTable
                  seasonId={props.seasonId}
                  topicId={props.topicId}
                />
              </div>
            </WithPermission>

            <WithPermission allowedRoles={[GraphqlUserRole.HEAD_OF_EDUCATION]}>
              <div className="flex flex-col gap-y-[2rem]">
                {groupLoading || loading ? (
                  <div className="w-full flex items-center justify-center">
                    <LoaderSmall />
                  </div>
                ) : (
                  <div className="flex flex-col gap-y-2 my-5">
                    {tableView ? (
                      <>
                        <h1>Group Problems</h1>
                        <ProblemsTable
                          problems={groupSeasonTopicProblems}
                          seasonId={props.seasonId}
                          topicId={props.topicId}
                          group={true}
                        />
                        <br />
                        <h1>All Problems</h1>
                        <ProblemsTable
                          problems={filteredSeasonTopicProblems}
                          seasonId={props.seasonId}
                          topicId={props.topicId}
                          group={false}
                        />
                      </>
                    ) : (
                      <ProblemsList
                        groupProblems={groupSeasonTopicProblems}
                        allProblems={filteredSeasonTopicProblems}
                        seasonId={props.seasonId}
                        topicId={props.topicId}
                        group={true}
                      />
                    )}
                  </div>
                )}
              </div>
            </WithPermission>
          </div>
        )}
      </div>
    </>
  );
};
export default ProblemsPage;
