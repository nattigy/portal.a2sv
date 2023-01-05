import { gql } from "@apollo/client";

export const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
      userId
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($password: String!, $resetToken: String!) {
    resetPassword(password: $password, resetToken: $resetToken)
  }
`;

export const VERIFY_PASSWORD_MUTATION = gql`
  mutation ValidateOtp($email: String!, $otpCode: Float!) {
    validateOtp(email: $email, otpCode: $otpCode) {
      accessToken
      userId
    }
  }
`;

export const RESEND_OTP_MUTATION = gql`
  mutation ResendOtp($email: String!) {
    resendOtp(email: $email)
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Mutation {
    logout {
      userId
    }
  }
`;
