import { gql } from "@apollo/client";

export const CREATE_GROUP_MUTATION = gql`
  mutation Mutation($createGroupInput: CreateGroupInput!) {
    createGroup(createGroupInput: $createGroupInput) {
      country
      createdAt
      id
      name
      school
    }
  }
`;
export const ASSIGN_HOE_TO_GROUP = gql`
  mutation Mutation($updateGroupInput: UpdateGroupInput!) {
    updateGroup(updateGroupInput: $updateGroupInput) {
      id
      name
    }
  }
`;

export const ADD_TOPIC_TO_GROUP = gql`
  mutation Mutation($updateGroupInput: UpdateGroupInput!) {
    updateGroup(updateGroupInput: $updateGroupInput) {
      topics {
        topic {
          id
        }
      }
    }
  }
`;
export const DELETE_GROUP = gql`
  mutation RemoveGroup($groupId: String!) {
    removeGroup(groupId: $groupId)
  }
`;
export const ADD_STUDENTS_TO_GROUP = gql`
  mutation AddUsersToAGroup($groupId: String!, $studentIds: [String!]!) {
    addUsersToAGroup(groupId: $groupId, studentIds: $studentIds)
  }
`;

export const REMOVE_STUDENTS_FROM_GROUP = gql`
  mutation RemoveUsersFromAGroup($groupId: String!, $studentIds: [String!]!) {
    removeUsersFromAGroup(groupId: $groupId, studentIds: $studentIds)
  }
`;

export const EDIT_GROUP = gql`
  mutation UpdateGroup($updateGroupInput: UpdateGroupInput!) {
    updateGroup(updateGroupInput: $updateGroupInput) {
      id
    }
  }
`;

export const REMOVE_SEASON_FROM_GROUP = gql`
  mutation RemoveGroupFromASeason($groupSeasonId: GroupSeasonId!) {
  removeGroupFromASeason(groupSeasonId: $groupSeasonId) {
    groupId
  }
}
`;

/*
{
  "updateGroupInput": {
    "id": null,
    "name": null,
    "country": null,
    "school": null,
    "head": {
      "id": null
    }
  }
}

*/
