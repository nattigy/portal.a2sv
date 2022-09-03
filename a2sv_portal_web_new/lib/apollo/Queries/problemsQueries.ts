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

export const GET_ALL_PROBLEM_QUERY = gql`
  query GetProblems {
    problems {
      createdAt
      difficulty
      id
      link
      platform
      tags {
        name
        id
      }
      title
      updatedAt
    }
  }
`;
