import { gql } from "@apollo/client";

export const GET_ALL_TOPICS_QUERY = gql`
  query Items {
    topics {
      items {
        id
        name
        description
        createdAt
      }
    }
  }
`;

export const GET_ALL_TOPICS_BY_GROUP_AND_SEASON_ID_QUERY = gql`
  query Query($groupId: Int, $seasonId: Int) {
    topics(groupId: $groupId, seasonId: $seasonId) {
      description
      id
      name
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

export const GET_SEASON_TOPICS = gql`
query SeasonsTopics($seasonId: String!, $paginationInput: PaginationInput) {
  seasonsTopics(seasonId: $seasonId, paginationInput: $paginationInput) {
      items {
        topicId
        topic {
          id
          name
          description
          createdAt
        }
        season {
          id
          name
        }
      }
    }
  }
`;
