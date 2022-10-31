import { useLazyQuery, useQuery } from "@apollo/client";
import {
  GET_ALL_PROBLEMS_QUERY,
  GET_PROBLEMS_BY_GROUP_SEASON_TOPIC,
} from "../apollo/Queries/problemsQueries";
export const useAllProblems = () => {
  return useQuery(GET_ALL_PROBLEMS_QUERY, {
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });
};

export const useGetProblemsByGroupSeasonTopic = (
  seasonId: string,
  groupId: string,
  topicId: string
) => {
  return useLazyQuery(GET_PROBLEMS_BY_GROUP_SEASON_TOPIC, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    variables: {
      groupId: groupId,
      topicId: topicId,
      seasonId: seasonId,
    },
  });
};

export default useAllProblems;
