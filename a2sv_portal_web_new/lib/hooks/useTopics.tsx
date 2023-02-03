import { useLazyQuery, useQuery } from "@apollo/client";
import {
  GET_ALL_TOPICS_QUERY,
  GET_SEASON_TOPICS,
  GET_GROUP_SEASON_TOPICS,
} from "../apollo/Queries/topicsQueries";


export const useGetAllTopics = () => {
  return useQuery(GET_ALL_TOPICS_QUERY, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
  });
};

export const useGetSeasonTopics = (seasonId: string) => {
  return useLazyQuery(GET_SEASON_TOPICS, {
    variables: {
      seasonId: seasonId,
    },
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
  });
};
export const useGetGroupSeasonTopics = (seasonId: string,groupId:string) => {
  return useLazyQuery(GET_GROUP_SEASON_TOPICS, {
    variables: {
      groupSeasonId: {
        groupId: groupId,
        seasonId: seasonId,
      },
    },
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
  });
};

// export const useGetAllTopicsBySeasonIdForSearchQuery = (seasonId: any) => {
//     return useQuery(GET_ALL_TOPICS_BY_SEASON_ID_FOR_SEARCH_QUERY, {
//         notifyOnNetworkStatusChange: true,
//         errorPolicy: 'all',
//         variables: {
//             seasonId
//         }
//     })
// }
