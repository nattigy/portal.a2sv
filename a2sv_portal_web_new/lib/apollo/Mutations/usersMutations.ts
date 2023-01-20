import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($email: String!) {
    createUser(email: $email)
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


export const CHANGE_USER_ROLE = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
    }
  }
`;

export const REMOVE_USER = gql`
  mutation RemoveUser($userId: String!) {
    removeUser(userId: $userId)
  }
`;
