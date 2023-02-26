import { gql } from "@apollo/client";

export const GET_ALL_GROUP_CONTESTS_QUERY = gql`
  query GroupContests($filterGroupContestInput: FilterGroupContestInput) {
    groupContests(filterContestInput: $filterContestInput) {
      items {
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
  }
`;

export const GET_SINGLE_GROUP_CONTESTS_QUERY = gql`
  query GroupContest($groupContestId: GroupContestId!) {
    groupContest(groupContestId: $groupContestId) {
      contest {
        id
        name
        link
        div
        startTime
        problems {
          id
          title
          link
          difficulty
          platform
        }
      }
      contestAttendance
      problemsStat {
        numberOfStudents
        problemId
      }
      group {
        users {
          id
        }
      }
    }
  }
`;

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
  }
`;

export const GET_SINGLE_STUDENT_CONTEST_DETAIL_QUERY = gql`
  query UserContest($userContestId: UserContestId!) {
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
  }
`;

export const GET_ALL_CONTESTS = gql`
  query Contests {
    contests {
      items {
        updatedAt
        startTime
        name
        id
        endTime
        div
        createdAt
      }
    }
  }
`;

export const GET_CONTEST_DETAIL = gql`
  query Contest($contestId: String!) {
    contest(contestId: $contestId) {
      updatedAt
      startTime
      problems {
        updatedAt
        title
        tags {
          name
          id
        }
        platform
        link
        id
        difficulty
        createdAt
      }
      name
      link
      id
      endTime
      div
      createdAt
    }
  }
`;
