import { useLazyQuery, useQuery } from "@apollo/client";
import { BsFileBreakFill } from "react-icons/bs";
import { GraphqlUserRole } from "../../types/user";
import { GET_ALL_USER_QUERY,GET_FILTERED_USERS } from "../apollo/Queries/usersQueries";


// export const useAllUsers = () => {
//     return useQuery(GET_ALL_USER_QUERY, {
//         errorPolicy: 'all',
//         notifyOnNetworkStatusChange: true
//     })
// }
export const useFilteredUsers = (tabIndex:number) => {
    let role;
    switch (tabIndex) {
        case 1:
            role = GraphqlUserRole.HEAD_OF_ACADEMY
            break;
        case 2:
            role = GraphqlUserRole.HEAD_OF_EDUCATION
            break;
        case 3:
            role = GraphqlUserRole.STUDENT
            break;
        default:
            break;
    }

    return useLazyQuery(GET_FILTERED_USERS, {
        variables:{
            role
        },
        errorPolicy: 'all',
        notifyOnNetworkStatusChange: true
    })
}


