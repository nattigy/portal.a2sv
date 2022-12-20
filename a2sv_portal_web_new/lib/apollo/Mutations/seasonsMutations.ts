import { gql } from "@apollo/client";

export const CREATE_SEASON = gql`
  mutation CreateSeason($createSeasonInput: CreateSeasonInput!) {
    createSeason(createSeasonInput: $createSeasonInput) {
      id
    }
  }
`;

export const REMOVE_SEASON = gql`
  mutation RemoveSeason($seasonId: String!) {
    removeSeason(seasonId: $seasonId)
  }
`;

export const EDIT_SEASON = gql`
  mutation UpdateSeason($updateSeasonInput: UpdateSeasonInput!) {
    updateSeason(updateSeasonInput: $updateSeasonInput) {
      id
    }
  }
`;
