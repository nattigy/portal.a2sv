import { gql } from "@apollo/client";

export const CREATE_TOPIC_MUTATION = gql`
  mutation Mutation($createTopicInput: CreateTopicInput!) {
    createTopic(createTopicInput: $createTopicInput) {
      id
      name
    }
  }
`;

export const ADD_SEASON_TOPIC = gql`
  mutation UpdateSeasonTopic($updateSeasonTopicInput: UpdateSeasonTopicInput!) {
    updateSeasonTopic(updateSeasonTopicInput: $updateSeasonTopicInput) {
      seasonId
      topic {
        name
      }
    }
  }
`;

export const DELETE_TOPIC = gql`
  mutation DeleteTopic($deleteTopicId: Int!) {
    deleteTopic(id: $deleteTopicId) {
      id
      name
    }
  }
`;
