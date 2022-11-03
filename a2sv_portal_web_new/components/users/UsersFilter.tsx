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
    <div className="p-2 flex flex-col lg:flex-row md:justify-center  bg-white rounded-sm w-full md:h-full gap-x-2 lg:gap-x-12 md:my-5 sticky inset-x-0 top-0 left-0 ">
      <div className="w-full flex flex-col  sm:flex-row lg:flex-col lg:justify-start lg:items-start ">

        <ExpandableSearchInput placeholder="Search user " className="sm:ml-10" onChange={(e: any) => {
          props.handleSearchUser(e.target.value)
        }} />
        <div className="flex h-full w-full my-2 flex-1 sm:gap-x-5 sm:px-10 sm:justify-center lg:gap-x-12 px-1 justify-between">
          {filterItems.map((item, index) => (
            <div key={index} className=" h-full items-stretch flex-1 flex flex-col ">
              <button
                style={{
                  color: props.activeIndex == index ? "#565656" : "#9F9F9F",
                }}
                className="h-full w-full md:font-semibold text-xs"
                onClick={() => props.handleTabChange(index)}
              >
                {item.title}
              </button>
              {props.activeIndex == index && (
                <div className="h-0.5 justify-end items-end rounded-full bg-primary"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {(authUser as any).role !== GraphqlUserRole.STUDENT && (
        <div className="flex justify-end items-center sm:px-5 mx-2">
          <button
            onClick={props.handleModalOpen}
            className="flex flex-none justify-center items-center py-2 text-xs font-semibold text-white bg-primary rounded-lg w-24 md:w-32"
          >
            Add New User
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersFilter;
