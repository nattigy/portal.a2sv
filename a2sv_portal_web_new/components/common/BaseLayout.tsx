import React, { ReactNode, useEffect, useState } from "react";
import { WithChildren } from "../../types/common";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import useLogout from "../../lib/hooks/useLogout";
import authenticatedVar, {
  authenticatedUser,
  hasNetworkError,
} from "../../lib/constants/authenticated";
import { useApollo } from "../../lib/apollo/apolloClient";
import { GraphqlUserRole } from "../../types/user";
import NetworkErrorToaster from "../modals/NetworkErrorToaster";
import SidebarLayout from "./SidebarLayout";
import LeftSidebar from "./LeftSidebar";
import SideNavigations from "./SideNavigations";
interface LayoutProps extends WithChildren {
  sidebar?: ReactNode;
}

const StudentLayout = ({ sidebar, children }: LayoutProps) => {
  const [activePath, setActivePath] = useState("");
  const authUser = useReactiveVar(authenticatedUser);

  const apolloClient = useApollo({});
  const [logout] = useLogout();
  const router = useRouter();

  useEffect(() => {
    setActivePath(router.pathname);
  }, [router.pathname]);

  const goToProfile = () => {
    router.push("/profile");
  };

  const handleLogout = async () => {
    try {
      await localStorage.clear();
      await logout({
        errorPolicy: "all",
        variables: {},
        onError: (error) => {},
        onCompleted: async () => {
          authenticatedUser({});
          authenticatedVar(false);
          router.replace("/auth");
          await apolloClient.resetStore();
        },
      });
    } catch (error) {
      authenticatedUser({});
      authenticatedVar(false);
      await apolloClient.resetStore();
    }
  };

  const SideNavigations = ({
    user,
  }: {
    user: {
      id: string;
      role: string;
      status: string;
      email: string;
    };
  }) => {
    const userRole: string = user.role;
    switch (userRole) {
      case GraphqlUserRole.STUDENT: {
        return (
          <LeftSidebar
            routes={[
              "/dashboard",
              "/seasons",
              "/users",
              "/contests",
              "/settings",
            ]}
          />
        );
      }
      case GraphqlUserRole.HEAD_OF_EDUCATION: {
        return (
          <LeftSidebar
            routes={[
              "/dashboard",
              "/seasons",
              "/users",
              "/contests",
              "/settings",
            ]}
          />
        );
      }
      case GraphqlUserRole.HEAD_OF_ACADEMY: {
        return (
          <LeftSidebar
            routes={[
              "/dashboard",
              "/seasons",
              "/problems",
              "/users",
              "/contests",
              "/settings",
            ]}
          />
        );
      }
      default: {
        return (
          <LeftSidebar
            routes={[
              "/dashboard",
              "/seasons",
              "/users",
              "/contests",
              "/settings",
            ]}
          />
        );
      }
    }
  };

  return (
    <div className="relative flex flex-1 bg-[#F6F6FC] min-h-screen max-h-screen overflow-hidden">
      <NetworkErrorToaster />
      <SideNavigations user={{
        id: "",
        role: "",
        status: "",
        email: ""
      }} />
      <main className="flex flex-col flex-1 min-h-screen max-h-screen no-scrollbar overflow-auto">
        <div className="bg-[#F6F6FC] p-2 max-w-full sm:px-5 md:px-8 h-full">
          {children}
          {/* <div className="flex lg:hidden">{sidebar}</div> */}
        </div>
      </main>
      {sidebar && <SidebarLayout sidebarItems={sidebar} />}
    </div>
  );
};

export default StudentLayout;
