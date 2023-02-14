import { useMutation, useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import Button from "../common/Button";
import EmptyState from "../common/EmptyState";
import { LoaderSmall } from "../common/Loaders";
import { useRouter } from "next/router";
import {
  useGetGroupSeasonTopics,
  useGetSeasonTopics,
} from "../../lib/hooks/useTopics";
import { Topic } from "../../types/topic";
import GroupTopicItem from "./GroupTopicItem";
import { ADD_GROUP_SEASON_TOPIC } from "../../lib/apollo/Mutations/topicsMutations";

const HOETopicsPage = () => {
  const router = useRouter();
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;
  const { data, loading, error } = useGetGroupSeasonTopics(
    router.query?.seasonId?.toString() || "",
    authUser.headToGroup?.id || authUser.groupId ||  ""
  );
  const {
    data: seasonTopicData,
    loading: seasonTopicLoading,
    error: seasonTopicError,
  } = useGetSeasonTopics(router.query?.seasonId?.toString() || "");

  const [seasonTopics, setSeasonTopics] = useState<
    { topic: Topic; isChecked: boolean }[]
  >([]);

  const [addTopicToGroupSeason, { loading: addLoading, error: addError }] =
    useMutation(ADD_GROUP_SEASON_TOPIC);

  useEffect(() => {
    if (data && seasonTopicData) {
      setSeasonTopics(
        seasonTopicData.seasonsTopics?.items.map((item: any) => {
          return {
            topic: item.topic,
            isChecked: data.groupSeasonTopics.find(
              (groupSeasonTopic: any) =>
                groupSeasonTopic.topic.id === item.topic.id
            ),
          };
        })
      );
    }
  }, [data, seasonTopicData]);

  const saveChanges = async () => {
    const ids = seasonTopics
      .filter((item: { topic: Topic; isChecked: boolean }) => item.isChecked)
      .map((item: { topic: Topic; isChecked: boolean }) => item.topic.id);

    await addTopicToGroupSeason({
      variables: {
        groupSeasonId: {
          groupId: authUser.headToGroup?.id,
          seasonId: router.query?.seasonId?.toString(),
        },
        topicIds: [...ids],
      },
      notifyOnNetworkStatusChange: true,
      refetchQueries: "active",
    });
  };

  const handleOnChange = (idx: number) => {
    const updatedCheckedState = seasonTopics.map((item, index) => {
      item.isChecked = index === idx ? !item.isChecked : item.isChecked;
      return item;
    });
    setSeasonTopics(updatedCheckedState);
  };

  return (
    <>
      <div className="w-full flex flex-col md:flex-row justify-between">
        <div className=" justify-between flex items-center mb-2 gap-x-5 ">
          <h1 className="text-lg font-semibold text-gray-700">Group Topics</h1>
        </div>
        {addError && (
          <div className="bg-[#E4646451] py-1 rounded-md">
            <span className="text-[#E46464] px-4 text-xs">
              {addError.message}
            </span>
          </div>
        )}
        <Button
          onClick={() => {
            saveChanges();
          }}
          text="Save Changes"
          isLoading={addLoading}
          classname="bg-primary text-white text-xs"
        />
      </div>

      <div className="w-full flex flex-col gap-y-4">
        {loading ? (
          <div className="h-full w-full flex justify-center items-center">
            <LoaderSmall />
          </div>
        ) : error ? (
          <p>Something went wrong</p>
        ) : seasonTopics?.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3 gap-x-12">
            {seasonTopics?.map(
              (item: { topic: Topic; isChecked: boolean }, idx: number) => (
                  <GroupTopicItem
                    idx={idx}
                    key={idx}
                    season={{
                      id: router.query.seasonId?.toString() || "",
                      name: router.query.season?.toString() || "",
                    }}
                    topic={item.topic}
                    isChecked={item.isChecked}
                    handleOnChange={() => handleOnChange(idx)}
                  />
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HOETopicsPage;
