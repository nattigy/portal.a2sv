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
import {
  ADD_GROUP_SEASON_TOPIC,
  REMOVE_GROUP_SEASON_TOPIC,
} from "../../lib/apollo/Mutations/topicsMutations";
import GlobalTopicItem from "./GlobalTopicItem";
import clsx from "clsx";

const HOETopicsPage = () => {
  const router = useRouter();
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;
  const { data, loading, error } = useGetGroupSeasonTopics(
    router.query?.seasonId?.toString() || "",
    authUser.headToGroup?.id || authUser.groupId || ""
  );
  const {
    data: seasonTopicData,
    loading: seasonTopicLoading,
    error: seasonTopicError,
  } = useGetSeasonTopics(router.query?.seasonId?.toString() || "");

  const [seasonTopics, setSeasonTopics] = useState<Topic[]>([]);
  const [remainingSeasonTopics, setRemainingSeasonTopics] = useState<Topic[]>(
    []
  );

  const [addTopicToGroupSeason, { loading: addLoading, error: addError }] =
    useMutation(ADD_GROUP_SEASON_TOPIC);
  const [
    removeTopicFromGroupSeason,
    { loading: removeLoading, error: removeError },
  ] = useMutation(REMOVE_GROUP_SEASON_TOPIC);

  useEffect(() => {
    if (seasonTopicData && data) {
      const allGroupTopicsId = new Set();
      const groupTopics = data.groupSeasonTopics?.map((item: any) => {
        allGroupTopicsId.add(item.topic.id);
        return item.topic;
      });
      setSeasonTopics(groupTopics);
      const allTopics = seasonTopicData.seasonsTopics?.items?.map(
        (item: any) => {
          return item.topic;
        }
      );

      let intersect = allTopics?.filter((topic: Topic) => {
        return !allGroupTopicsId.has(topic.id);
      });
      setRemainingSeasonTopics(intersect);
    }
  }, [data, seasonTopicData]);

  const handleAddTopicsToGroup = async (ids: string[]) => {
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
      onCompleted: (data) => {
        setSelectedAllTopicsCount(0);
      },
    });
  };

  const handleRemoveTopicsFromGroup = async (ids: string[]) => {
    await removeTopicFromGroupSeason({
      variables: {
        groupSeasonTopicId: {
          groupId: authUser.headToGroup?.id,
          seasonId: router.query?.seasonId?.toString(),
          topicId: [...ids],
        },
      },
      notifyOnNetworkStatusChange: true,
      refetchQueries: "active",
      onCompleted: (data) => {
        setSelectedGroupTopicsCount(0);
      },
    });
  };

  const [selectedGroupTopic, setSelectedGroupTopic] = useState<Set<string>>(
    new Set([])
  );
  const [selectedAllTopic, setSelectedAllTopic] = useState<Set<string>>(
    new Set([])
  );

  const allGroupTopicsId = [...seasonTopics]?.map((topic: any) => topic.id);
  const allTopicsId = [...remainingSeasonTopics]?.map((topic: any) => topic.id);

  const [selectedGroupTopicsCount, setSelectedGroupTopicsCount] = useState(0);
  const [selectedAllTopicsCount, setSelectedAllTopicsCount] = useState(0);

  const handleGroupTopicCheck = (id: string) => {
    if (selectedGroupTopic.has(id)) {
      selectedGroupTopic.delete(id);
    } else {
      selectedGroupTopic.add(id);
    }
    setSelectedGroupTopic(new Set([...selectedGroupTopic]));
    setSelectedGroupTopicsCount(selectedGroupTopic.size);
  };
  const handleAllTopicCheck = (id: string) => {
    if (selectedAllTopic.has(id)) {
      selectedAllTopic.delete(id);
    } else {
      selectedAllTopic.add(id);
    }
    setSelectedAllTopic(new Set([...selectedAllTopic]));
    setSelectedAllTopicsCount(selectedAllTopic.size);
  };

  return (
    <div className="flex flex-col gap-y-3">
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
          onClick={() => {}}
          // onClick={() => {
          //   saveChanges();
          // }}
          text={`Remove Topics from Group (${selectedGroupTopicsCount})`}
          isLoading={removeLoading}
          disabled={selectedGroupTopicsCount === 0}
          classname={clsx(
            "text-white text-xs",
            selectedGroupTopicsCount === 0 ? "bg-primary/40" : "bg-primary"
          )}
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
            {seasonTopics?.map((item: Topic, idx: number) => (
              <GroupTopicItem
                idx={idx}
                key={idx}
                season={{
                  id: router.query.seasonId?.toString() || "",
                  name: router.query.season?.toString() || "",
                }}
                topic={item}
                selectedItems={selectedGroupTopic}
                handleOnChange={handleGroupTopicCheck}
              />
            ))}
          </div>
        )}
      </div>
      <div className="w-full flex flex-col md:flex-row justify-between">
        <div className=" justify-between flex items-center mb-2 gap-x-5 ">
          <h1 className="text-lg font-semibold text-gray-700">Global Topics</h1>
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
            handleAddTopicsToGroup([...selectedAllTopic]);
          }}
          text={`Add Topics to Group (${selectedAllTopicsCount})`}
          isLoading={addLoading}
          disabled={selectedAllTopicsCount === 0}
          classname={clsx(
            "text-white text-xs",
            selectedAllTopicsCount === 0 ? "bg-primary/40" : "bg-primary"
          )}
        />
      </div>

      <div className="w-full flex flex-col gap-y-4">
        {loading ? (
          <div className="h-full w-full flex justify-center items-center">
            <LoaderSmall />
          </div>
        ) : error ? (
          <p>Something went wrong</p>
        ) : remainingSeasonTopics?.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3 gap-x-12">
            {remainingSeasonTopics?.map((item: Topic, idx: number) => (
              <GroupTopicItem
                idx={idx}
                key={idx}
                season={{
                  id: router.query.seasonId?.toString() || "",
                  name: router.query.season?.toString() || "",
                }}
                topic={item}
                selectedItems={selectedAllTopic}
                handleOnChange={handleAllTopicCheck}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HOETopicsPage;
