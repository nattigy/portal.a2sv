import { gql } from "@apollo/client";

export const CREATE_CONTEST = gql`
  mutation CreateContest($createContestInput: CreateContestInput!) {
    createContest(createContestInput: $createContestInput) {
      id
    }
  }
`;

export const UPDATE_USER_CONTEST_PROBLEM = gql`
  mutation UpdateUserContestProblem(
    $updateUserContestProblemInput: UpdateUserContestProblemInput!
  ) {
    updateUserContestProblem(
      updateUserContestProblemInput: $updateUserContestProblemInput
    ) {
      contestId
    }
  }
`;

export const EDIT_CONTEST = gql`
  mutation UpdateContest($updateContestInput: UpdateContestInput!) {
    updateContest(updateContestInput: $updateContestInput) {
      id
    }
  }
`;

export const DELETE_CONTEST= gql`
  mutation RemoveContest($contestId: String!) {
    removeContest(contestId: $contestId)
  }
`;
