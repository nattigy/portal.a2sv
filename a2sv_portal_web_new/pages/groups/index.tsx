import React from "react";
import { BsPlus } from "react-icons/bs";
import CustomDropdown from "../../components/common/CustomDropdown";
import SearchField from "../../components/common/SearchField";
import GroupStatItem from "../../components/group/GroupStatItem";
import GroupStatList from "../../components/group/GroupStatList";

const index = () => {
  return (
    <div className="w-100 h-96 bg-slate-100 pt-7">
      <GroupStatList />
      <div className="flex flex-row justify-between">
        <div>
          <p className="text-[#565656] font-semibold">Groups</p>
          <p className="text-[#ACACAC] text-xs">
            Here‘s the list of all groups{" "}
          </p>
        </div>
        <div className="flex flex-row gap-x-1 bg-[#5956E9] rounded-md items-center px-2">
          <BsPlus color="#ffffff" size={18} />
          <p className="font-medium  text-white text-sm">New Group</p>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <SearchField placeholder="Search a group" id="group-search" />
        <CustomDropdown />
      </div>
    </div>
  );
};

export default index;
