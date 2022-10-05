import { useQuery } from "@apollo/client";
import { GraphqlUserRole } from "../../types/user";
import { GET_ME_QUERY } from "../apollo/Queries/profileQueries";


const useGetMe = () => {
    return useQuery(GET_ME_QUERY, {
        errorPolicy: 'all',
        onCompleted: () => ({
            getMe: {
                id: 1,
                email: "kaleb@a2sv.org",
                name: "kaleb",
                role: GraphqlUserRole.HEAD_OF_EDUCATION,
                createdAt: "",
                group: {
                    id: 1,
                    name: "G-12",
                },
                groupId: 1,
                headToGroup: {
                    id: 1,
                    name: "G-31"
                },
                status: "active"
            }
        }),
        onError: () => ({
            getMe: {
                id: 1,
                email: "kaleb@a2sv.org",
                name: "kaleb",
                role: GraphqlUserRole.HEAD_OF_EDUCATION,
                createdAt: "",
                group: {
                    id: 1,
                    name: "G-12",
                },
                groupId: 1,
                headToGroup: {
                    id: 1,
                    name: "G-31"
                },
                status: "active"

            }
        })
    })
}

export default useGetMe