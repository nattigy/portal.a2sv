import { gql } from "@apollo/client";

export const GET_SINGLE_TAG_QUERY = gql`
  query GetTagById($tagId: Int!) {
    tag(id: $tagId) {
      id
      name
      problems {
        createdAt
        difficulty
        id
        link
        platform
        title
        updatedAt
      }
    }
  }
`;

export const GET_ALL_TAG_QUERY = gql`
  query GetTags {
    tags {
      id
      name
      problems {
        createdAt
        difficulty
        id
        link
        platform
        title
        updatedAt
      }
    }
  }
`;
