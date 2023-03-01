import { useReactiveVar } from "@apollo/client";
import clsx from "clsx";
import { useRouter } from "next/router";
import React from "react";
import { getSVGIcon } from "../../helpers/getSVGPath";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import { GraphqlUserRole } from "../../types/user";
import CustomLink from "./CustomLink";

type Props = {
  expanded: boolean;
};

const LeftSidebar = (props: Props) => {
  const router = useRouter();
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;

  const routes: any = {
    [GraphqlUserRole.HEAD_OF_ACADEMY]: [
      "/dashboard",
      "/seasons",
      "/repository",
      "/groups",
      "/users",
      "/contests",
    ],
    [GraphqlUserRole.HEAD_OF_EDUCATION]: [
      "/dashboard",
      "/seasons",
      "/groups",
      "/users",
      "/contests",
    ],
    [GraphqlUserRole.STUDENT]: [
      "/dashboard",
      "/seasons",
      "/groups",
      "/users",
      "/contests",
    ],
  };

  return (
    <nav className="flex-1 pt-6 p-1 space-y-2 duration-300">
      {routes[authUser.role]?.map((route: string, index: number) => {
        return (
          <CustomLink key={index} href={route}>
            <a
              className={clsx(
                "flex items-center origin-left duration-200 group fill-indigo-700  hover:bg-indigo-600 hover:fill-white hover:text-white text-sm font-medium gap-x-4 cursor-pointer p-2 rounded-md",
                router.pathname.includes(route)
                  ? "bg-indigo-100 fill-indigo-700 text-indigo-700"
                  : " fill-gray-700 ",
                router.pathname.includes(route) && props.expanded && "border-r-4 border-indigo-700 "
              )}
            >
              {getSVGIcon(route)}
              <span className={clsx("origin-left duration-200", !props.expanded && "hidden")}>
                {route.slice(1).charAt(0).toUpperCase() + route.slice(2)}
              </span>
            </a>
            {/* <a
              href="#"
              className={clsx(
                " flex items-center justify-center p-4 text-sm font-medium transition-all duration-200  group fill-indigo-700  hover:bg-indigo-600 hover:fill-white hover:text-white ",
                router.pathname.includes(route)
                  ? "bg-indigo-100 fill-indigo-700 text-indigo-700 border-r-4 border-indigo-700  "
                  : " fill-gray-700 "
              )}
            >
              {getSVGIcon(route)}
              <span className={clsx("", !props.expanded && "hidden")}>{route.slice(1).charAt(0).toUpperCase() + route.slice(2)}</span>
            </a> */}
          </CustomLink>
        );
      })}
    </nav>
  );
};

export default LeftSidebar;
