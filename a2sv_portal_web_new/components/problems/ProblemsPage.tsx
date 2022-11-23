import React, { ReactNode, useEffect, useState } from "react";
import { ProblemType } from "../../types/problems";
import { ApolloError, useMutation, useReactiveVar } from "@apollo/client";
import { authenticatedUser } from "../../lib/constants/authenticated";
import { GraphqlUserRole } from "../../types/user";
import useAllProblems, {
  useGetProblemsByGroupSeasonTopic,
} from "../../lib/hooks/useAllProblems";
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
  const authUser = useReactiveVar(authenticatedUser);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddNewProblemModalOpen, setIsAddNewProblemModalOpen] =
    useState<boolean>(false);
  const { loading, data, error } = useGetProblemsByGroupSeasonTopic(
    props.seasonId,
    props.topicId
  );
  const [
    removeSeasonTopic,
    { loading: removeTopicLoading, error: removeTopicError },
  ] = useMutation(REMOVE_SEASON_TOPIC);
  const [problems, setProblems] = useState<ProblemType[]>([]);
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
    if (data) {
      setProblems(
        data?.seasonTopicProblems?.items.map((item: any) => item.problem)
      );
    }
  }, [data]);
  const router = useRouter();
  console.log(data);

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
                router.back()
              },
            });
          }}
        />
      )}
      <div className="h-screen font-semibold text-[#565656]">
        <div className="flex flex-row items-center justify-between my-6 font-semibold text-xl text-[#565656]">
          <div className="w-full flex flex-row justify-between">
            <h1 className="capitalize text-2xl font-semibold">
              {props.topicName}
            </h1>
            <div className="flex flex-row gap-x-5">
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
              <div className="relative">
                <MenuItem
                  color="#000000"
                  menuItems={[
                    {
                      title: "Delete Topic",
                      onClick: (e: any) => {
                        setIsDeleteModalOpen(true);
                      },
                    },
                  ]}
                />
              </div>
            </div>

            {(authUser as any).role === GraphqlUserRole.HEAD_OF_ACADEMY && (
              <div>
                <MenuItem
                  menuItems={[
                    {
                      title: "Edit Topic",
                      onClick: (e: any) => {
                        e.stopPropagation();
                        handleEditModalOpen();
                      },
                    },
                    {
                      title: "Delete Topic",
                      onClick: (e: any) => {
                        e.stopPropagation();
                        handleDeleteModalOpen();
                      },
                    },
                  ]}
                />
              </div>
            )}
          </div>
        </div>
        {loading ? (
          <div className="w-full flex items-center justify-center">
            <LoaderSmall />
          </div>
        ) : error ? (
          <p>Something went wrong</p>
        ) : problems?.length === 0 ? (
          <EmptyState />
        ) : (
          <div>
            <ProblemsTable
              problems={problems}
              seasonId={props.seasonId}
              topicId={props.topicId}
            />
          </div>
        )}
      </div>
    </>
  );
};
export default ProblemsPage;
