import { gql } from "@apollo/client";

export const GET_SINGLE_GROUP_QUERY = gql`
  query Users($groupId: String!) {
    group(id: $groupId) {
      country
      createdAt
      head {
        id
        role
        email
        userProfile {
          firstName
          lastName
        }
      }
      headId
      id
      name
      school
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

export const GET_ALL_PAGINATED_GROUPS_QUERY = gql`
  query GroupsPagination(
    $filter: GroupWhereInput
    $pageInfoInput: PaginationInfoInput
  ) {
    groups(filter: $filter, pageInfoInput: $pageInfoInput) {
      items {
        id
        name
        head {
          id
        }
        headId
        school
      }
      pageInfo {
        count
        skip
        take
      }
    }
  }
`;
