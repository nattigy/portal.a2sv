import { gql } from "@apollo/client";

export const CREATE_SEASON = gql`
  mutation CreateSeason($createSeasonInput: CreateSeasonInput!) {
    createSeason(createSeasonInput: $createSeasonInput) {
      groupId
      id
      name
      seasonType
    }
  }
`;
export const DELETE_SEASON = gql`
  mutation DeleteSeason($deleteSeasonId: String!) {
    deleteSeason(id: $deleteSeasonId) {
      id
      groupId
    }
  }
`;

export const EDIT_SEASON = gql`
  mutation UpdateSeason(
    $updateSeasonInput: UpdateSeasonInput!
    $updateSeasonId: String!
  ) {
    updateSeason(updateSeasonInput: $updateSeasonInput, id: $updateSeasonId) {
      id
      name
      seasonType
    }
  }
`;
