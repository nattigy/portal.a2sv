import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_SINGLE_STUDENT_CONSISTENCY_DATA, GET_SINGLE_STUDENT_STATS } from "../apollo/Queries/studentsQueries";

export const useStudentStatsDetail = (studentId: string) => {
  return useLazyQuery(GET_SINGLE_STUDENT_STATS, {
    variables: {
      studentStatsId: studentId
    },
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });
};

export const useStudentConsistencyData = (studentId: string, endDate?: Date) => {
  return useQuery(GET_SINGLE_STUDENT_CONSISTENCY_DATA, {
    variables: {
      userId: studentId,
      endDate
    },
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });
}

