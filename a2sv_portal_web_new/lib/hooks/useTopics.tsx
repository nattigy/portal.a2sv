import { useLazyQuery, useQuery } from "@apollo/client";
import {
  GET_ALL_GROUP_TOPICS_BY_SEASON_ID_QUERY,
  GET_ALL_TOPICS_BY_SEASON_ID_QUERY,
  GET_ALL_TOPICS_QUERY,
  GET_ALL_TOPICS_BY_GROUP_AND_SEASON_ID_QUERY,
} from "../apollo/Queries/topicsQueries";

export const useGetAllTopicsBySeasonIdQuery = (seasonId: any) => {
  return useLazyQuery(GET_ALL_TOPICS_BY_SEASON_ID_QUERY, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    variables: {
      seasonId,
    },
  });
};
export const useGetAllGroupTopicsBySeasonIdQuery = (
  seasonId: string,
  groupId: string
) => {
  return useLazyQuery(GET_ALL_GROUP_TOPICS_BY_SEASON_ID_QUERY, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    variables: {
      seasonId: seasonId,
      groupId: groupId,
    },
  });
};

export const useGetAllTopicsByGroupAndSeasonIdQuery = (
  seasonId: string,
  groupId: string
) => {
  return useLazyQuery(GET_ALL_TOPICS_BY_GROUP_AND_SEASON_ID_QUERY, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    variables: {
        groupId: groupId,
        seasonId: seasonId,
    },
  });
};

export const useGetAllTopics = () => {
  return useQuery(GET_ALL_TOPICS_QUERY, {
            notifyOnNetworkStatusChange: true,
            errorPolicy: 'all',
        })
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

