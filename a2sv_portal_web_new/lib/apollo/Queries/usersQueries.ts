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
