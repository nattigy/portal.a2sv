import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useApollo } from "../../lib/apollo/apolloClient";
import authenticatedVar, {
  authenticatedUser,
  AuthUser,
} from "../../lib/constants/authenticated";
import useLogout from "../../lib/hooks/useLogout";
import { GraphqlUserRole } from "../../types/user";
import LeftSidebar from "./LeftSidebar";

const SideNavigations = () => {
  const apolloClient = useApollo({});
  const [logout] = useLogout();
  const router = useRouter();

  const authUser = useReactiveVar(authenticatedUser) as AuthUser;

  const goToProfile = () => {
    router.push("/profile");
  };

  const handleLogout = async () => {
    try {
      await localStorage.clear();
      authenticatedUser({});
      authenticatedVar(false);
      router.replace("/auth");
      await apolloClient.resetStore();
      // await logout({
      //   errorPolicy: "all",
      //   variables: {},
      //   onError: (error) => {},
      //   onCompleted: async () => {
      //     authenticatedUser({});
      //     authenticatedVar(false);
      //     router.replace("/auth");
      //     await apolloClient.resetStore();
      //   },
      // });
    } catch (error) {
      authenticatedUser({});
      authenticatedVar(false);
      await apolloClient.resetStore();
    }
  };

  const SidebarItems = () => {
    switch (authUser.role) {
      case GraphqlUserRole.STUDENT: {
        return (
          <LeftSidebar
            routes={[
              "/dashboard",
              "/groups",
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
              // "/dashboard",
              // "/groups",
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
              "/groups",

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
              "/groups",
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
    <div className="w-16 sm:w-20 md:w-24 md:flex-col justify-between">
      <div className="min-h-full flex flex-col  flex-grow py-5 overflow-y-auto bg-white">
        <div className="flex justify-center items-center">
          <div className="border flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary">
            <svg
              width="20"
              height="23"
              viewBox="0 0 20 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.981 5.2742C9.61765 6.09955 9.26345 6.90401 8.9098 7.70846C8.11138 9.52525 7.31296 11.3426 6.51454 13.1594C6.10104 14.1 5.67245 15.0338 5.27566 15.9818C4.75219 17.2325 3.40711 17.1828 2.737 16.3874C2.32512 15.8987 2.29817 15.327 2.54939 14.748C3.07341 13.5407 3.60982 12.3391 4.14138 11.1353C5.63633 7.74631 7.12858 4.35676 8.62676 0.969476C9.11412 -0.132127 10.1249 -0.150769 10.7217 0.207393C11.0366 0.396642 11.2458 0.688143 11.3956 1.02823C11.9067 2.18802 12.4145 3.35007 12.9278 4.50873C14.8955 8.95129 16.8654 13.3933 18.8342 17.8353C19.1712 18.5957 19.5076 19.3561 19.8435 20.117C20.1297 20.7644 20.0154 21.5248 19.5647 21.9773C18.9367 22.6078 17.9463 22.549 17.3878 21.8508C17.253 21.6819 17.1528 21.4937 17.0649 21.2949C15.7462 18.3098 14.4249 15.3253 13.1046 12.3408C12.0884 10.0422 11.0732 7.74348 10.0581 5.44481C10.0365 5.39735 10.015 5.3499 9.981 5.2742Z"
                fill="white"
              />
              <path
                d="M2.95701 20.8281C2.95701 21.6851 2.29822 22.3743 1.47931 22.376C0.658252 22.3772 -0.000538778 21.6806 3.3064e-07 20.8123C0.000539439 19.9542 0.659869 19.2655 1.47931 19.2661C2.30685 19.2667 2.95755 19.9548 2.95701 20.8281Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        <div className="px-4 mt-6">
          <hr className="border-gray-200" />
        </div>

        <div className="min-h-full flex flex-col flex-1 mt-6">
          <div className="flex-1 h-full space-y-4">{<SidebarItems />}</div>

          <div className="pb-4 flex flex-col gap-y-5 items-center justify-center">
            <button
              onClick={goToProfile}
              type="button"
              className="flex w-8 h-8 items-center justify-center text-sm font-medium text-gray-700 transition-all duration-200 rounded-lg hover:bg-gray-100"
            >
              <img
                className="object-cover w-full h-full rounded-full"
                src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/vertical-menu/2/avatar-male.png"
                alt=""
              />
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-8 h-8 rounded-full items-center justify-center text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100"
            >
              <svg
                className="fill-current text-red-700"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.9167 25H10.4167C9.86417 25 9.33427 24.8119 8.94357 24.477C8.55287 24.1421 8.33337 23.6879 8.33337 23.2143V20.5357H10.4167V23.2143H22.9167V1.78571H10.4167V4.46429H8.33337V1.78571C8.33337 1.31211 8.55287 0.85791 8.94357 0.523023C9.33427 0.188137 9.86417 0 10.4167 0H22.9167C23.4692 0 23.9991 0.188137 24.3898 0.523023C24.7805 0.85791 25 1.31211 25 1.78571V23.2143C25 23.6879 24.7805 24.1421 24.3898 24.477C23.9991 24.8119 23.4692 25 22.9167 25Z"
                  fill="#D72B2B"
                />
                <path
                  d="M11.0312 16.5984L14.7604 13.3931H0V11.6074H14.7604L11.0312 8.40199L12.5 7.14307L18.75 12.5002L12.5 17.8574L11.0312 16.5984Z"
                  fill="#D72B2B"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavigations;
