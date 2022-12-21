import { gql } from "@apollo/client";

export const GET_ALL_SEASONS_QUERY = gql`
  query Items($filterSeasonInput: FilterSeasonInput) {
    seasons(filterSeasonInput: $filterSeasonInput) {
      items {
        id
        name
        groupId
        startDate
        endDate
        isActive
        seasonType
      }
    }
  }
`;
