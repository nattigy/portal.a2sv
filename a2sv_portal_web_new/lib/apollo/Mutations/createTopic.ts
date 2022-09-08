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
