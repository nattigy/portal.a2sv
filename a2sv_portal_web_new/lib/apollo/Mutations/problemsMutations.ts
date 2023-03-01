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

export const REMOVE_SEASON_TOPIC_PROBLEM = gql`
  mutation RemoveSeasonTopicProblems(
    $problemIds: [String!]!, 
    $seasonTopicId: SeasonTopicId!
  ) {
    removeSeasonTopicProblems(
      problemIds: $problemIds, 
      seasonTopicId: $seasonTopicId
    )
  }
`;

export const ADD_PROBLEM_TO_GROUP_SEASON_TOPIC = gql`
  mutation AddProblemsToGroupSeasonTopic(
    $groupSeasonTopicId: GroupSeasonTopicId!
    $problemIds: [String!]!
  ) {
    addProblemsToGroupSeasonTopic(
      groupSeasonTopicId: $groupSeasonTopicId
      problemIds: $problemIds
    )
  }
`;

export const REMOVE_PROBLEM_FROM_GROUP_SEASON_TOPIC = gql`
  mutation RemoveGroupSeasonTopicProblems(
    $groupSeasonTopicId: GroupSeasonTopicId!
    $problemIds: [String!]!
  ) {
    removeGroupSeasonTopicProblems(
      groupSeasonTopicId: $groupSeasonTopicId
      problemIds: $problemIds
    )
  }
`;
export const UPDATE_USER_PROBLEM_STATUS = gql`
  mutation UpdateUserProblemStatus(
    $updateProblemStatusInput: UpdateUserGroupSeasonTopicProblemInput!
  ) {
    updateUserProblemStatus(
      updateProblemStatusInput: $updateProblemStatusInput
    ) {
      userId
    }
  }
`;
