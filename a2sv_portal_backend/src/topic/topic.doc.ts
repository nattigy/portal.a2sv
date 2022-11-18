const descriptions ={
createTopic:
`
    Arguments\n
      - name: Name of the topic\n
      - description : Short explanation about the topic\n
    Example\n
      mutation Mutation($createTopicInput: CreateTopicInput!) \n
        {\n
          createTopic(createTopicInput: $createTopicInput) 
            {
              id
              name
              description
            }
        }
      Input\n
        {\n
          "createTopicInput": 
            {
              "name": "Binary Search",
              "description": "BS is searching algorithm that takes O(logn) time complexity on a sorted input"
            }
        }
      Return\n
        {\n
          "data": 
            {
              "createTopic": 
                {
                  "id": "8edef3ab-264d-4973-9963-938771b67bd3",
                  "name": "Binary Search",
                  "description": "BS is searching algorithm that takes O(logn) time complexity on a sorted input"
                }
            }
        }
  
`,
topics:
`
    Returns all  the topics 
    Example\n
    query Topics {\n
      topics {\n
        items {\n
          name
          id
          description
        }
      }
    }
    Return \n
      {\n
        "data": 
          {
            "topics": 
              [
                {
                  "id": "8edef3ab-264d-4973-9963-938771b67bd3",
                  "name": "Binary Search",
                  "description": "BS is searching algorithm that takes O(logn) time complexity on a sorted input"
                }
              ]
          }
      }
  
`,
topic:
`
    Returns one topic filterd by id\n
    Argument\n
        - Id: Id of the topic we want to get\n
    Example\n
    query Topic($topicId: String!)\n
      {\n
        topic(id: $topicId) 
          {
            id
            name
            description
          
          }
      }\n
    Input\n
      {\n
        "topicId": "8edef3ab-264d-4973-9963-938771b67bd3"
      }\n
    Return\n
      {\n
        "data": 
          {
            "topic": 
            {
              "id": "8edef3ab-264d-4973-9963-938771b67bd3",
              "name": "Binary Search",
              "description": "BS is searching algorithm that takes O(logn) time complexity on a sorted input"
            }
          }
      } 
  `,
  updateTopic:
  `
    Updates the topic\n 
    Arguments\n
        - Id: Id of the topic we want to edit\n
        - Topic Object: The topic object that has id and a field we want to update\n
    Example \n
    mutation UpdateTopic($updateTopicId: String!, $updateTopicInput: UpdateTopicInput!) \n
      {\n
        updateTopic(id: $updateTopicId, updateTopicInput: $updateTopicInput)
          {
            id
            name
          }
      }\n
    Input\n
      { \n
        "updateTopicId": "8edef3ab-264d-4973-9963-938771b67bd3",  
        "updateTopicInput": 
          {\n
            "id": "8edef3ab-264d-4973-9963-938771b67bd3",
            "name": "Binary Search Edited"
          }
      }\n
    Return\n
    {\n
      "data": 
        {\n
          "updateTopic":
            {
              "id": "8edef3ab-264d-4973-9963-938771b67bd3",
              "name": "Binary Search Edited"
            }
        }
    }

  `,
  deleteTopic:
  `
    Delete a Topic\n
    Argument\n
      - id: id of a topic that we want to delete\n
    Example\n
      mutation DeleteTopic($deleteTopicId: String!) \n
        {\n
          deleteTopic(id: $deleteTopicId)
            {
              name
              id
            }
        }
      Input\n
        {\n
          "deleteTopicId": "8edef3ab-264d-4973-9963-938771b67bd3"
        }
    
  `,
  addTopicToGroup:
  `
    Adds Topic to a group\n
    Argument
      -seasonId: id of a season the topic is going to be added\n
      -topicId: id of the topic we want to add to a group\n
    Example\n
      mutation Mutation($addTopicToGroupInput: AddTopicToSeasonInput!)\n
        {
          addTopicToGroup(addTopicToGroupInput: $addTopicToGroupInput)
        }
      Input\n
        {
          "addTopicToGroupInput": 
            {
              "topicId": "1655be56-f4c1-4dd4-bb0c-b3db745e074c",
              "seasonId":"670f86c0-8e45-4caa-96b1-4f6e695f1a78"
            }
        }
      Return\n
        {
          "data":
            {
              "addTopicToGroup": "SUCCESS"
            }
        }
  `
    }
export default descriptions