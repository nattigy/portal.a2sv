import { gql } from "@apollo/client";

export const GET_SINGLE_GROUP_QUERY = gql`
  query Group($groupId: String!) {
    group(groupId: $groupId) {
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
      headId
      country
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
      items { 
        country
        createdAt
        id
        name
        school
      }
    }
  }
`;

export const GET_ALL_PAGINATED_GROUPS_QUERY = gql`
      query GroupsPagination(
    $filterGroupInput: FilterGroupInput
    $pageInfoInput: PaginationInfoInput
  ) {
    groups(filterGroupInput: $filterGroupInput, pageInfoInput: $pageInfoInput) {
      items {
        id
        name
        head {
          email
          id
        }
        headId
        school
        createdAt
        country
        users {
          userProfile {
            photoUrl
          }
        }
      }
      pageInfo {
        count
        skip
        take
      }
    }
  }
`;
