import { useQuery } from "@apollo/client";
import { number } from "yup/lib/locale";
import { GET_SINGLE_GROUP_QUERY } from "../apollo/Queries/groupsQueries";


const useGroupDetail = (groupId: string | any) => {
    const id = parseInt(groupId) || 0
    return useQuery(GET_SINGLE_GROUP_QUERY,
        {
            variables: {
                groupId: id
            },
            errorPolicy: 'all',
            notifyOnNetworkStatusChange: true
        })
}

export default useGroupDetail