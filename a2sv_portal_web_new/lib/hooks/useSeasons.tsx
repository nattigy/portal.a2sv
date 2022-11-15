import { useQuery } from "@apollo/client";
import { GET_ALL_SEASONS_QUERY } from "../apollo/Queries/seasonsQueries";

export const useGetGroupSeasons = (groupId: string) => {
  return useQuery(GET_ALL_SEASONS_QUERY, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    variables: {
      filterUserInput: {
        groupId
      }    
    },
  });
};
