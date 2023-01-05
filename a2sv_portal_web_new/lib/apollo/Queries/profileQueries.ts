import { gql } from "@apollo/client";

export const GET_ME_QUERY = gql`
  query GetProfile {
    getMe {
      createdAt
      email
      group {
        name
      }
      groupId
      headToGroup {
        id
        name
      }
      id
      role
      status
      updatedAt
      userProfile {
        bio
        birthDate
        codeforces
        countryCode
        createdAt
        currentEducationStatus
        currentWorkStatus
        educationDegree
        educationField
        educationPlace
        educationYear
        email
        facebook
        firstName
        geekforgeeks
        github
        graduationYear
        hackerrank
        id
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
        userProfileAddress {
          city
          country
        }
        website
      }
    }
  }
`;
