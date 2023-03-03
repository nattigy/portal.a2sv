import { gql } from "@apollo/client";

export const GET_SINGLE_USER_QUERY = gql`
  query Query($userId: String!) {
    user(id: $userId) {
      email
      groupId
      id
      role
      status
      userProfile {
        firstName
        lastName
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query User($uniqueUserInput: UniqueUserInput!) {
    user(uniqueUserInput: $uniqueUserInput) {
      userProfile {
        bio
        birthDate
        codeforces
        city
        country
        createdAt
        currentEducationStatus
        currentWorkStatus
        educationDegree
        educationField
        educationPlace
        educationYear
        firstName
        geekforgeeks
        github
        graduationYear
        hackerrank
        email
        instagram
        lastName
        leetcode
        linkedin
        middleName
        phone
        photoUrl
        resumeLink
        telegram
        tshirtSize
        twitter
        updatedAt
        userId
        website
      }
    }
  }
`;

export const GET_ALL_USER_QUERY = gql`
  query Users {
    users {
      createdAt
      email
      headToGroup {
        id
      }
      id
      status
      updatedAt
      role
      group {
        id
      }
      userProfile {
        userId
        firstName
        lastName
      }
    }
  }
`;

export const GET_FILTERED_USERS = gql`
  query Users(
    $paginationInput: PaginationInput
    $filterUserInput: FilterUserInput
  ) {
    users(
      paginationInput: $paginationInput
      filterUserInput: $filterUserInput
    ) {
      items {
        id
        email
        role
        status
        userProfile {
          firstName
          lastName
        }
        group {
          name
        }
      }
    }
  }
`;

export const GET_USERS_BY_GROUP_ID_QUERY = gql`
  query Users($groupId: String) {
    users(groupId: $groupId) {
      email
      id
      createdAt
      group {
        country
        school
      }
      userProfile {
        userId
        firstName
        lastName
      }
    }
  }
`;

export const GET_STUDENTS_WITH_NO_GROUP_QUERY = gql`
query Users($filterUserInput: FilterUserInput) {
  users(filterUserInput: $filterUserInput) {
    items {
      id
      groupId
      email
      userProfile {
        firstName
        lastName
      }
      role
    }
  }
}`;

export const GET_SINGLE_GROUP_USERS_QUERY = gql`
  query Users($groupId: String!) {
    group(id: $groupId) {
      users {
        email
        createdAt
        status
        userProfile {
          firstName
          lastName
        }
      }
    }
  }
`;

export const GET_OTP_STATUS_QUERY = gql`
  query OTPQuery($email: String!) {
    checkOtpStatus(email: $email)
  }
`;
