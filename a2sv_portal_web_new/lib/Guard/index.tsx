import {
  ApolloClient,
  NormalizedCacheObject,
  useReactiveVar,
} from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LoaderLarge } from "../../components/common/Loaders";
import NetworkErrorToaster from "../../components/modals/NetworkErrorToaster";
import authenticatedVar, {
  authenticatedUser,
  hasNetworkError,
} from "../constants/authenticated";
import useGetMe from "../hooks/useGetMe";
import ProtectedRoute from "./ProtectedRoute";
import Protected from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

interface GuardProps {
  children: JSX.Element;
  excludedRoutes?: string[];
  client: ApolloClient<NormalizedCacheObject>;
}

// const mockUsers = [
//   {
//     createdAt: "2022-10-04T14:08:45.978Z",
//     email: "hoa@a2sv.org",
//     group: null,
//     groupId: null,
//     groupTopicProblems: [],
//     groupTopicSeasonProblems: [],
//     headToGroup: null,
//     id: "4",
//     role: "HEAD_OF_ACADEMY",
//     status: "ACTIVE",
//     topics: [],
//     updatedAt: "2022-10-04T14:08:45.976Z",
//     userProfile: null,
//     userProfilesId: null,
//   },
//   {
//     createdAt: "2022-10-04T14:08:23.584Z",
//     email: "hoe@a2sv.org",
//     group: null,
//     groupId: null,
//     groupTopicProblems: [],
//     groupTopicSeasonProblems: [],
//     headToGroup: { id: "f882ded1-fa77-4ce1-bd96-febc6d8a2fe4" },
//     id: "3",
//     role: "HEAD_OF_EDUCATION",
//     status: "ACTIVE",
//     topics: [],
//     updatedAt: "2022-10-04T14:08:23.583Z",
//     userProfile: null,
//     userProfilesId: null,
//   },

//   {
//     createdAt: "2022-10-04T14:07:55.152Z",
//     email: "student@a2sv.org",
//     group: null,
//     groupId: "f882ded1-fa77-4ce1-bd96-febc6d8a2fe4",
//     groupTopicProblems: [],
//     groupTopicSeasonProblems: [],
//     headToGroup: null,
//     id: null,
//     role: "STUDENT",
//     status: "ACTIVE",
//     topics: [
//       {
//         topicId: 1,
//       },
//       {
//         topicId: 2,
//       },
//     ],
//     updatedAt: "2022-10-04T14:07:55.150Z",
//     userProfile: null,
//     userProfilesId: null,
//   },
// ];

const Guard = ({ client, children, excludedRoutes }: GuardProps) => {
  const { data: user, loading, refetch, error } = useGetMe();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      authenticatedVar(true);
      authenticatedUser(user?.getMe);
    } else {
      authenticatedVar(false);
    }
  }, [refetch, user]);

  if (loading || !router.isReady) {
    return (
      <div className="min-h-screen min-w-full flex justify-center items-center">
        <LoaderLarge />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <NetworkErrorToaster />
      {excludedRoutes?.includes(router.pathname) ? (
        <PublicRoute authUser={user?.getMe}>{children}</PublicRoute>
      ) : (
        <ProtectedRoute authUser={user?.getMe}>{children}</ProtectedRoute>
      )}
    </div>
  );
};

export default Guard;
