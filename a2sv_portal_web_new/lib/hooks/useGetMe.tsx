import { useQuery } from "@apollo/client";
import { GET_ME_QUERY } from "../apollo/Queries/profileQueries";

const useGetMe = () => {
  return useQuery(GET_ME_QUERY, {
    errorPolicy: "all",
  });
};

export default useGetMe;
