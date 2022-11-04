import { gql } from "@apollo/client";

export const GET_SINGLE_USER_QUERY = gql`
  query Query($userId: String!) {
    user(id: $userId) {
      email
      groupId
      id
      role
      status
      userProfile {
        firstName
        lastName
      }
    }
  }
`;

export const GET_ALL_USER_QUERY = gql`
  query Users {
    users {
      createdAt
      email
      headToGroup {
        id
      }
      id
      status
      updatedAt
      role
      group {
        id
      }
      userProfile {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GET_FILTERED_USERS = gql`
  query Users($role: String) {
    users(role: $role) {
      email
      id
      role
      status
      userProfile {
        firstName
        lastName
      }
    }
  }
`;

export const GET_USERS_BY_GROUP_ID_QUERY = gql`
  query Users($groupId: String) {
    users(groupId: $groupId) {
      email
      id
      createdAt
      group {
        country
        school
      }
      userProfile {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GET_STUDENTS_WITH_NO_GROUP_QUERY = gql`
  query UsersQuery($role: String, $groupId: String) {
    users(role: $role, groupId: $groupId) {
      id
      email
      role
      userProfile {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GET_SINGLE_GROUP_USERS_QUERY = gql`
  query Users($groupId: String!) {
    group(id: $groupId) {
      users {
        email
        createdAt
        status
        userProfile {
          firstName
          lastName
        }
      }
    }
  }
`;
