const descriptions = {
  createProblem: `
    Creates a problem\n
    Arguments\n
        - title: title of the problem
        - link: link to the problem
        - difficulty: difficulty level of the problem
        - platform: the platform a question is from 
        - tags: tag of the problem
    Example \n
    mutation Mutation($createProblemInput: CreateProblemInput!) {\n
        createProblem(createProblemInput: $createProblemInput) {
          id
          platform
          tags {
            name
            id
          }
          title
        }
      }\n
    Input\n
    {\n
        "createProblemInput": {
          "title": "Longest valid paretheses",
          "link": "https://leetcode.com/problems/longest-valid-parentheses/",
          "difficulty": "Hard",
          "platform": "LEETCODE",
          "tags": [
            {
              "name": "Stack"
            }
          ]
        }
      }
    Return\n
    {\n
        "data": {
          "createProblem": {
            "id": "c9a3db19-cd27-4080-9b07-0d03ec5f2592",
            "platform": "LEETCODE",
            "tags": [
              {
                "name": "STACK",
                "id": "33101ffd-65e1-4e9f-8b5c-6b25557c06bd"
              }
            ],
            "title": "Longest valid paretheses"
          }
        }
      }
    `,
  problems: `
  Example\n
  query Problems {
    problems {
      items {
        id
        link
        platform
        title
        difficulty
      }
    }
  }
  Return\n
  {
    "data": {
      "problems": {
        "items": [
          {
            "id": "b497240c-f885-4fc5-adf3-d09ad0662a1c",
            "link": "https://leetcode.com/problems/two-sum/",
            "platform": "LEETCODE",
            "title": "Two Sum",
            "difficulty": "EASY"
          },
          {
            "id": "cf8dfeb5-cede-480a-b683-0bf8a5fcde37",
            "link": "https://leetcode.com/problems/valid-sudoku/",
            "platform": "LEETCODE",
            "title": "Valid Soduku",
            "difficulty": "HARD"
          },
          {
            "id": "e6c0f2ca-c675-4afd-a506-d974ea96676e",
            "link": "https://leetcode.com/problems/reverse-integer/",
            "platform": "LEETCODE",
            "title": "Reverse Integer",
            "difficulty": "MEDIUM"
          }
        ]
      }
    }
  }
  `,
  problem: `
    Argument\n
      - id: id of the problem we want to see
    Example\n
    query Problem($problemId: String!) {
        problem(id: $problemId) {
          title
          id
          link
          platform
          tags {
            name
            id
          }
        }
      }\n
    Input\n
    {\n
        "problemId": "c9a3db19-cd27-4080-9b07-0d03ec5f2592"
    }\n
    Return\n
    {\n
        "data": {
          "problem": {
            "title": "Longest valid paretheses",
            "id": "c9a3db19-cd27-4080-9b07-0d03ec5f2592",
            "link": "https://leetcode.com/problems/longest-valid-parentheses/",
            "platform": "LEETCODE",
            "tags": [
              {
                "name": "STACK",
                "id": "33101ffd-65e1-4e9f-8b5c-6b25557c06bd"
              }
            ]
          }
        }
      }    
    `,
  updateProblem: `
    Update a problem\n
    Argument\n
      - id: id of the problem we want to update
      - entity we want to update
    Example\n
    mutation UpdateProblem($updateProblemInput: UpdateProblemInput!) {\n
        updateProblem(updateProblemInput: $updateProblemInput) {
          id
          difficulty
        }
      }\n
    Input\n
    {\n
        "updateProblemInput": {
          "difficulty": "EASY",
          "id": "c9a3db19-cd27-4080-9b07-0d03ec5f2592"
        }
      }\n
    Return\n
    {\n
        "data": {
          "updateProblem": {
            "id": "c9a3db19-cd27-4080-9b07-0d03ec5f2592",
            "difficulty": "EASY"
          }
        }
      }
    
    `,
  removeProblem: `
    Delete a problem\n
    Argument\n
      -problemId: id of the problem to be deleted
    Example\n
    mutation RemoveProblem($removeProblemId: String!) {\n
        removeProblem(problemId: $removeProblemId) {
          id
        }
      }\n
    Input\n
    {\n
        "removeProblemId":"c9a3db19-cd27-4080-9b07-0d03ec5f2592"
      }
    `,
}
export default descriptions
