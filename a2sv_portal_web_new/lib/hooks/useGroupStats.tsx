import { useQuery } from "@apollo/client";
import { GET_SINGLE_GROUP_STATS } from "../apollo/Queries/groupsQueries";

const useGroupStatsDetail = (groupId: string) => {
    return useQuery(GET_SINGLE_GROUP_STATS, {
        variables: {
            groupId: groupId,
        },
        errorPolicy: "all",
        notifyOnNetworkStatusChange: true,
    });
};

export default useGroupStatsDetail;
