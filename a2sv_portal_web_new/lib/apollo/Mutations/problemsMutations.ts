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
  mutation UpdateGroupTopicSeason(
    $updateGroupTopicSeasonInput: UpdateGroupTopicSeasonInput!
  ) {
    updateGroupTopicSeason(
      updateGroupTopicSeasonInput: $updateGroupTopicSeasonInput
    ) {
      groupId
      seasonId
      topicId
    }
  }
`;
