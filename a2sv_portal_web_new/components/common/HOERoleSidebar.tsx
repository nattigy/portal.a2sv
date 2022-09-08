import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { TiGroupOutline } from "react-icons/ti";
import CustomLink from "./CustomLink";

type Props = {};

const HOERoleSidebar = (props: Props) => {
  const [activePath, setActivePath] = useState("");

  const router = useRouter();

  useEffect(() => {
    setActivePath(router.pathname);
  }, [router.pathname]);

  return (
    <nav className="flex-1 space-y-2">
      <CustomLink href="/dashboard">
        <a
          href="#"
          className={clsx(
            activePath.includes("/dashboard") &&
              "bg-indigo-100 text-indigo-700 border-r-4 border-indigo-700  fill-current  ",
            " flex items-center justify-center p-4 text-sm font-medium transition-all duration-200 fill-current text-gray-700 hover:text-white  hover:bg-indigo-600 group"
          )}
        >
          <svg
            className={clsx(
              "w-6 h-6 hover:text-white ",
              activePath.includes("/dashboard") &&
                "fill-current text-indigo-700 "
            )}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3zM11 3H3v10h8V3zm10 8h-8v10h8V11zm-10 4H3v6h8v-6z" />
          </svg>
        </a>
      </CustomLink>
      <CustomLink href="/topics">
        <a
          href="#"
          className={clsx(
            " flex items-center justify-center  p-4 text-sm font-medium transition-all duration-200 fill-current text-gray-700 hover:text-white  hover:bg-indigo-600 group",
            activePath.includes("/topics") &&
              "bg-indigo-100 text-indigo-700 border-r-4 border-indigo-700"
          )}
        >
          <svg
            className={clsx(
              "w-6 h-6 hover:text-white",
              activePath.includes("/topics") &&
                "fill-current text-indigo-700 "
            )}
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeWidth="2"
              d="M9,6 L21,6 M9,12 L21,12 M9,18 L17,18 M4,7 C4.55228475,7 5,6.55228475 5,6 C5,5.44771525 4.55228475,5 4,5 C3.44771525,5 3,5.44771525 3,6 C3,6.55228475 3.44771525,7 4,7 Z M4,13 C4.55228475,13 5,12.5522847 5,12 C5,11.4477153 4.55228475,11 4,11 C3.44771525,11 3,11.4477153 3,12 C3,12.5522847 3.44771525,13 4,13 Z M4,19 C4.55228475,19 5,18.5522847 5,18 C5,17.4477153 4.55228475,17 4,17 C3.44771525,17 3,17.4477153 3,18 C3,18.5522847 3.44771525,19 4,19 Z"
            />
          </svg>
        </a>
      </CustomLink>
      <CustomLink href="/users">
        <a
          href="#"
          className={clsx(
            " flex items-center justify-center p-4 text-sm font-medium transition-all duration-200 text-gray-700 hover:text-white  hover:bg-indigo-600 group",
            activePath.includes("/users") &&
              "bg-indigo-100 text-indigo-700 border-r-4 border-indigo-700"
          )}
        >
          <TiGroupOutline size={26} />
        </a>
      </CustomLink>
      <CustomLink href="/settings">
        <a
          href="#"
          className={clsx(
            " flex items-center justify-center p-4 text-sm font-medium transition-all duration-200 fill-current text-gray-700 hover:text-white  hover:bg-indigo-600 group",
            activePath.includes("/settings") &&
              "fill current bg-indigo-100 text-indigo-700 border-r-4 border-indigo-700",
            "hover:text-white "
          )}
        >
          <svg
            className={clsx(
              "w-6 h-6 hover:text-white ",
              activePath.includes("/settings") &&
                "fill-current text-indigo-700 ",
              "hover:text-white "
            )}
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.4288 7.98187C22.2258 9.12355 22.7651 10.4248 23.0094 11.7956H26V15.2044H23.0094C22.7651 16.5752 22.2258 17.8764 21.4288 19.0181L23.5444 21.1338L21.1338 23.5444L19.0181 21.4288C17.8764 22.2258 16.5752 22.7651 15.2044 23.0094V26H11.7956V23.0094C10.4248 22.7651 9.12355 22.2258 7.98187 21.4288L5.86625 23.5444L3.45562 21.1338L5.57125 19.0181C4.77421 17.8764 4.23488 16.5752 3.99062 15.2044H1V11.7956H3.99062C4.23488 10.4248 4.77421 9.12355 5.57125 7.98187L3.45562 5.86625L5.86625 3.45562L7.98187 5.57125C9.12355 4.77421 10.4248 4.23488 11.7956 3.99062V1H15.2044V3.99062C16.5752 4.23488 17.8764 4.77421 19.0181 5.57125L21.1338 3.45562L23.5444 5.86625L21.4288 7.98187V7.98187Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M13.5 16.625C14.3288 16.625 15.1237 16.2958 15.7097 15.7097C16.2958 15.1237 16.625 14.3288 16.625 13.5C16.625 12.6712 16.2958 11.8763 15.7097 11.2903C15.1237 10.7042 14.3288 10.375 13.5 10.375C12.6712 10.375 11.8763 10.7042 11.2903 11.2903C10.7042 11.8763 10.375 12.6712 10.375 13.5C10.375 14.3288 10.7042 15.1237 11.2903 15.7097C11.8763 16.2958 12.6712 16.625 13.5 16.625Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </CustomLink>
    </nav>
  );
};

export default HOERoleSidebar;
