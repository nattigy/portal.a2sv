import { gql } from "@apollo/client";

export const GET_SINGLE_GROUP_QUERY = gql`
  query Query($groupId: Int!) {
    group(id: $groupId) {
      country
      createdAt
      id
      name
      school
    }
  }
`;

export const GET_ALL_GROUPS_QUERY = gql`
  query GET_ALL_GROUPS_QUERY {
    groups {
      country
      createdAt
      id
      name
      school
    }
  }
`;
