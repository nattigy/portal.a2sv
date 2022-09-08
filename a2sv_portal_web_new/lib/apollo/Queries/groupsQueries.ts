import { gql } from "@apollo/client";

export const GET_SINGLE_GROUP_QUERY = gql`
  query Users($groupId: Int!) {
    group(id: $groupId) {
      country
      createdAt
      head {
        id
        groupId
        email
      }
      headId
      id
      name
      school
      topics {
        topicId
      }
      users {
        email
        userProfile {
          firstName
          lastName
        }
      }
    }
  }
`;



export const GET_ALL_GROUPS_QUERY = gql`
  query GET_ALL_GROUPS_QUERY {
    groups {
      country
      createdAt
      id
      name
      school
    }
  }
`;
