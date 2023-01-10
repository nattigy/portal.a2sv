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
  query Items {
    problems {
      items {
        id
        title
        link
        platform
        difficulty
        createdAt
        tags {
          id
          name
        }
      }
    }
  }
`;

export const GET_ALL_PROBLEMS_BY_TAG_QUERY = gql`
  query Problems($filterProblemInput: FilterProblemInput) {
    problems(filterProblemInput: $filterProblemInput) {
      items {
        id
        title
        link
        platform
        difficulty
        createdAt
        tags {
          id
          name
        }
      }
    }
  }
`;

export const GET_PROBLEMS_BY_SEASON_TOPIC_FOR_HOA = gql`
query SeasonsTopics($seasonId: String!) {
  seasonsTopics(seasonId: $seasonId) {
    items {
      seasonTopicProblems {
        problemId
        createdAt
        problem {
          id
          title
          link
          difficulty
          platform
          tags {
            name
            id
          }
        }
      }
    }
  }
}`

export const GET_PROBLEMS_BY_GROUP_SEASON_TOPIC = gql`
query GroupSeasonTopic($groupSeasonTopicId: GroupSeasonTopicId!) {
  groupSeasonTopic(groupSeasonTopicId: $groupSeasonTopicId) {
    comfortability
    groupSeasonTopicProblems {
      problemId
      problem {
        id
        title
        difficulty
        platform
        link
        createdAt
        tags {
          id
          name
        }
      }
    }
  }
}
`;

export const GET_ALL_PROBLEMS_FILTERED = gql`
  query Problems($filterProblemInput: FilterProblemInput) {
    problems(filterProblemInput: $filterProblemInput) {
      items {
        id
        title
        link
        platform
        difficulty
        createdAt
        tags {
          id
          name
        }
      }
    }
  }
`;
