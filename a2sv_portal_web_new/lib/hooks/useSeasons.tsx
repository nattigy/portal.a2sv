import { useQuery } from "@apollo/client";
import { JoinRequest } from "../../types/season";
import {
  GET_ALL_SEASONS_QUERY,
  GET_SEASON_REQUESTS,
} from "../apollo/Queries/seasonsQueries";

export const useGetGroupSeasons = (groupId: string) => {
  return useQuery(GET_ALL_SEASONS_QUERY, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    variables: {
      filterSeasonInput: {
        groupId: groupId,
      },
    },
  });
};

export const useGetAllSeasons = ({ isActive }: { isActive?: boolean }) => {
  const filterSeasonInput: any = {};
  if (typeof isActive !== undefined) {
    filterSeasonInput.isActive = isActive;
  }
  console.log(filterSeasonInput, "season", isActive)
  return useQuery(GET_ALL_SEASONS_QUERY, {
    variables: {
      filterSeasonInput,
    },
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
  });
};

export const useGetSeasonRequests = () => {
  return useQuery(GET_SEASON_REQUESTS, {
    variables: {
      filterGroupSeasonInput: {
        joinRequest: "REQUESTED",
      },
    },
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
  });
};
