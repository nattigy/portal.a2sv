import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_ME_QUERY } from "../apollo/Queries/profileQueries";
import { GET_ALL_TOPICS_BY_SEASON_ID_QUERY, GET_ALL_TOPIC_QUERY } from "../apollo/Queries/topicsQueries";


const useGetAllTopicsBySeasonIdQuery = (seasonId: any) => {
    return useLazyQuery(GET_ALL_TOPICS_BY_SEASON_ID_QUERY, {
        notifyOnNetworkStatusChange: true,
        errorPolicy: 'all',
        variables: {
            seasonId
        }
    })
}

export default useGetAllTopicsBySeasonIdQuery