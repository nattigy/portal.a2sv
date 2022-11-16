const descriptions ={
createSeason:
`
- Create a season\n
Argument\n
  - name: name of the season\n
  - groupid: id of the group that season belongs to\n
  - seasonType: type of the season\n
Example\n
mutation Mutation($createSeasonInput: CreateSeasonInput!) \n
  {\n
    createSeason(createSeasonInput: $createSeasonInput)
      {
        id
        name
        isActive
      }
  }\n
Input\n
  {\n
    "createSeasonInput": 
      {
        "name": "Fall-2022",
        "groupId": "a3efe4ee-1277-4ca4-95bf-65c5722b5044",
        "seasonType": "CAMP"
      }
  }\n
Return \n
  {\n
    "data":
      {
        "createSeason": 
          {
            "id": "670f86c0-8e45-4caa-96b1-4f6e695f1a78",
            "name": "Fall-2022",
            "isActive": false
          }
      }
  }
`,
seasons:
`
- Returns all the seasons\n
Example\n
query Seasons {
    seasons {
      items {
        isActive
        name
        seasonType
        id
      }
    }
  }
Return\n
{
    "data": {
      "seasons": {
        "items": [
          {
            "isActive": false,
            "name": "FALL-2022",
            "seasonType": "CAMP",
            "id": "6d5f3ce7-f26f-41ed-9b4a-aae14595c02d"
          }
        ]
      }
    }
  }
`,
season:
`
- Return season filtered by id\n
    Argument\n
    - Id: id of a season we wanted to get
    Example\n
      query Season($seasonId: String!)\n
        {\n
            season(id: $seasonId)\n
              {\n
                isActive
                id
                name
                seasonType
              }
        }
    Input\n
      {\n
        "seasonId": "670f86c0-8e45-4caa-96b1-4f6e695f1a78"
      }
    Return\n
      {\n
        "data": 
          {
            "season":
              {
                "isActive": false,
                "id": "670f86c0-8e45-4caa-96b1-4f6e695f1a78",
                "name": "Fall-2022",
                "seasonType": "CAMP"
              }
          }
      }

`,
updateSeason:
`
- Updates the season of given Id\n
Argument\n
  - Id: id of the season we want update\n
Example\n
mutation Mutation($updateSeasonId: String!, $updateSeasonInput: UpdateSeasonInput!)\n
  {\n
    updateSeason(id: $updateSeasonId, updateSeasonInput: $updateSeasonInput)
      {
        id
        name
      }
  }
Input\n
{\n
  "updateSeasonId": "670f86c0-8e45-4caa-96b1-4f6e695f1a78",
  "updateSeasonInput": 
    {
      "id": "670f86c0-8e45-4caa-96b1-4f6e695f1a78",
      "name": "Summer-2022"
    }
}
Return\n
  {\n
    "data":
    {
      "updateSeason":
      {
        "id": "670f86c0-8e45-4caa-96b1-4f6e695f1a78",
        "name": "Summer-2022"
      }
    }
  }

`,
deleteSeason:
`
- Delete a season \n
Argument\n
- Id - id of the season \n
Example\n
mutation DeleteSeason($deleteSeasonId: String!)\n 
  {\n
    deleteSeason(id: $deleteSeasonId)
      {
        id
      }
  }
Input\n
  {\n
    "deleteSeasonId":"670f86c0-8e45-4caa-96b1-4f6e695f1a78"
  }
`
}

export default descriptions