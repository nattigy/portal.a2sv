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

export const CREATE_USER_PROFILE = gql`
  mutation CreateUserProfile($createUserProfileInput: CreateUserProfileInput!) {
    createUserProfile(createUserProfileInput: $createUserProfileInput) {
      id
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($updateUserProfileInput: UpdateUserProfileInput!) {
    updateUserProfile(updateUserProfileInput: $updateUserProfileInput) {
      id
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
