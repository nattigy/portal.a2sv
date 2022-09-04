import { useQuery } from "@apollo/client";
import { GET_ALL_GROUPS_QUERY } from "../apollo/Queries/groupsQueries";


const useAllGroups = () => {
    return useQuery(GET_ALL_GROUPS_QUERY, {
        errorPolicy: 'all',
        notifyOnNetworkStatusChange: true
    })
}

export default useAllGroups