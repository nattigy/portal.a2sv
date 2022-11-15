import { useQuery } from "@apollo/client";
import { GET_SINGLE_GROUP_QUERY } from "../apollo/Queries/groupsQueries";

const useGroupDetail = (groupId: string) => {
  return useQuery(GET_SINGLE_GROUP_QUERY, {
    variables: {
      groupId: groupId,
    },
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });
};

export default useGroupDetail;
