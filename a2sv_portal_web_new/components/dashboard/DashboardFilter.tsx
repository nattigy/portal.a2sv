import React from "react";
import { useReactiveVar } from "@apollo/client";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import { GraphqlUserRole } from "../../types/user";

export type FilterItem = {
  title: string;
};
const filterItems: Array<FilterItem> = [
  {
    title: "Stats",
  },
  {
    title: "Students",
  },
  {
    title: "Seasons",
  },
];

type Props = {
  handleTabChange: (idx: number) => void;
  handleModalOpen?: () => void;
  activeIndex: number;
};

const DashboardFilter = (props: Props) => {
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;

  return (
    <div className="flex flex-row bg-white rounded-sm w-full h-16 items-center my-2 mb-4 px-5">
      <div className="flex flex-1 gap-x-6 ">
        {filterItems.map((item, index) =>
          index == 2 && authUser.role !== GraphqlUserRole.HEAD_OF_ACADEMY ? (
            <></>
          ) : (
            <div key={index}>
              <button
                style={{
                  color: props.activeIndex == index ? "#565656" : "#9F9F9F",
                }}
                className="font-semibold text-xs"
                onClick={() => props.handleTabChange(index)}
              >
                {item.title}
              </button>
              {props.activeIndex == index && (
                <div className="h-0.5 w-full rounded-full bg-[#5956E9]"></div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DashboardFilter;
