const descriptions = {
  createGroup: `
    Create a group \n
    Arguement\n
        - name: Name of the Group
        - school: School the Group is being created at
        - Country: Country the Group is being created at
        - headId: User Id of a user that is assinged a head to the group
    Example\n
    mutation Mutation($createGroupInput: CreateGroupInput!){ \n
        createGroup(createGroupInput: $createGroupInput){
            id
            name
            school
            country
            head{
                email
            }
        }
    }\n
    Input\n
    {\n
        "createGroupInput":{
                "name": "Group-12",
                "school": "AAIT",
                "country": "Ethiopia",
                "headId": "8a17f9cb-b175-44f5-94d3-17ac9ee4f3f1"
            }
    }\n
    Return\n
    {\n
        "data":{        
            "createGroup":{
                "id": "340b9d12-b757-47c4-a475-4a3db103de82",
                "name": "Group-12",
                "school": "AAIT",
                "country": "Ethiopia",
                "head":{
                    "email": "sync@a2sv.org"
                }
            }
        }
    }

    `,
  groups: `
    Get the groups filtered by the following \n
      - country: groups that are in the specified country\n
      - headId: groups that have the sepecified user as a head\n
      - school: groups that are in the specified school\n
      - seasonId: groups that have the given season\n
      - topicId: groups that have the speciefed topic\n     
    Example\n
    query Groups {
      groups {
        items {
          name
          id
          school
        }
      }
    }
    Return\n
    {
      "data": {
        "groups": {
          "items": [
            {
              "name": "Group-33",
              "id": "1d7263ef-d445-4270-ba55-99ac77f409ae",
              "school": "AASTU"
            },
            {
              "name": "Group-44",
              "id": "392cac2f-dea8-4646-8310-866f039dcb3e",
              "school": "Legos University"
            },
            {
              "name": "Group-31",
              "id": "9f4cd751-40c9-4658-a271-dc9e5f802978",
              "school": "AAiT"
            },
            {
              "name": "Group-12",
              "id": "d67561e0-e6f9-4290-868f-62ed8897ed27",
              "school": "AAiT"
            },
            {
              "name": "Group-32",
              "id": "dea7dc24-33ce-44c5-b94b-a281edf10d25",
              "school": "AAiT"
            }
          ]
        }
      }
    }
      

    `,
  group: `
    Get a group filtered by id\n
    Argument\n
        - id: group id \n
    Example\n
    query Group($groupId: String!) {\n
        group(id: $groupId) {
          country
          id
          name
          school
          head {
            email
            userProfile {
              firstName
              lastName
            }
          }
        }
      }\n
    Input\n
    {\n
        "groupId": "340b9d12-b757-47c4-a475-4a3db103de82"
    }\n
    Return\n
    {\n
        "data": {
        "group": {
            "country": "Ethiopia",
            "id": "340b9d12-b757-47c4-a475-4a3db103de82",
            "name": "Group-12",
            "school": "AAIT",
            "head": {
            "email": "sync@a2sv.org",
            "userProfile": null
            }
        }
        }
    }
    
    `,
  updateGroup: `
    Update group entities \n
    Argument\n
        - id: id of the group to be updated
        - entitiy to be updated e.g name, season, user
    Example\n
    mutation Mutation($updateGroupInput: UpdateGroupInput!) {\n
        updateGroup(updateGroupInput: $updateGroupInput) {
          users {
            email
            role
          }
          seasons {
            name
            seasonType
          }
        }
      }\n
    Input\n
    {\n
        "updateGroupInput": {
          "id": "340b9d12-b757-47c4-a475-4a3db103de82",
         
          "users": [
            {
              "id": "4664818b-7af9-41d5-acd3-e04702ef3210"
            }
          ]
        }
      }\n
    Return\n
    {\n
        "data": {
          "updateGroup": {
            "users": [
              {
                "email": "biruk@a2sv.org",
                "role": "STUDENT"
              }
            ],
            "seasons": [
              {
                "name": "Autumn-2023",
                "seasonType": "PROJECT"
              }
            ]
          }
        }
      }
    
    `,
  deleteGroup: `
    Deletes the group filtered by id\n
    Argument\n
      - id: id of the group to be deleted\n
    Example\n
    mutation DeleteGroup($deleteGroupId: String!) {\n
        deleteGroup(id: $deleteGroupId) {
          id
          name
        }
      }\n
    Input\n
    {\n
        "deleteGroupId": "340b9d12-b757-47c4-a475-4a3db103de82"
    } 
    
    `,
}
export default descriptions
