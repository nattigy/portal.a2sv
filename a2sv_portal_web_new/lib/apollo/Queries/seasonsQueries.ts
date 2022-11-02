import { gql } from "@apollo/client";


export const GET_ALL_SEASONS_QUERY = gql`
  query Seasons($groupId: String!) {
  group(id: $groupId) {
    seasons {
      name
      id
      seasonType
      startDate
      endDate
      groupId
    }
  }
}
`;
