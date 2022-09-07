import React from "react";
import { useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { authenticatedUser } from "../../lib/constants/authenticated";
import auth from "../../pages/auth";
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
];

type Props = {
  handleTabChange: (idx: number) => void;
  handleModalOpen?: () => void;
  activeIndex: number;
};

const DashboardFilter = (props: Props) => {
  const [filterSelected, setFilterSelected] = useState(0);
  const authUser = useReactiveVar(authenticatedUser);
  return (
    <div className="flex flex-row bg-white rounded-sm w-full h-16 items-center my-2 mb-4 px-5">
      <div className="flex flex-1 gap-x-6 ">
        {filterItems.map((item, index) => (
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
        ))}
      </div>
      {/* {(authUser as any).role !== GraphqlUserRole.STUDENT && (
        <div className="flex justify-end items-center px-5">
          <button
            onClick={props.handleModalOpen}
            className="flex justify-center items-center min-w-min px-6 py-3 text-sm font-semibold text-white bg-primary rounded-lg"
          >
            Add New Student
          </button>
        </div>
      )} */}
    </div>
  );
};

export default DashboardFilter;
