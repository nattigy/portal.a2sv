import { gql } from "@apollo/client";

export const GET_ALL_TOPIC_QUERY = gql`
  query Query {
    topics {
      id
      name
      description
      createdAt
      season {
        name
      }
    }
  }
`;

export const GET_ALL_TOPICS_BY_GROUP_ID_AND_SEASON_QUERY = gql`
  query Query($groupId: Int, $seasonId: Int) {
    topics(groupId: $groupId, seasonId: $seasonId) {
      description
      id
      name
      season {
        id
      }
      createdAt
      groups {
        groupId
        group {
          id
        }
      }
    }
  }
`;

export const GET_ALL_TOPICS_BY_GROUP_ID_QUERY = gql`
  query Query($groupId: Int) {
    topics(groupId: $groupId) {
      description
      id
      name
      season {
        id
      }
      createdAt
      groups {
        groupId
        group {
          id
        }
      }
    }
  }
`;

export const GET_ALL_TOPICS_BY_SEASON_ID_QUERY = gql`
  query Query($seasonId: Int) {
    topics(seasonId: $seasonId) {
      id
      name
      description
      createdAt
      season {
        name
      }
    }
  }
`;
