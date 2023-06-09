import { useLazyQuery, useQuery } from "@apollo/client";
import {
  GET_ALL_CONTESTS,
  GET_ALL_GROUP_CONTESTS_QUERY,
  GET_CONTEST_DETAIL,
  GET_SINGLE_GROUP_CONTESTS_QUERY,
  GET_SINGLE_STUDENT_ALL_CONTESTS_QUERY,
  GET_SINGLE_STUDENT_CONTEST_DETAIL_QUERY,
} from "../apollo/Queries/contestQueries";

export const useGetContestDetails = (contestId:string) => {
  return useQuery(GET_CONTEST_DETAIL, {
    variables:{
      contestId:contestId
    },
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,

  });
};
export const useGetAllContests = () => {
  return useQuery(GET_ALL_CONTESTS, {
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });
};

export const useGetAllContestsForStudent = (userId: string) => {
  return useLazyQuery(GET_SINGLE_STUDENT_ALL_CONTESTS_QUERY, {
    variables: {
      userId: userId,
    },
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });
};

export const useGetContestDetailsForStudent = (
  userId: string,
  contestId: string
) => {
  return useLazyQuery(GET_SINGLE_STUDENT_CONTEST_DETAIL_QUERY, {
    variables: {
      userContestId: {
        contestId,
        userId,
      },
    },
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });
};

export const useGetAllGroupContests = (groupId: string) => {
  return useLazyQuery(GET_ALL_GROUP_CONTESTS_QUERY, {
    variables: {
      filterGroupContestInput: {
        groupId,
      },
    },
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });
};

export const useGetSingleGroupContests = (
  groupId: string,
  contestId: string
) => {
  return useLazyQuery(GET_SINGLE_GROUP_CONTESTS_QUERY, {
    variables: {
      groupContestId: {
        contestId,
        groupId,
      },
    },
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });
};
