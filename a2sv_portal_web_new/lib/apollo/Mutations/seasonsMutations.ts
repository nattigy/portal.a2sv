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

export const ACCEPT_OR_REJECT_SEASON_REQUEST = gql`
  mutation Mutation(
    $updateGroupSeasonJoinRequestInput: UpdateGroupSeasonJoinRequestInput!
  ) {
    updateGroupSeasonJoinRequest(
      updateGroupSeasonJoinRequestInput: $updateGroupSeasonJoinRequestInput
    ) {
      joinRequest
    }
  }
`;
export const MAKE_SEASON_REQUEST = gql`
  mutation AddGroupToASeason($addGroupToASeasonInput: CreateGroupSeasonInput!) {
    addGroupToASeason(addGroupToASeasonInput: $addGroupToASeasonInput) {
      seasonId
    }
  }
`;

export const ADD_SEASON_TOPIC_RESOURCES = gql`
  mutation AddResourcesToSeasonTopic(
    $createSeasonTopicInput: CreateSeasonTopicInput!
  ) {
    addResourcesToSeasonTopic(createSeasonTopicInput: $createSeasonTopicInput) {
      seasonId
      topicId
    }
  }
`;
export const START_SEASON = gql`
  mutation UpdateGroup($updateGroupSeasonInput: UpdateGroupSeasonInput!) {
    updateGroupSeason(updateGroupSeasonInput: $updateGroupSeasonInput) {
      isActive
    }
  }
`;
