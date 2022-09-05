import { useQuery } from "@apollo/client";
import { GET_ALL_PROBLEM_QUERY } from "../apollo/Queries/problemsQueries";


const useAllProblems = () => {
    return useQuery(GET_ALL_PROBLEM_QUERY, {
        errorPolicy: 'all',
        notifyOnNetworkStatusChange: true
    })
}

export default useAllProblems