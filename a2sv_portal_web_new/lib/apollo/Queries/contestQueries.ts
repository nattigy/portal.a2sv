import { gql } from "@apollo/client";

export const GET_ALL_GROUP_CONTESTS_QUERY = gql`
query GroupContests($filterGroupContestInput: FilterGroupContestInput) {
  groupContests(filterGroupContestInput: $filterGroupContestInput) {
    items {
      contestId
      contestAttendance
      contest {
        id
        name
        div
        link
        startTime
        groupContests {
          contestAttendance
        }
        problems {
          id
        }
      }
    }
  }
}`;

export const GET_SINGLE_STUDENT_ALL_CONTESTS_QUERY = gql`
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
  }`

export const GET_SINGLE_STUDENT_CONTEST_DETAIL_QUERY = gql`query UserContest($userContestId: UserContestId!) {
  userContest(userContestId: $userContestId) {
    contest {
      name
    }
    timeSpent
    rank
    problemsSolved
    contestAttended
    wrongSubmissions
    userContestProblems {
      contestId
      numberOfAttempts
      numberOfMinutes
      status
      problem {
        id
        title
        link
        difficulty
        platform
      }

    }
  }
}`
