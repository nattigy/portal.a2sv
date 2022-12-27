import { gql } from "@apollo/client";

export const GET_SINGLE_GROUP_QUERY = gql`
  query Group($groupId: String!) {
    group(groupId: $groupId) {
      id
      name
      school
      country
      head {
        id
        firstName
        lastName
        email
        role
      }
      users {
        id
        firstName
        lastName
        email
        createdAt
      }
      createdAt
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
  query Items(
    $filterGroupInput: FilterGroupInput
    $paginationInput: PaginationInput
  ) {
    groups(
      filterGroupInput: $filterGroupInput
      paginationInput: $paginationInput
    ) {
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

export const GET_SINGLE_GROUP_STATS = gql`
  query GroupStat($groupId: String!) {
    groupStat(groupId: $groupId) {
      id
      name
      numberOfAcceptedSubmissions
      numberOfProblems
      numberOfStudents
      numberOfTopicsCovered
      numberOfWrongSubmissions
      school
      country
      contestsAttended
      createdAt
      topicsCoverage
      totalTimeDedicated
    }
  }
`;
