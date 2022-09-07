import { useLazyQuery, useQuery } from "@apollo/client";
import { BsFileBreakFill } from "react-icons/bs";
import { GraphqlUserRole } from "../../types/user";
import { GET_ALL_USER_QUERY, GET_FILTERED_USERS, GET_STUDENTS_WITH_NO_GROUP_QUERY, GET_USERS_BY_GROUP_ID_QUERY } from "../apollo/Queries/usersQueries";



export const useFilteredUsers = (tabIndex: number) => {
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
        variables: {
            role
        },
        errorPolicy: 'all',
        notifyOnNetworkStatusChange: true
    })
}


export const useUsersByGroupId = (groupId: number) => {
    return useLazyQuery(GET_USERS_BY_GROUP_ID_QUERY, {
        variables: {
            groupId
        },
        errorPolicy: 'all',
        notifyOnNetworkStatusChange: true
    })
}

export const useGetUsersWithNoGroup = () => {
    return useQuery(GET_STUDENTS_WITH_NO_GROUP_QUERY, {
        variables: {
            role: GraphqlUserRole.STUDENT,
            groupId: null
        },
        errorPolicy: 'all',
        notifyOnNetworkStatusChange: true
    })
}

