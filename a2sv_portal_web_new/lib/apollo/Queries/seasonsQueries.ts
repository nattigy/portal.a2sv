import { gql } from "@apollo/client";

export const GET_ALL_SEASONS_QUERY = gql`
  query Items {
    seasons {
      items {
        duration
        endDate
        id
        isActive
        name
        seasonType
        startDate
        updatedAt
        createdAt
      }
    }
  }
`;

export const GET_SEASON_REQUESTS = gql`
  query GroupSeasons($filterGroupSeasonInput: FilterGroupSeasonInput!) {
    groupSeasons(filterGroupSeasonInput: $filterGroupSeasonInput) {
      items {
        head {
          id
          firstName
          lastName
        }
        season {
          id
          name
        }
        group {
          name
          id
        }
      }
    }
  }
`;
