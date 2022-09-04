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
