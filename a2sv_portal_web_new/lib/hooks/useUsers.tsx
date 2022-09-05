import { useQuery } from "@apollo/client";
import { GET_ALL_USER_QUERY } from "../apollo/Queries/usersQueries";


const useAllUsers = () => {
    return useQuery(GET_ALL_USER_QUERY, {
        errorPolicy: 'all',
        notifyOnNetworkStatusChange: true
    })
}

export default useAllUsers