const descriptions = {
updateComfortLevel: 
`
    Arguments\n
        - topicId : An id of the topic which the user is updating their comfort level on.\n
        - userId :  An id of the user updating their comfort level.\n
        - comfortLevel : The user's comfort level on the current topic.\n
    Example \n
    mutation Mutation($comfortLevel: ComfortLevel!, $topicId: String!, $userId: String!) \n
        {\n
        updateComfortLevel(comfortLevel: $comfortLevel, topicId: $topicId, userId: $userId)
            {
            topics 
                {
                topic 
                    {
                    id
                    name
                    }
                comfortLevel
                }
            }
        }
    Input \n
        {  
            "comfortLevel":  UNCOMFORTABLE,
            "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
            "userId": userId: "a9531ef8-0f0d-4d37-b16d-ba0ce049df13"
        }
    Return \n
        {\n
        "data": 
            {
            "updateComfortLevel":
                {
                "topics":
                    [
                    {
                        "topic":
                        {
                            "id": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
                            "name": "BFS"
                        },
                        "comfortLevel": "UNCOMFORTABLE"
                    }
                    ]
                }
            }
        }
`,
createUser:
`
    Creates a user\n
    Arguments\n
        - email: email of the user we want to register to the system\n
        - password: passowrd for the account\n
    mutation CreateUser($createUserInput: CreateUserInput!) \n
      {\n
        createUser(createUserInput: $createUserInput) 
          {
            email
            id
          }
      }\n
    Input\n
      {\n
        "createUserInput":
          {
            "email":"sync@a2sv.org",
            "password": "123456789"
          }
      }
    Return\n
      {\n
        "data": 
          {
            "createUser": 
              {
                "email": "sync@a2sv.org",
                "id": "8a17f9cb-b175-44f5-94d3-17ac9ee4f3f1"
              }
          }
      }
`,
findOne:
`
    Returns a user data  filtred by id\n
    Argument\n
        - id: id of the user \n
    Example\n
    query UserProfile($userId: String!) \n
    {\n
        user(id: $userId)
        {
            email
            id
            userProfile 
            {
                firstName
                lastName
            }
        }
    }
    Input\n
    {
        "userId": "8a17f9cb-b175-44f5-94d3-17ac9ee4f3f1"
    }
    Return\n
    {\n
        "data": 
        {
            "user": 
            {
                "email": "sync@a2sv.org",
                "id": "8a17f9cb-b175-44f5-94d3-17ac9ee4f3f1",
                "userProfile":
                {
                    "firstName": "Sinkumen",
                    "lastName": "Assefa"
                }
            }
        }
    }
`,
updateUser:
`
    updates the user data\n
    Argument\n
        - a data the user wants to update\n
    Example\n
    mutation UpdateUser($updateUserInput: UpdateUserInput!) \n
      {\n
        updateUser(updateUserInput: $updateUserInput) 
          {
            id
            email
          }
      }
    Input\n
    {\n
      "updateUserInput": 
        {
          "userProfile": 
            {
              "firstName": "Sinkumen",
              "lastName": "Assefa"
            },
            "id": "8a17f9cb-b175-44f5-94d3-17ac9ee4f3f1"
        }
    }
    
`,
deleteUser:
`
  Deletes a user\n
  Argument\n
    - id: id of the user \n
  Example\n
  mutation Mutation($removeUserId: String!)\n 
    {\n
      removeUser(id: $removeUserId) 
        {
          id
        }
    }
  Input\n
    {\n
      "removeUserId": "8a17f9cb-b175-44f5-94d3-17ac9ee4f3f1"
    }
  `
}
export default descriptions
