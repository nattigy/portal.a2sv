import React from "react";
import UsersSearch from "./UsersSearch";
import { useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { authenticatedUser } from "../../lib/constants/authenticated";
import auth from "../../pages/auth";
import { GraphqlUserRole } from "../../types/user";
import ExpandableSearchInput from "../common/ExpandableSearchInput";
import { Menu } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";

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
    <div className="p-2 flex flex-col lg:flex-row md:justify-center bg-white rounded-sm w-full md:h-full gap-x-2 md:my-5 sticky inset-x-0 top-0 left-0 z-20">
      <div className="w-full flex flex-1 marker: flex-col justify-start items-start ">
        <div className="flex flex-1 w-full justify-between items-center">
          <div className="flex h-full sm:gap-x-5 lg:gap-x-7 px-2 mr-2 items-center">
            <ExpandableSearchInput
              placeholder="Search user "
              className="mx-2"
              onChange={(e: any) => {
                props.handleSearchUser(e.target.value);
              }}
            />
            {filterItems.map((item, index) => (
              <div
                key={index}
                className="hidden md:flex flex-col  h-full items-stretch"
              >
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

            <div className="flex flex-col md:hidden h-full text-[#838383]">
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center gap-x-2 text-xs">
                  {filterItems[props.activeIndex].title}
                  <FaChevronDown />
                </Menu.Button>
                <Menu.Items className="flex flex-col z-20 bg-white absolute left-0 w-52 rounded-md">
                  {filterItems.map((item, index) => (
                    <Menu.Item as="div" className="w-full h-8 pl-6" key={index}>
                      {({ active }) => (
                        <button
                          style={{
                            color: active ? "#565656" : "#9F9F9F",
                          }}
                          className="h-full w-full text-start md:font-semibold text-sm"
                          onClick={() => props.handleTabChange(index)}
                        >
                          {item.title}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
            </div>
          </div>
          {(authUser as any).role !== GraphqlUserRole.STUDENT && (
            <div className="flex justify-end items-start float-right ">
              <button
                onClick={props.handleModalOpen}
                className="flex flex-none justify-center items-center py-2 text-xs font-semibold text-white bg-primary rounded-lg w-24 md:w-32"
              >
                Add New User
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersFilter;
