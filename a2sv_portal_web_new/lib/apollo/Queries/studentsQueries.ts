import { gql } from "@apollo/client";

export const GET_SINGLE_STUDENT_STATS = gql`
  query StudentStats($studentStatsId: String!) {
    studentStats(id: $studentStatsId) {
      acceptanceRate
      allTimeRank
      easyCount
      hardCount
      mediumCount
      monthlyRank
      numberOfCorrectSubmissions
      numberOfIncorrectSubmissions
      totalTimeDedicated
      totalUsers
      unComfortability
      weeklyRank
    }
  }
`;

export const GET_SINGLE_STUDENT_CONSISTENCY_DATA = gql`
  query GetSingleStudentConsistencyData($userId: String!, $endDate: DateTime) {
    dataAnalytic(user_id: $userId, end_date: $endDate) {
      createdAt
      solvedCount
      updatedAt
      wrongCount
    }
  }
`;
