import { gql } from "@apollo/client";


export const GET_ALL_SEASON_TOPIC_RESOURCES_QUERY = gql`
    query SeasonTopic($seasonTopicId: SeasonTopicId!) {
        seasonTopic(seasonTopicId: $seasonTopicId) {
            seasonTopicResources {
                id
                name
                link
                description
                createdAt
                type
            }
        }
    }
`;