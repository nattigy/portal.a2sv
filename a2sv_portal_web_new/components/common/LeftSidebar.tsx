import { useReactiveVar } from "@apollo/client";
import clsx from "clsx";
import { useRouter } from "next/router";
import React from "react";
import { getSVGIcon } from "../../helpers/getSVGPath";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import { GraphqlUserRole } from "../../types/user";
import CustomLink from "./CustomLink";

type Props = {
};

const LeftSidebar = (props: Props) => {
  const router = useRouter();
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;

  const routes: any = {
    [GraphqlUserRole.HEAD_OF_ACADEMY]: [
      "/dashboard",
      "/seasons",
      "/groups",
      "/users",
      "/contests",
      "/settings",
    ],
    [GraphqlUserRole.HEAD_OF_EDUCATION]: [
      "/dashboard",
      "/seasons",
      "/groups",
      "/users",
      "/contests",
      "/settings",
    ],
    [GraphqlUserRole.STUDENT]: [
      "/dashboard",
      // "/problems",
      "/groups",
      "/users",
      "/contests",
      "/settings",
    ]
  }

  return (
    <nav className="flex-1 space-y-2">
      {routes[authUser.role]?.map((route: string, index: number) => {
        return (
          <CustomLink key={index} href={route}>
            <a
              href="#"
              className={clsx(
                " flex items-center justify-center p-4 text-sm font-medium transition-all duration-200  group fill-indigo-700  hover:bg-indigo-600 hover:fill-white hover:text-white ",
                router.pathname.includes(route) ?
                  "bg-indigo-100 fill-indigo-700 text-indigo-700 border-r-4 border-indigo-700  " : " fill-gray-700 ",
              )}
            >
              {getSVGIcon(route)}
            </a>
          </CustomLink>
        );
      })}
    </nav>
  );
};

export default LeftSidebar;
