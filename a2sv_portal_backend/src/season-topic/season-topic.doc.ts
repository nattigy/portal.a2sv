const descriptions = {
  createSeasonTopic: `Arguments
  - createSeasonTopicInput : An input type to create a SeasonTopic which includes the following fields
    * seasonId: An id for the season we're planning to add the topic to.
    * topicID: An id for the topic we're planning to add in the season.

  Example 
  mutation{
  createSeasonTopic(createSeasonTopicInput: {
  topicId: "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
  seasonId: "e75f0b45-e803-43ab-88c1-9725f2b52739",
    }) {
        topic {
        id
        name
        }
        topicId
        season {
        id
        name
        }
        seasonId
        problems{
        problemId
        }
        }
    }
    }

  Return Type
  {
  "data": {
    "createSeasonTopic": {
      "topic": {
        "id": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
        "name": "BFS"
      },
      "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
      "season": {
        "id": "e75f0b45-e803-43ab-88c1-9725f2b52739",
        "name": "Fall 2022"
      },
      "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
      "problems": []
    }
  }
}`,
  seasonTopics: `
  Arguments 
- seasonTopicFilter : An argument to filter a SeasonTopics which includes the following fields

    * seasonId: An id for the season we're planning to add the topic to.
    * topicID: An id for the topic we're planning to add in the season.
    * skip:
    * take:
    
    { "seasonTopicFilter": {   
          "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
          "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
          skip:null,
          take:null
          }
    }


    Example:
        query SeasonTopics($seasonTopicFilter: SeasonTopicFilter!) {
            seasonTopics(seasonTopicFilter: $seasonTopicFilter) {
                seasonId
                topicId
                topic {
                    id
                    name
                }
                season {
                    id
                    name
                }
            }
        }

        Return Type
        {
        "data": {
            "seasonTopics": [
            {
                "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
                "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
                "topic": {
                "id": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
                "name": "BFS"
                },
                "season": {
                "id": "e75f0b45-e803-43ab-88c1-9725f2b52739",
                "name": "Fall 2022"
                }
            }
            ]
        }
        }
  `,
  seasonTopic: `
Arguments \n
- seasonTopicId : An argument to filter a SeasonTopics which includes the following fields
    * seasonId: An id for the season we're planning to add the topic to.
    * topicID: An id for the topic we're planning to add in the season.\n\n
    {
        "seasonTopicId": {
            "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
            "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5"
        }
    }\n

    
    Example:\n
        query SeasonTopic($seasonTopicId: SeasonTopicId!) {
            seasonTopic(seasonTopicId: $seasonTopicId) {
                topic {
                    id
                    name
                    }
                    topicId
                    season {
                    id
                    name
                    }
                    seasonId
                    problems{
                    problemId
                    }
                    }
            }
            }

        Return Type
       {
            "data": {
                "seasonTopic": {
                "topic": {
                    "id": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
                    "name": "BFS"
                },
                "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
                "season": {
                    "id": "e75f0b45-e803-43ab-88c1-9725f2b52739",
                    "name": "Fall 2022"
                },
                "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
                "problems": []
                }
            }
        }`,
  updateSeasonTopic: `
  Arguments \n
- updateSeasonTopicInput : An argument to update an exisiting SeasonTopic which includes the following fields
    * seasonId: An id for the season we're planning to add the topic to.
    * topicID: An id for the topic we're planning to add in the season.
    * problems: An Array of objects with seasonId, topicId, problemId fields \n

   {\n
    "updateSeasonTopicInput": {
        "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
        "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
        "problems": [
        {
            "problemId": "70d1e897-5131-4e49-bc31-c96f03e9637c",
            "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
            "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5"
        }
        ]
    }
    }\n

    
    Example:\n
        mutation Mutation($updateSeasonTopicInput: UpdateSeasonTopicInput!) {
            updateSeasonTopic(updateSeasonTopicInput: $updateSeasonTopicInput) {
                    topic {
                    id
                    name
                    }
                    topicId
                    season {
                    id
                    name
                    }
                    seasonId
                    problems{
                    problemId
                    }
                    }
            }
            }
            }


        Return Type
        {
            "data": {
                "seasonTopic": {
                "topic": {
                    "id": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
                    "name": "BFS"
                },
                "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
                "season": {
                    "id": "e75f0b45-e803-43ab-88c1-9725f2b52739",
                    "name": "Fall 2022"
                },
                "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
                "problems": []
                }
            }
        }
`,
  removeSeasonTopic: `
  Arguments \n
- seasonTopicId : An argument to filter a SeasonTopics which you want to remove which includes the following fields
    * seasonId: An id for the season we're planning to add the topic to.
    * topicID: An id for the topic we're planning to add in the season.\n\n
    {
        "seasonTopicId": {
            "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
            "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5"
        }
    }\n

    
    Example:\n
        mutation Mutation($seasonTopicId: SeasonTopicId!) {
            removeSeasonTopic(seasonTopicId: $seasonTopicId) {
                seasonId
                topicId
            }
}

        Return Type
       {
            "data": {
                "seasonTopic": {
                    "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
                    "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
                }
            }
        }`,
}
export default descriptions
