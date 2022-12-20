import { gql } from "@apollo/client";

// export const GET_ALL_SEASONS_QUERY = gql`
//   query Items($filterSeasonInput: FilterSeasonInput) {
//     seasons(filterSeasonInput: $filterSeasonInput) {
//       items {
//         id
//         name
//         groupId
//         startDate
//         endDate
//         isActive
//         seasonType
//       }
//     }
//   }
// `;

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
