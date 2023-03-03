import { useLazyQuery, useQuery } from "@apollo/client";
import { BsFileBreakFill } from "react-icons/bs";
import { GraphqlUserRole } from "../../types/user";
import {
  GET_ALL_USER_QUERY,
  GET_FILTERED_USERS,
  GET_OTP_STATUS_QUERY,
  GET_SINGLE_GROUP_USERS_QUERY,
  GET_SINGLE_USER_QUERY,
  GET_STUDENTS_WITH_NO_GROUP_QUERY,
  GET_USERS_BY_GROUP_ID_QUERY,
  GET_USER_PROFILE,
} from "../apollo/Queries/usersQueries";

export const useFilteredUsers = (tabIndex: number) => {
  let role;
  switch (tabIndex) {
    case 1:
      role = GraphqlUserRole.HEAD_OF_ACADEMY;
      break;
    case 2:
      role = GraphqlUserRole.HEAD_OF_EDUCATION;
      break;
    case 3:
      role = GraphqlUserRole.STUDENT;
      break;
    default:
      break;
  }

    return useLazyQuery(GET_FILTERED_USERS, {
      variables: {
        filterUserInput: {
          role,
        },
      },
      errorPolicy: "all",
      notifyOnNetworkStatusChange: true,
    });

};

export const useUsersByGroupId = (groupId: string) => {
  return useLazyQuery(GET_USERS_BY_GROUP_ID_QUERY, {
    variables: {
      groupId,
    },
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });
};

export const useUsersOfSingleGroup = (groupId: string) => {
  return useQuery(GET_SINGLE_GROUP_USERS_QUERY, {
    variables: {
      groupId,
    },
  });
};

export const useGetUsersWithNoGroup = () => {
  return useQuery(GET_STUDENTS_WITH_NO_GROUP_QUERY, {
    variables: {
      filterUserInput: {
        role: GraphqlUserRole.STUDENT,
        groupId: null,
      },
    },
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });
};

export const useGetSingleUser = (userId: string) => {
  return useLazyQuery(GET_SINGLE_USER_QUERY, {
    variables: {
      userId: userId,
    },
    errorPolicy: "none",
    notifyOnNetworkStatusChange: true,
  });
};
export const useGetUserProfile = (userId: string) => {
  return useQuery(GET_USER_PROFILE, {
    variables: {
      uniqueUserInput: { id: userId },
    },
    errorPolicy: "none",
    notifyOnNetworkStatusChange: true,
  });
};

export const useCheckOTPStatus = (email: string) => {
  return useQuery(GET_OTP_STATUS_QUERY, {
    variables: {
      email,
    },
    errorPolicy: "none",
    notifyOnNetworkStatusChange: true,
  });
};
