import { gql } from "@apollo/client";

export const CREATE_PROBLEM_MUTATION = gql`
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

export const ADD_EXISTING_PROBLEM = gql`
  mutation UpdateSeasonTopic($updateSeasonTopicInput: UpdateSeasonTopicInput!) {
    updateSeasonTopic(updateSeasonTopicInput: $updateSeasonTopicInput) {
      seasonId
    }
  }
`;

export const REMOVE_PROBLEM = gql`
  mutation RemoveProblem($problemId: String!) {
    removeProblem(problemId: $problemId) {
      id
    }
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
