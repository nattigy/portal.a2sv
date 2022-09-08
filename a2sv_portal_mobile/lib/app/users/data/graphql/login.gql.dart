String LOGIN = r"""
mutation Mutation($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    accessToken
    userId
  }
}
""";
