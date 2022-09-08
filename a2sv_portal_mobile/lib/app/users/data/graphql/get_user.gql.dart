String GET_USER = r"""
query GetMe {
  getMe {
    email
    userProfile {
      id
      firstName
      lastName
    }
  }
}
""";
