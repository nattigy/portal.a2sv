import { gql } from "@apollo/client";

export const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
      userId
    }
  }
`;
