import { gql } from "@apollo/client";

export const GET_ME_QUERY = gql`
  query GetProfile {
    getMe {
      group {
        createdAt
        id
        name
      }
      email
      groupId
      id
      role
      status
      headToGroup {
        id
        name
      }
    }
  }
`;
