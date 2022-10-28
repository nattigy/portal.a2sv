import { gql } from "@apollo/client";

export const GET_SINGLE_PROBLEM_QUERY = gql`
  query Seasons($seasonId: Int!) {
    season(id: $seasonId) {
      createdAt
      endDate
      id
      name
      startDate
      topics {
        id
      }
      updatedAt
    }
  }
`;

export const GET_ALL_SEASONS_QUERY = gql`
  query Group($groupId: Int!) {
    group(id: $groupId) {
      seasons {
        id
        name
        seasonType
        startDate
        endDate
      }
    }
  }
`;
