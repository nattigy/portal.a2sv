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

export const GET_GROUP_SEASON_TOPICS = gql`
  query GroupSeasonTopics($groupSeasonId: GroupSeasonId!) {
    groupSeasonTopics(groupSeasonId: $groupSeasonId) {
      topic {
        createdAt
        description
        id
        name
        updatedAt
      }
    }
  }
`;
