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
export const ASSIGN_USER_TO_GROUP = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      email
      id
      status
      role
      group {
        name
      }
    }
  }
`;

export const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      email
      id
      status
      role
      groupId
    }
  }
`;

export const PROMOTE_USER_TO_HOE_MUTATION = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      email
      id
      status
      role
      groupId
    }
  }
`;
