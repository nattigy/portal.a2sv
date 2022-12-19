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
                  router.pathname.includes(route) &&
                    "bg-indigo-100 text-indigo-700 border-r-4 border-indigo-700  fill-current  ",
                  " flex items-center justify-center p-4 text-sm font-medium transition-all duration-200 fill-current text-gray-700 hover:text-white  hover:bg-indigo-600 group"
                )}
              >
                <svg
                  className={clsx(
                    "w-6 h-6 hover:text-white",
                    router.pathname.includes(route) &&
                      "fill-current text-indigo-700 "
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
