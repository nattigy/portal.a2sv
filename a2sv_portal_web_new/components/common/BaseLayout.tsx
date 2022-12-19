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
  return (
    <div className="relative flex flex-1 bg-[#F6F6FC] min-h-screen max-h-screen overflow-hidden">
      <NetworkErrorToaster />
      <SideNavigations />
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
