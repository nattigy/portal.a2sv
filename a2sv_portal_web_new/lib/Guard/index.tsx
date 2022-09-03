import { ApolloClient, NormalizedCacheObject, useReactiveVar } from "@apollo/client"
import { useRouter } from "next/router"
import { useEffect } from "react"
import authenticatedUser from "../../lib/constants/authenticated"
import useGetMe from "../hooks/useGetMe"

interface GuardProps {
    children: JSX.Element,
    excludedRoutes?: string[],
    client: ApolloClient<NormalizedCacheObject>
}

const Guard = ({ client, children, excludedRoutes }: GuardProps) => {
    const { data: user, refetch, error } = useGetMe()
    const authenticated = useReactiveVar(authenticatedUser)
    const router = useRouter()


    useEffect(() => {
        if (!excludedRoutes?.includes(router.pathname)) {
            // refetch()
        }
    }, [router.pathname])


    useEffect(() => {
        const checkAuthenticated = async () => {
            if (!authenticated && !excludedRoutes?.includes(router.pathname)) {
                await client.resetStore();
                router.push("/auth");
            }
        }
        checkAuthenticated()
    }, [authenticated, router, excludedRoutes])

    return (
        <>
            {
                excludedRoutes?.includes(router.pathname) ? (
                    children
                ) : (
                    authenticated && children
                )
            }
        </>
    )
}

export default Guard