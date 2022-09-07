import { gql } from "@apollo/client";

export const GET_SINGLE_USER_QUERY = gql`
  query UserById($userId: Int!) {
    user(id: $userId) {
      email
      id
      role {
        id
        name
        description
      }
      roleId
      status
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
    }
  }
`;

export const GET_USERS_BY_GROUP_ID_QUERY = gql`
  query Users($groupId: Float) {
    users(groupId: $groupId) {
      email
      id
      createdAt
      group {
        country
        school
      }
    }
  }
`;

export const GET_STUDENTS_WITH_NO_GROUP_QUERY = gql`
  query Users($role: String, $groupId: Float) {
    users(role: $role, groupId: $groupId) {
      email
      id
      status
      createdAt
      updatedAt
    }
  }
`;
