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
  mutation AddTopicsToASeason(
    $createSeasonTopicInput: CreateSeasonTopicInput!
  ) {
    addTopicsToASeason(createSeasonTopicInput: $createSeasonTopicInput) {
      seasonId
      topicId
    }
  }
`;
export const ADD_GROUP_SEASON_TOPIC = gql`
  mutation AddTopicsToGroupSeason(
    $groupSeasonId: GroupSeasonId!
    $topicIds: [String!]!
  ) {
    addTopicsToGroupSeason(groupSeasonId: $groupSeasonId, topicIds: $topicIds)
  }
`;

export const REMOVE_TOPIC = gql`
  mutation RemoveTopic($topicId: String!) {
    removeTopic(topicId: $topicId)
  }
`;
export const EDIT_TOPIC = gql`
  mutation UpdateTopic($updateTopicInput: UpdateTopicInput!) {
    updateTopic(updateTopicInput: $updateTopicInput) {
      id
    }
  }
`;

export const REMOVE_SEASON_TOPIC = gql`
  mutation RemoveSeasonTopic($seasonId: String!, $topicId: String!) {
    removeSeasonTopic(seasonId: $seasonId, topicId: $topicId) {
      seasonId
    }
  }
`;
