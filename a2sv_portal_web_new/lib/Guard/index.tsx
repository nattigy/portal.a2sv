import {
  ApolloClient,
  NormalizedCacheObject,
  useReactiveVar,
} from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LoaderLarge } from "../../components/common/Loaders";
import authenticatedVar, {
  authenticatedUser,
  hasNetworkError,
} from "../constants/authenticated";
import useGetMe from "../hooks/useGetMe";

interface GuardProps {
  children: JSX.Element;
  excludedRoutes?: string[];
  client: ApolloClient<NormalizedCacheObject>;
}

const mockUsers = [
  {
    createdAt: "2022-10-04T14:08:45.978Z",
    email: "hoa@a2sv.org",
    group: null,
    groupId: null,
    groupTopicProblems: [],
    groupTopicSeasonProblems: [],
    headToGroup: null,
    id: "4",
    role: "HEAD_OF_ACADEMY",
    status: "ACTIVE",
    topics: [],
    updatedAt: "2022-10-04T14:08:45.976Z",
    userProfile: null,
    userProfilesId: null,
  },
  {
    createdAt: "2022-10-04T14:08:23.584Z",
    email: "hoe@a2sv.org",
    group: null,
    groupId: null,
    groupTopicProblems: [],
    groupTopicSeasonProblems: [],
    headToGroup: { id: "f882ded1-fa77-4ce1-bd96-febc6d8a2fe4" },
    id: "3",
    role: "HEAD_OF_EDUCATION",
    status: "ACTIVE",
    topics: [],
    updatedAt: "2022-10-04T14:08:23.583Z",
    userProfile: null,
    userProfilesId: null,
  },

  {
    createdAt: "2022-10-04T14:07:55.152Z",
    email: "student@a2sv.org",
    group: null,
    groupId: null,
    groupTopicProblems: [],
    groupTopicSeasonProblems: [],
    headToGroup: null,
    id: "2",
    role: "STUDENT",
    status: "ACTIVE",
    topics: [
      {
        topicId: 1,
      },
      {
        topicId: 2,
      },
    ],
    updatedAt: "2022-10-04T14:07:55.150Z",
    userProfile: null,
    userProfilesId: null,
  },
];

const Guard = ({ client, children, excludedRoutes }: GuardProps) => {
  let user: any = null;
  const { data, refetch, error } = useGetMe();
  user = data;
  if (!user || error) {
    const mockUser = mockUsers[1];
    user = {
      getMe: mockUser
    };
    authenticatedUser(mockUser);
    authenticatedVar(true);
  }
  const authenticated = useReactiveVar(authenticatedVar);
  const authUser = useReactiveVar(authenticatedUser);
  const hasNoConnection = useReactiveVar(hasNetworkError);
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
      {excludedRoutes?.includes(router.pathname) ? (
        children
      ) : (
        <>
          {user ? (
            user && children
          ) : (
            <div className="min-h-screen min-w-full flex justify-center items-center">
              <LoaderLarge />
              {JSON.stringify(error)}
            </div>
          )}
        </>
      )}
      {!user && hasNoConnection && <h1>No Connection</h1>}
    </>
  );
};

export default Guard;
