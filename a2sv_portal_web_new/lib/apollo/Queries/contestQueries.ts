import { gql } from "@apollo/client";

export const GET_ALL_GROUP_CONTESTS_QUERY = gql`
  query GroupContests($groupId: String!) {
    groupContests(groupId: $groupId) {
      items {
        contestId
        groupId
        contestAttendance
        contest {
          div
          startTime
          name
          id
          link
        }
      }
    }
  }
`;

export const GET_SINGLE_STUDENT_CONTESTS_QUERY = gql`
  query UserContests($userId: String!) {
    userContests(userId: $userId) {
      items {
        contestId
        contest {
          id
          name
          link
          div
          startTime
        }
        contestAttended
        problemsSolved
        userContestProblems {
          problemId
        }
        timeSpent
      }
    }
  }
`;
