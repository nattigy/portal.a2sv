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

export const GET_PROBLEMS_BY_GROUP_SEASON_TOPIC = gql`
query GroupTopicSeason($groupId: Int!, $topicId: Int!, $seasonId: Int!) {
  groupTopicSeason(groupId: $groupId, topicId: $topicId, seasonId: $seasonId) {
    problems {
      problem {
        id
        link
        platform
        title
        tags {
          name
          id
        }
        difficulty
      }
    }
  }
}
`;
