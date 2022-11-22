import { gql } from "@apollo/client";

export const GET_SINGLE_STUDENT_STATS = gql`
  query GetStudentStats($studentStatsId: String!) {
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
