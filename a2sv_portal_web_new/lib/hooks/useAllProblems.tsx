import { useLazyQuery, useQuery } from "@apollo/client";
import {
  GET_ALL_PROBLEM_QUERY,
  GET_PROBLEMS_BY_GROUP_SEASON_TOPIC,
} from "../apollo/Queries/problemsQueries";
const useAllProblems = () => {
  return useQuery(GET_ALL_PROBLEM_QUERY, {
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });
};

export const useGetProblemsByGroupSeasonTopic = (
  seasonId: number,
  groupId: number,
  topicId: number
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
