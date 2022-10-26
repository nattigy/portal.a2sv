import { gql } from "@apollo/client";

export const CREATE_TOPIC_MUTATION = gql`
  mutation Mutation($createTopicInput: CreateTopicInput!) {
    createTopic(createTopicInput: $createTopicInput) {
      id
      name
    }
  }
`;

export const ADD_TOPIC_UNDER_GROUP_AND_SEASON_ID = gql`
  mutation AddTopicToGroup($addTopicToGroupInput: AddTopicToGroupInput!) {
    addTopicToGroup(addTopicToGroupInput: $addTopicToGroupInput)
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
