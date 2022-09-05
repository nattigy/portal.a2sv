import { ApolloClient, NormalizedCacheObject, useReactiveVar } from "@apollo/client"
import { useRouter } from "next/router"
import { useEffect } from "react"
import authenticatedVar, { authenticatedUser } from "../constants/authenticated"
import useGetMe from "../hooks/useGetMe"

interface GuardProps {
    children: JSX.Element,
    excludedRoutes?: string[],
    client: ApolloClient<NormalizedCacheObject>
}

const Guard = ({ client, children, excludedRoutes }: GuardProps) => {
    const { data: user, refetch } = useGetMe()
    const authenticated = useReactiveVar(authenticatedVar)
    const router = useRouter()

    // useEffect(() => {
    //     if (user) {
    //         authenticatedUser(user?.getMe)
    //     }
    //     if (authenticated && excludedRoutes?.includes(router.pathname)) {
    //         router.replace("/")
    //     }
    //     if (!excludedRoutes?.includes(router.pathname)) {
    //         refetch()
    //     }
    // }, [router.pathname])

    // useEffect(() => {
    //     const checkAuthenticated = async () => {
    //         if (!authenticated && !excludedRoutes?.includes(router.pathname)) {
    //             router.replace("/auth");
    //             await client.resetStore();
    //         }
    //     }
    //     checkAuthenticated()
    // }, [authenticated, router, excludedRoutes])

    return (
        <>
            {children}
            {/* {
                excludedRoutes?.includes(router.pathname) ? (
                    children
                ) : (
                    user && children
                )
            } */}
        </>
    )
}

export default Guard