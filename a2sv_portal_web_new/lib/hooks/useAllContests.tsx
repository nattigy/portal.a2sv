import { useLazyQuery, useQuery } from "@apollo/client";
import {
  GET_ALL_GROUP_CONTESTS_QUERY,
  GET_SINGLE_STUDENT_CONTESTS_QUERY,
} from "../apollo/Queries/contestQueries";

export const useGetAllContestsForStudent = (userId: string) => {
  return useLazyQuery(GET_SINGLE_STUDENT_CONTESTS_QUERY, {
    variables: {
      userId: userId,
    },
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });
};

export const useGetAllContestsForHoe = (groupId: string) => {
  return useLazyQuery(GET_ALL_GROUP_CONTESTS_QUERY, {
    variables: {
      groupId: groupId,
    },
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });
};
