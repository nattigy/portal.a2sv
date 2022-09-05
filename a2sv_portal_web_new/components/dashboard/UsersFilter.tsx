import React from "react";
import UsersSearch from "./UsersSearch";
import { useState } from "react";

export type FilterItem = {
  title: string;
};
const filterItems: Array<FilterItem> = [
  {
    title: "All",
  },
  {
    title: "Head of Academy",
  },
  {
    title: "Head of Education",
  },
  {
    title: "Student",
  },
];

type Props = {
  handleTabChange: (idx: number) => void;
  handleModalOpen?: () => void;
  activeIndex: number;
};

const UsersFilter = (props: Props) => {
  return (
    <div className="flex flex-row bg-white rounded-sm w-full h-16 items-center gap-x-12 my-5">
      <UsersSearch />
      <div className="flex flex-1  gap-x-12 ">
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

      <div className="flex justify-end items-center px-5">
        <button
          onClick={props.handleModalOpen}
          className="flex justify-center items-center min-w-min px-6 py-3 text-sm font-semibold text-white bg-primary rounded-lg"
        >
          Add New User
        </button>
      </div>
    </div>
  );
};

export default UsersFilter;
