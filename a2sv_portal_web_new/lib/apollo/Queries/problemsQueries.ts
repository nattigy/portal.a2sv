import { gql } from "@apollo/client";

export const GET_SINGLE_PROBLEM_QUERY = gql`
  query GetProblemById($problemId: Int!) {
    problem(id: $problemId) {
      createdAt
      difficulty
      id
      link
      platform
      tags {
        id
        name
      }
      title
      updatedAt
    }
  }
`;

export const GET_ALL_PROBLEMS_QUERY = gql`
  query Query {
  problems {
    items {
      title
      id
      createdAt
      difficulty
      platform
      tags {
        id
        name
      }
      updatedAt
    }
  }
}
`;


export const GET_PROBLEMS_BY_GROUP_SEASON_TOPIC = gql`
query Items($seasonTopicProblemFilter: SeasonTopicProblemFilter!) {
  seasonTopicProblems(seasonTopicProblemFilter: $seasonTopicProblemFilter) {
    items {
      problemId
      problem {
        createdAt
        difficulty
        id
        link
        platform
        title
        updatedAt
        tags {
          id
          name
        }
      }
      seasonId
    }
  }
}
`;
