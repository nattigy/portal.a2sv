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
