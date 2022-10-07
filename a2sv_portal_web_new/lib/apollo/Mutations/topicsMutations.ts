import { gql } from "@apollo/client";

export const CREATE_TOPIC_MUTATION = gql`
  mutation Mutation($createTopicInput: CreateTopicInput!) {
    createTopic(createTopicInput: $createTopicInput) {
      id
      name
      description
      season {
        id
      }
    }
  }
`;

export const ADD_TOPIC_UNDER_GROUP_AND_SEASON_ID = gql`
  mutation AddTopicToGroup($addTopicToGroupInput: AddTopicToGroupInput!) {
    addTopicToGroup(addTopicToGroupInput: $addTopicToGroupInput)
  }
`;
