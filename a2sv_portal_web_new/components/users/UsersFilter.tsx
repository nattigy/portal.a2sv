import React from "react";
import UsersSearch from "./UsersSearch";
import { useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { authenticatedUser } from "../../lib/constants/authenticated";
import auth from "../../pages/auth";
import { GraphqlUserRole } from "../../types/user";
import ExpandableSearchInput from "../common/ExpandableSearchInput";

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
  handleSearchUser: (query: string) => void;
};

const UsersFilter = (props: Props) => {
  const authUser = useReactiveVar(authenticatedUser);
  return (
    <div className="p-2 flex flex-col md:flex-row bg-white rounded-sm w-full md:h-16 items-start gap-x-12 md:my-5 sticky inset-x-0 top-0 left-0 ">
      <ExpandableSearchInput placeholder="Search user " onChange={(e: any) => {
        props.handleSearchUser(e.target.value)
      }} />
      <div className="flex justify-around w-full my-2 flex-1 sm:gap-x-5 sm:px-10 sm:justify-center md:gap-x-12 px-2 ">
        {filterItems.map((item, index) => (
          <div key={index}>
            <button
              style={{
                color: props.activeIndex == index ? "#565656" : "#9F9F9F",
              }}
              className="md:font-semibold text-xs"
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
      {(authUser as any).role !== GraphqlUserRole.STUDENT && (
        <div className="flex justify-end items-center px-5  self-end">
          <button
            onClick={props.handleModalOpen}
            className="flex flex-none justify-center items-center py-2 text-xs font-semibold text-white bg-primary rounded-lg w-28 md:w-32"
          >
            Add New User
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersFilter;
