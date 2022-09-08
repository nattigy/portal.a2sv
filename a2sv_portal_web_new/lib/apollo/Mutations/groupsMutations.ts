import { gql } from "@apollo/client";

export const CREATE_GROUP_MUTATION = gql`
  mutation Mutation($createGroupInput: CreateGroupInput!) {
    createGroup(createGroupInput: $createGroupInput) {
      country
      createdAt
      id
      name
      school
    }
  }
`;
export const ASSIGN_HOE_TO_GROUP = gql`
  mutation Mutation($updateGroupInput: UpdateGroupInput!) {
    updateGroup(updateGroupInput: $updateGroupInput) {
      id
      name
    }
  }
`;

export const ADD_TOPIC_TO_GROUP = gql`
  mutation Mutation($updateGroupInput: UpdateGroupInput!) {
    updateGroup(updateGroupInput: $updateGroupInput) {
      topics {
        topic {
          id
        }
      }
    }
  }
`;
