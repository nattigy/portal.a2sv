const descriptions = {
  createSeasonTopicProblem: `Arguments\n
  - createSeasonTopicProblemInput : An input type to create a SeasonTopicProblem which includes the following fields\n
    * seasonId: An id for a season.
    * topicID: An id for a topic.
    * problemId: An id for a problem
\n
    {
    "createSeasonTopicProblemInput": {
        "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
        "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
        "problemId": "70d1e897-5131-4e49-bc31-c96f03e9637c"
    }
    }
\n
  Example 
    mutation Mutation($createSeasonTopicProblemInput: CreateSeasonTopicProblemInput!) {
        createSeasonTopicProblem(createSeasonTopicProblemInput: $createSeasonTopicProblemInput) {
            problemId
            seasonId
            seasonTopic {
                seasonId
                topicId
            }
            topicId
            users {
                userId
                attempts
            }
        }
    }


  Return Type
   {
    "data": {
        "problemId": "70d1e897-5131-4e49-bc31-c96f03e9637c"
        "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
        "seasonTopic": {
            "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
            "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
        },
        "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
        "users":[]
        }
  }`,
  seasonTopicProblems: `Arguments\n
- seasonTopicProblemFilter : An argument to filter a SeasonTopicProblems which includes the following fields\n
    * seasonId: An id for a season.
    * topicID: An id for a topic.
    * problemId: An id for a problem
    * skip:
    * take:
\n    
    { 
        "seasonTopicProblemFilter": {   
          "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
          "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
          "problemId": "70d1e897-5131-4e49-bc31-c96f03e9637c"
          skip: null,
          take: null
          }
    }

\n
    Example:
        query SeasonTopicsProblems($seasonTopicProblemFilter: SeasonTopicProblemFilter!) {
            seasonTopicProblems(seasonTopicProblemFilter: $seasonTopicProblemFilter) {
                problemId
                seasonId
                seasonTopic {
                    seasonId
                    topicId
                }
                topicId
                users {
                    userId
                    attempts
                }
            }
        }

        Return Type
         {
            "data": {
                "problemId": "70d1e897-5131-4e49-bc31-c96f03e9637c"
                "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
                "seasonTopic": {
                    "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
                    "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
                },
                "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
                "users":[]
            }
        }
  `,
  seasonTopicProblem: `Arguments \n
- seasonTopicProblemId : An argument to filter a SeasonTopicProblems which includes the following fields
    * seasonId: An id for a season.
    * topicID: An id for a topic.
    * problemId: An id for a problem\n\n
    {
        "seasonTopicProblemId": {
            "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
            "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
            "problemId": "70d1e897-5131-4e49-bc31-c96f03e9637c"
        }
    }\n

    
    Example:\n
    query SeasonTopicProblem($seasonTopicProblemId: SeasonTopicProblemId!) {
        seasonTopicProblem(seasonTopicProblemId: $seasonTopicProblemId) {
            problemId
            seasonId
            seasonTopic {
                seasonId
                topicId
            }
            topicId
            users {
                userId
                attempts
            }
        }
    }

        Return Type
        {
            "data": {
                "problemId": "70d1e897-5131-4e49-bc31-c96f03e9637c"
                "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
                "seasonTopic": {
                    "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
                    "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
                },
                "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
                "users":[]
            }
        }`,
  updateSeasonTopicProblem: `Arguments \n
- updateSeasonTopicProblemInput : An argument to update an exisiting SeasonTopicProblem which includes the following fields
    * seasonId: An id for a season.
    * topicID: An id for a topic.
    * problemId: An id for a problem \n

   {\n
    "updateSeasonTopicProblemInput": {
        "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
        "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
        "problemId": "70d1e897-5131-4e49-bc31-c96f03e9637c"
    }
    }\n

    
    Example:\n
        mutation UpdateSeasonTopicProblem($updateSeasonTopicProblemInput: UpdateSeasonTopicProblemInput!) {
            updateSeasonTopicProblem(updateSeasonTopicProblemInput: $updateSeasonTopicProblemInput) {
                problemId
                seasonId
                seasonTopic {
                    seasonId
                    topicId
                }
                topicId
                users {
                    userId
                    attempts
                }
                }
        }


        Return Type
        {
            "data": {
                "problemId": "70d1e897-5131-4e49-bc31-c96f03e9637c"
                "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
                "seasonTopic": {
                    "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
                    "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
                },
                "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
                "users":[]
            }
        }
`,
  removeSeasonTopicProblem: `Arguments \n
- seasonTopicProblemId : An argument to filter a SeasonTopicProblems which includes the following fields
    * seasonId: An id for a season.
    * topicID: An id for a topic.
    * problemId: An id for a problem\n\n
    {
        "seasonTopicProblemId": {
            "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
            "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
            "problemId": "70d1e897-5131-4e49-bc31-c96f03e9637c"
        }
    }\n

    
    Example:\n
        mutation RemoveSeasonTopicProblem($seasonTopicProblemId: SeasonTopicProblemId!) {
            removeSeasonTopicProblem(seasonTopicProblemId: $seasonTopicProblemId) {
                seasonId
                topicId
                problemId
            }
        }

        Return Type
       {
            "data": {
                "seasonId": "e75f0b45-e803-43ab-88c1-9725f2b52739",
                "topicId": "c20a71a0-0db8-46f2-a6d2-92350f05f9f5",
                "problemId": "70d1e897-5131-4e49-bc31-c96f03e9637c"
            }
        }`,
}
export default descriptions
