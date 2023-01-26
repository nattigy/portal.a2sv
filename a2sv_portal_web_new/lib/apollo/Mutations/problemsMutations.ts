import { gql } from "@apollo/client";

export const CREATE_PROBLEM = gql`
  mutation Mutation($createProblemInput: CreateProblemInput!) {
    createProblem(createProblemInput: $createProblemInput) {
      difficulty
      id
      link
      platform
      tags {
        id
        name
      }
      title
    }
  }
`;


export const REMOVE_PROBLEM = gql`
  mutation RemoveProblem($problemId: String!) {
    removeProblem(problemId: $problemId)
  }
`;
export const REMOVE_SEASON_TOPIC_PROBLEM = gql`
  mutation RemoveSeasonTopicProblem(
    $seasonTopicProblemId: SeasonTopicProblemId!
  ) {
    removeSeasonTopicProblem(seasonTopicProblemId: $seasonTopicProblemId) {
      problemId
    }
  }
`;
export const UPDATE_PROBLEM = gql`
  mutation UpdateProblem($updateProblemInput: UpdateProblemInput!) {
    updateProblem(updateProblemInput: $updateProblemInput) {
      id
    }
  }
`;

export const ADD_PROBLEM_TO_SEASON_TOPIC = gql`
  mutation AddProblemsToSeasonTopic(
    $problemIds: [String!]!
    $seasonTopicId: SeasonTopicId!
  ) {
    addProblemsToSeasonTopic(
      problemIds: $problemIds
      seasonTopicId: $seasonTopicId
    )
  }
`;
