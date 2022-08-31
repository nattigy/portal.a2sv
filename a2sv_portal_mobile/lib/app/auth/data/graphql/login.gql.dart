String LOGIN = r"""
  mutation Login($loginInput: LoginInput!) {
    login (loginInput: $loginInput){
      access_token
      user{
        id
        firstName
        middleName
        lastName
        phoneNumber
      }
    }
  }
""";