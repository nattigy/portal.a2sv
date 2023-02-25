import { useQuery } from "@apollo/client";
import { GET_ALL_SEASON_TOPIC_RESOURCES_QUERY } from "../apollo/Queries/resourcesQueries";

export const useGetSeasonTopicResources = (
  seasonId: string,
  topicId: string
) => {
  return useQuery(GET_ALL_SEASON_TOPIC_RESOURCES_QUERY, {
    variables: {
      seasonTopicId: {
        topicId,
        seasonId,
      },
    },
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
  });
};
