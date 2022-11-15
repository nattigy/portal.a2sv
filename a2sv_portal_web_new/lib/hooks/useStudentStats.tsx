import { useQuery } from "@apollo/client";
import { GET_SINGLE_STUDENT_STATS } from "../apollo/Queries/studentsQueries";

const useStudentStatsDetail = (studentId: string) => {
    return useQuery(GET_SINGLE_STUDENT_STATS, {
        variables: {
            studentId: studentId,
        },
        errorPolicy: "all",
        notifyOnNetworkStatusChange: true,
    });
};

export default useStudentStatsDetail;
