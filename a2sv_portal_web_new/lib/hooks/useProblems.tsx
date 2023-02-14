import { useLazyQuery, useQuery } from "@apollo/client";
import {
  GET_ALL_PROBLEMS_BY_TAG_QUERY,
  GET_ALL_PROBLEMS_FILTERED,
  GET_ALL_PROBLEMS_QUERY,
  GET_PROBLEMS_BY_GROUP_SEASON_TOPIC,
  GET_PROBLEMS_BY_SEASON_TOPIC,
  GET_USER_GROUP_SEASON_TOPIC_PROBLEMS,
} from "../apollo/Queries/problemsQueries";

export const useAllProblems = () => {
  return useQuery(GET_ALL_PROBLEMS_QUERY, {
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });
};

export const useGetAllProblemsByTags = (tags: string[]) => {
  return useQuery(GET_ALL_PROBLEMS_BY_TAG_QUERY, {
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
    variables: {
      filterProblemInput: {
        tags,
      },
    },
  });
};

export const useGetAllFilteredProblems = () => {
  return useQuery(GET_ALL_PROBLEMS_FILTERED, {
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });
};

export const useGetSeasonTopicProblems = (
  seasonId: string,
  topicId: string
) => {
  return useLazyQuery(GET_PROBLEMS_BY_SEASON_TOPIC, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    variables: {
      seasonTopicId: {
        seasonId: seasonId,
        topicId: topicId,
      },
    },
  });
};

export const useGetProblemsByGroupSeasonTopic = (
  seasonId: string,
  topicId: string,
  groupId: string
) => {
  return useLazyQuery(GET_PROBLEMS_BY_GROUP_SEASON_TOPIC, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",

    variables: {
      groupSeasonTopicId: {
        topicId,
        seasonId,
        groupId,
      },
    },
  });
};

export const useGetUserGroupSeasonTopicProblems = (
  userId: string,
  topicId: string,
  seasonId: string,
  groupId: string
) => {
  return useQuery(GET_USER_GROUP_SEASON_TOPIC_PROBLEMS, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    variables: {
      userGroupSeasonTopicId: {
        userId,
        topicId,
        seasonId,
        groupId,
      },
    },
  });
};
