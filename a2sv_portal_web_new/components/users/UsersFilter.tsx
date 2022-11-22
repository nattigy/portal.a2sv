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
    <div className="p-2 flex flex-col lg:flex-row md:justify-center  bg-white rounded-sm w-full md:h-full gap-x-2 md:my-5 sticky inset-x-0 top-0 left-0 ">
      <div className="w-full flex flex-1 marker: flex-col justify-start items-start ">
        <div className="flex h-full w-full my-2 flex-1 sm:gap-x-5 justify-around md:justify-center lg:gap-x-8 px-1 ">
          {filterItems.map((item, index) => (
            <div key={index} className=" h-full items-stretch  flex flex-col ">
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
        <ExpandableSearchInput
          placeholder="Search user "
          className="sm:ml-8 "
          onChange={(e: any) => {
            props.handleSearchUser(e.target.value);
          }}
        />
      </div>

      {(authUser as any).role !== GraphqlUserRole.STUDENT && (
        <div className="flex justify-end items-start ">
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
