import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_ALL_GROUP_TOPICS_BY_SEASON_ID_QUERY, GET_ALL_TOPICS_BY_SEASON_ID_QUERY, GET_ALL_TOPIC_QUERY } from "../apollo/Queries/topicsQueries";


const useGetAllTopicsBySeasonIdQuery = (seasonId: any) => {
    return useLazyQuery(GET_ALL_TOPICS_BY_SEASON_ID_QUERY, {
        notifyOnNetworkStatusChange: true,
        errorPolicy: 'all',
        variables: {
            seasonId
        }
    })
}
export const useGetAllGroupTopicsBySeasonIdQuery = (seasonId: any, groupId: any) => {
    return useLazyQuery(GET_ALL_GROUP_TOPICS_BY_SEASON_ID_QUERY, {
        notifyOnNetworkStatusChange: true,
        errorPolicy: 'all',
        variables: {
            seasonId,
            groupId
        }
    })
}

export const useGetAllTopicsByForSearchQuery = () => {
    return useLazyQuery(GET_ALL_TOPIC_QUERY, {
        notifyOnNetworkStatusChange: true,
        errorPolicy: 'all',
    })
}

// export const useGetAllTopicsBySeasonIdForSearchQuery = (seasonId: any) => {
//     return useQuery(GET_ALL_TOPICS_BY_SEASON_ID_FOR_SEARCH_QUERY, {
//         notifyOnNetworkStatusChange: true,
//         errorPolicy: 'all',
//         variables: {
//             seasonId
//         }
//     })
// }



export default useGetAllTopicsBySeasonIdQuery