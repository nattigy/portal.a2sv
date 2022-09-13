import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { TiGroupOutline } from "react-icons/ti";
import CustomLink from "./CustomLink";

type Props = {};

const StudentRoleSidebar = (props: Props) => {
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
              "w-6 h-6 hover:text-white ",
              activePath.includes("/topics") && "fill-current text-indigo-700 "
            )}
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M9,6 L21,6 M9,12 L21,12 M9,18 L17,18 M4,7 C4.55228475,7 5,6.55228475 5,6 C5,5.44771525 4.55228475,5 4,5 C3.44771525,5 3,5.44771525 3,6 C3,6.55228475 3.44771525,7 4,7 Z M4,13 C4.55228475,13 5,12.5522847 5,12 C5,11.4477153 4.55228475,11 4,11 C3.44771525,11 3,11.4477153 3,12 C3,12.5522847 3.44771525,13 4,13 Z M4,19 C4.55228475,19 5,18.5522847 5,18 C5,17.4477153 4.55228475,17 4,17 C3.44771525,17 3,17.4477153 3,18 C3,18.5522847 3.44771525,19 4,19 Z"
            />
          </svg>{" "}
        </a>
      </CustomLink>
      <CustomLink href="/contests">
        <a
          href="#"
          className={clsx(
            " flex items-center justify-center p-4 text-sm font-medium transition-all duration-200 fill-current text-gray-700 hover:text-white  hover:bg-indigo-600 group",
            activePath.includes("/contests") &&
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
              d="M12.7801 13.1238C12.8784 12.9308 13.0171 12.7576 13.1884 12.6143C13.3596 12.4709 13.5599 12.3603 13.7777 12.2888C13.9955 12.2173 14.2265 12.1863 14.4573 12.1976C14.6882 12.2089 14.9143 12.2622 15.1227 12.3546C15.5529 12.6031 15.891 12.9666 16.0921 13.3966C16.2931 13.8267 16.3475 14.303 16.2482 14.7623C16.2073 15.2139 15.9921 15.637 15.6418 15.9546C15.2914 16.2723 14.8292 16.4633 14.3391 16.4931M14.3391 16.4931V17.7931M11.4712 18.5623C13.9722 17.6931 16.4733 17.1777 19.1244 18.1546L19.6913 23.3623C18.9404 24.9351 17.8181 26.3333 16.4066 27.4547C14.2974 26.5663 12.6173 24.9915 11.6879 23.0316L11.4712 18.5623Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
            <path
              d="M12.7799 13.1226L11.5377 13.2303L12.3714 8.03028C12.1296 7.22259 11.1959 6.49181 10.8041 6.76874C9.22843 11.9765 7.66944 17.1919 7.38599 22.6996L1 29.8458C2.58399 30.0073 4.20133 30.2381 5.46019 29.8458L11.0042 25.7227C11.118 25.6208 11.2542 25.5426 11.4036 25.4934C11.553 25.4442 11.7121 25.4252 11.8701 25.4376C12.0282 25.45 12.1815 25.4935 12.3197 25.5652C12.458 25.637 12.578 25.7353 12.6715 25.8534L18.574 30.915C19.9996 31.1842 20.7416 30.7611 21 30.3304L17.6653 26.2457"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
            <path
              d="M12.3883 8.02994C13.172 8.11455 15.0728 8.79917 12.7051 6.59147C11.8381 5.7607 10.104 4.72223 10.821 6.7684"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
            <path
              d="M12.9969 6.88464L18.1907 3.18462L18.7826 1L16.0065 1.53846L12.1382 6.15387"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
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

export default StudentRoleSidebar;
