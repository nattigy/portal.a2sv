import { gql } from "@apollo/client";

export const GET_ME_QUERY = gql`
  query GetMe {
    getMe {
      id
      email
      role
      status
      createdAt
      updatedAt
      groupId
      group {
        name
      }
      headToGroups {
        id
        name
      }
      userProfile {
        bio
        birthDate
        city
        codeforces
        country
        countryCode
        createdAt
        currentEducationStatus
        currentWorkStatus
        educationDegree
        educationField
        educationPlace
        educationYear
        email
        firstName
        geekforgeeks
        github
        graduationYear
        hackerrank
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
