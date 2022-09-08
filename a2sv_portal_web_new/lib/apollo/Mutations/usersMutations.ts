import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation Mutation($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      createdAt
      email
      id
      role
      status
    }
  }
`;
export const ADD_STUDENTS_TO_GROUP = gql`
  mutation Mutation($updateGroupInput: UpdateGroupInput!) {
    updateGroup(updateGroupInput: $updateGroupInput) {
      users {
        email
      }
    }
  }
`;

