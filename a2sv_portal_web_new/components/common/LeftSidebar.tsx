import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getSVGIcon } from "../../helpers/getSVGPath";
import CustomLink from "./CustomLink";

type Props = {
  routes: string[];
};

const LeftSidebar = (props: Props) => {
  const router = useRouter();

  return (
    <nav className="flex-1 space-y-2">
      <>
        {props.routes.map((route, index) => {
          return (
            <CustomLink key={index} href={route}>
              <a
                href="#"

                className={clsx(
                  " flex items-center justify-center p-4 text-sm font-medium transition-all duration-200  group fill-indigo-700  hover:bg-indigo-600 hover:fill-white ",
                  router.pathname.includes(route) ?
                    "bg-indigo-100 fill-indigo-700 text-indigo-700 border-r-4 border-indigo-700  " : " fill-gray-700 ",
                )}
              >
                <svg

                  className={clsx(
                    "w-6 h-6 group-hover:text-white ",
                  )}
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {getSVGIcon(route)}
                </svg>
              </a>
            </CustomLink>
          );
        })}
      </>
    </nav>
  );
};

export default LeftSidebar;
