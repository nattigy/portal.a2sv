import { useQuery } from "@apollo/client";
import { GET_ALL_PAGINATED_GROUPS_QUERY } from "../apollo/Queries/groupsQueries";
// import {GET_ALL} from "../apollo/Queries/groupsQueries"

const usePaginatedAllGroups = () => {
  return useQuery(GET_ALL_PAGINATED_GROUPS_QUERY, {
    // return useQuery(GET_ALL, {
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });
};

export default usePaginatedAllGroups;
