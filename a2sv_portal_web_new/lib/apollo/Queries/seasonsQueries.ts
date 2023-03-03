import { gql } from "@apollo/client";

export const GET_ALL_SEASONS_QUERY = gql`
  query Seasons($filterSeasonInput: FilterSeasonInput) {
    seasons(filterSeasonInput: $filterSeasonInput) {
      items {
        id
        name
        isActive
        seasonType
        startDate
        updatedAt
        endDate
        duration
        createdAt
      }
    }
  }
`;
export const GET_GROUP_SEASONS = gql`
  query Items($filterGroupSeasonInput: FilterGroupSeasonInput!) {
    groupSeasons(filterGroupSeasonInput: $filterGroupSeasonInput) {
      items {
        season {
          id
          name
          isActive
          seasonType
          startDate
          updatedAt
          endDate
          duration
          createdAt
        }
      }
    }
  }
`;

export const GET_SEASON_REQUESTS = gql`
  query Group($filterGroupSeasonInput: FilterGroupSeasonInput!) {
    groupSeasons(filterGroupSeasonInput: $filterGroupSeasonInput) {
      items {
        group {
          head {
            id
            email
            userProfile {
              lastName
              firstName
            }
          }
          id
          name
        }
        season {
          id
          name
        }
      }
    }
  }
`;
