import React from "react";
import { IoMdSearch } from "react-icons/io";
import ExpandableSearchInput from "../common/ExpandableSearchInput";



const UsersSearch = () => {
  return (
    <ExpandableSearchInput placeholder="Search user " />
    // <div className="bg-[#F0F0F0]  rounded-md h-9 w-full flex justify-center items-center m-3">
    // <IoMdSearch size={24} color="#9F9F9F" className="" />
    // </div>
  );
};

export default UsersSearch;
