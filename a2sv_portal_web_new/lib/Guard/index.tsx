import {
  ApolloClient,
  NormalizedCacheObject,
  useReactiveVar,
} from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LoaderLarge } from "../../components/common/Loaders";
import authenticatedVar, {
  authenticatedUser, hasNetworkError,
} from "../constants/authenticated";
import useGetMe from "../hooks/useGetMe";

interface GuardProps {
  children: JSX.Element;
  excludedRoutes?: string[];
  client: ApolloClient<NormalizedCacheObject>;
}

const Guard = ({ client, children, excludedRoutes }: GuardProps) => {
  const { data: user, refetch } = useGetMe();
  const authenticated = useReactiveVar(authenticatedVar);
  const authUser = useReactiveVar(authenticatedUser);
  const hasNoConnection = useReactiveVar(hasNetworkError)
  const router = useRouter();

  useEffect(() => {
    if (user) {
      authenticatedUser(user?.getMe);
    }
    if (authenticated && excludedRoutes?.includes(router.pathname)) {
      router.replace("/");
    }
    if (!excludedRoutes?.includes(router.pathname)) {
      refetch();
    }
  }, [authenticated, excludedRoutes, refetch, router, router.pathname, user]);

  useEffect(() => {
    const checkAuthenticated = async () => {
      if (!authenticated && !excludedRoutes?.includes(router.pathname)) {
        router.replace("/auth");
        await client.resetStore();
      }
    };
    checkAuthenticated();
  }, [authenticated, router, excludedRoutes, client]);

  return (
    <>
      {excludedRoutes?.includes(router.pathname) ? children : (
        <>
          {
            user ? user && children : <div className="min-h-screen min-w-full flex justify-center items-center">
              <LoaderLarge />
            </div>
          }
        </>
      )}
      {
        !user && hasNoConnection && (
          <h1>No Connection</h1>
        )
      }
    </>
  );
};

export default Guard;
