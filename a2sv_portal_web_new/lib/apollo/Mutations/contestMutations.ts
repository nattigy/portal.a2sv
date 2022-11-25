import { gql } from "@apollo/client";

export const CREATE_CONTEST_MUTATION = gql`
  mutation CreateContest($createContestInput: CreateContestInput!) {
    createContest(createContestInput: $createContestInput) {
      id
    }
  }
`;

export const UPDATE_USER_CONTEST_PROBLEM = gql`
mutation UpdateUserContestProblem($updateUserContestProblemInput: UpdateUserContestProblemInput!) {
  updateUserContestProblem(updateUserContestProblemInput: $updateUserContestProblemInput) {
    contestId
  }
}`

export const EDIT_GROUP_CONTEST_MUTATION = gql`
  mutation UpdateContest($updateContestInput: UpdateContestInput!) {
    updateContest(updateContestInput: $updateContestInput) {
      id
    }
  }
`;

export const DELETE_GROUP_CONTEST_MUTATION = gql`
  mutation RemoveGroupContest($removeGroupContestId: Int!) {
    removeGroupContest(id: $removeGroupContestId) {
      contestId
    }
  }
`;
