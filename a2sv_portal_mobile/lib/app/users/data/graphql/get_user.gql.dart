String GET_USER = r"""
query GetMe {
  getMe {
    email
    group {
      id
    }
    role
    status
    updatedAt
  }
}
""";
