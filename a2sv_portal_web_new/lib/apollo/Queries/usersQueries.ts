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

export const GET_ALL_PROBLEM_QUERY = gql`
  query Problems {
    problems {
      createdAt
      difficulty
      id
      link
      platform
      tags {
        name
        id
      }
      title
      updatedAt
    }
  }
`;
