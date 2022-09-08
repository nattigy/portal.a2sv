import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HiOutlineNewspaper } from "react-icons/hi";
import { ImMakeGroup } from "react-icons/im";
import { TiGroupOutline } from "react-icons/ti";
import CustomLink from "./CustomLink";

type Props = {};

const HOARoleSidebar = (props: Props) => {
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
              "w-6 h-6 hover:text-white tooltip ",
              activePath.includes("/dashboard") &&
                "fill-current text-indigo-700 "
            )}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3zM11 3H3v10h8V3zm10 8h-8v10h8V11zm-10 4H3v6h8v-6z" />
          </svg>
          <span className="absolute hidden group-hover:flex -top-2 -right-3 translate-x-full w-48 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm before:content-[''] before:absolute before:top-1/2  before:right-[100%] before:-translate-y-1/2 before:border-8 before:border-y-transparent before:border-l-transparent before:border-r-gray-700">
            This is some extra useful information
          </span>
        </a>
      </CustomLink>
      <CustomLink href="/users">
        <a
          href="#"
          className={clsx(
            " flex items-center justify-center  p-4 text-sm font-medium transition-all duration-200 fill-current text-gray-700 hover:text-white  hover:bg-indigo-600 group",
            activePath.includes("/users") &&
              "bg-indigo-100 text-indigo-700 border-r-4 border-indigo-700"
          )}
        >
          <ImMakeGroup size={26} />
          {/* <svg
          className={clsx(
            "w-6 h-6 hover:text-white ",
            activePath.includes("/group") &&
            "fill-current text-indigo-700"
          )}
          viewBox="0 0 26 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.906 0.00448758C12.8637 0.0121243 12.822 0.0224791 12.781 0.0354876C12.5552 0.0860893 12.354 0.213411 12.2116 0.395757C12.0692 0.578102 11.9944 0.804188 12 1.03549V2.03549H3C2.20435 2.03549 1.44129 2.35156 0.87868 2.91417C0.31607 3.47678 0 4.23984 0 5.03549L0 18.0355C0 19.6915 1.344 21.0355 3 21.0355H12V21.4105L6.562 24.1295C6.32171 24.2455 6.13736 24.4523 6.0495 24.7042C5.96164 24.9562 5.97747 25.2327 6.0935 25.473C6.20953 25.7133 6.41627 25.8976 6.66822 25.9855C6.92018 26.0733 7.19671 26.0575 7.437 25.9415L12 23.6605V24.0355C12 24.3007 12.1054 24.5551 12.2929 24.7426C12.4804 24.9301 12.7348 25.0355 13 25.0355C13.2652 25.0355 13.5196 24.9301 13.7071 24.7426C13.8946 24.5551 14 24.3007 14 24.0355V23.6605L18.563 25.9415C18.8033 26.0575 19.0798 26.0733 19.3318 25.9855C19.5837 25.8976 19.7905 25.7133 19.9065 25.473C20.0225 25.2327 20.0384 24.9562 19.9505 24.7042C19.8626 24.4523 19.6783 24.2455 19.438 24.1295L14 21.4105V21.0355H23C24.656 21.0355 26 19.6915 26 18.0355V5.03549C26 4.23984 25.6839 3.47678 25.1213 2.91417C24.5587 2.35156 23.7956 2.03549 23 2.03549H14V1.03549C14.005 0.893285 13.9797 0.751643 13.9256 0.620024C13.8716 0.488404 13.79 0.369839 13.6865 0.272249C13.5829 0.17466 13.4597 0.100293 13.3251 0.054118C13.1905 0.00794282 13.0477 -0.00897747 12.906 0.00448758ZM2 5.03549H24V18.0355H2V5.03549ZM20.875 6.03549C20.651 6.05957 20.4417 6.15858 20.281 6.31649L17 9.59849L14.719 7.31549C14.6098 7.2034 14.4757 7.11852 14.3277 7.06767C14.1797 7.01682 14.0218 7.00143 13.8667 7.02274C13.7117 7.04404 13.5638 7.10144 13.435 7.19033C13.3061 7.27921 13.2 7.39709 13.125 7.53449L10.156 12.7225L8.937 9.65949C8.87781 9.50134 8.77953 9.36075 8.65132 9.25084C8.52312 9.14093 8.36918 9.06528 8.20384 9.03093C8.0385 8.99658 7.86716 9.00467 7.70579 9.05443C7.54443 9.10418 7.39828 9.194 7.281 9.31549L4.281 12.3155C4.18645 12.41 4.11143 12.5222 4.06024 12.6456C4.00904 12.7691 3.98267 12.9015 3.98262 13.0351C3.98257 13.1688 4.00886 13.3012 4.05997 13.4247C4.11108 13.5482 4.18601 13.6604 4.2805 13.755C4.37499 13.8495 4.48717 13.9246 4.61065 13.9758C4.73412 14.0269 4.86648 14.0533 5.00015 14.0534C5.13382 14.0534 5.26619 14.0271 5.3897 13.976C5.51321 13.9249 5.62545 13.85 5.72 13.7555L7.626 11.8495L9.064 15.4115C9.13187 15.5901 9.2495 15.7456 9.40298 15.8595C9.55645 15.9733 9.73934 16.0408 9.92999 16.054C10.1206 16.0671 10.3111 16.0254 10.4787 15.9337C10.6464 15.8419 10.7842 15.7041 10.876 15.5365L14.22 9.69249L16.282 11.7555C16.3753 11.852 16.487 11.9287 16.6105 11.9811C16.734 12.0335 16.8668 12.0605 17.001 12.0605C17.1352 12.0605 17.268 12.0335 17.3915 11.9811C17.515 11.9287 17.6267 11.852 17.72 11.7555L21.72 7.75549C21.878 7.60924 21.9845 7.41593 22.0238 7.20428C22.0631 6.99263 22.0331 6.77394 21.9382 6.58073C21.8433 6.38752 21.6885 6.23009 21.497 6.13186C21.3054 6.03363 21.0873 5.99983 20.875 6.03549Z"
            fill="currentColor"
          />
        </svg> */}
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
              stroke="#000"
              strokeLinecap="round"
              strokeWidth="2"
              d="M9,6 L21,6 M9,12 L21,12 M9,18 L17,18 M4,7 C4.55228475,7 5,6.55228475 5,6 C5,5.44771525 4.55228475,5 4,5 C3.44771525,5 3,5.44771525 3,6 C3,6.55228475 3.44771525,7 4,7 Z M4,13 C4.55228475,13 5,12.5522847 5,12 C5,11.4477153 4.55228475,11 4,11 C3.44771525,11 3,11.4477153 3,12 C3,12.5522847 3.44771525,13 4,13 Z M4,19 C4.55228475,19 5,18.5522847 5,18 C5,17.4477153 4.55228475,17 4,17 C3.44771525,17 3,17.4477153 3,18 C3,18.5522847 3.44771525,19 4,19 Z"
            />
          </svg>
        </a>
      </CustomLink>

      <CustomLink href="/contests">
        <a
          href="#"
          className={clsx(
            " flex items-center justify-center p-4 text-sm font-medium transition-all duration-200 text-gray-700 hover:text-white  hover:bg-indigo-600 group",
            activePath.includes("/contests") &&
              "bg-indigo-100 text-indigo-700 border-r-4 border-indigo-700"
          )}
        >
          <svg
            className={clsx(
              "w-6 h-6 hover:text-white fill-current",
              activePath.includes("/contests") && " text-indigo-700 "
            )}
            viewBox="0 0 22 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.7798 13.1229C12.8781 12.9298 13.0169 12.7566 13.1881 12.6133C13.3593 12.47 13.5596 12.3594 13.7774 12.2878C13.9952 12.2163 14.2262 12.1853 14.4571 12.1966C14.6879 12.2079 14.9141 12.2613 15.1225 12.3536C15.5527 12.6022 15.8908 12.9656 16.0918 13.3957C16.2928 13.8257 16.3473 14.302 16.2479 14.7613C16.2071 15.213 15.9919 15.636 15.6415 15.9537C15.2912 16.2713 14.8289 16.4624 14.3388 16.4921M14.3388 16.4921V17.7921M11.4709 18.5613C13.972 17.6921 16.473 17.1767 19.1241 18.1536L19.691 23.3614C18.9401 24.9342 17.8179 26.3323 16.4063 27.4537C14.2972 26.5653 12.6171 24.9905 11.6877 23.0306L11.4709 18.5613Z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.7799 13.1231L11.5377 13.2308L12.3714 8.03077C12.1296 7.22308 11.1959 6.4923 10.8041 6.76923C9.22843 11.9769 7.66944 17.1923 7.38599 22.7001L1 29.8462C2.58399 30.0078 4.20133 30.2385 5.46019 29.8462L11.0042 25.7231C11.118 25.6212 11.2542 25.5431 11.4036 25.4939C11.553 25.4447 11.7121 25.4257 11.8701 25.4381C12.0282 25.4505 12.1815 25.494 12.3197 25.5657C12.458 25.6375 12.578 25.7357 12.6715 25.8539L18.574 30.9155C19.9996 31.1847 20.7416 30.7616 21 30.3309L17.6653 26.2462"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M12.3881 8.03092C13.1717 8.11553 15.0725 8.80015 12.7049 6.59245C11.8378 5.76168 10.1038 4.72321 10.8207 6.76937"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.9966 6.88464L18.1905 3.18462L18.7824 1L16.0062 1.53846L12.1379 6.15387"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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

export default HOARoleSidebar;
