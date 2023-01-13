import { useLazyQuery, useQuery } from "@apollo/client";
import {
  GET_ALL_PROBLEMS_BY_TAG_QUERY,
  GET_ALL_PROBLEMS_FILTERED,
  GET_ALL_PROBLEMS_QUERY,
  GET_PROBLEMS_BY_GROUP_SEASON_TOPIC,
  GET_PROBLEMS_BY_SEASON_TOPIC_FOR_HOA,
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

export const useGetProblemsBySeasonTopicForHOA = (seasonId: string) => {
  return useQuery(GET_PROBLEMS_BY_SEASON_TOPIC_FOR_HOA, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    variables: {
      seasonId: seasonId,
    },
  });
};

export const useGetProblemsByGroupSeasonTopic = (
  seasonId: string,
  topicId: string,
  groupId: string
) => {
  return useQuery(GET_PROBLEMS_BY_GROUP_SEASON_TOPIC, {
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

export default useAllProblems;
