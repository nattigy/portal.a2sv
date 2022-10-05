import React, { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import CustomDropdown, { CustomDropdownProps } from "../common/CustomDropdown";
import SearchField from "../common/SearchField";
import BaseLayout from "../common/BaseLayout";
import NewGroupModal from "../modals/NewGroupModal";
import GroupItemList from "./GroupItemList";
import GroupStatList from "./GroupStatList";

type Props = {};

const HOADashboard = (props: Props) => {
  const dropdown: CustomDropdownProps = {
    label: "Sort By:",
    options: ["Date Created", "Name"],
  };
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  return (
    <BaseLayout>
      {isModalOpen && <NewGroupModal onClose={() => setIsModalOpen(false)} />}
      <div className="w-full h-screen pt-7 flex flex-col gap-y-6">
        <GroupStatList />
        <div className="flex flex-row justify-between ">
          <div>
            <p className="text-[#565656] font-semibold">Groups</p>
            <p className="text-[#ACACAC] text-xs">
              Here‘s the list of all groups{" "}
            </p>
          </div>
          <div
            onClick={handleModalOpen}
            className="flex flex-row gap-x-1 cursor-pointer bg-[#5956E9] rounded-md items-center px-3"
          >
            <BsPlus color="#ffffff" size={18} />
            <p className="font-medium  text-white text-xs">New Group</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-y-5 w-full">
          <div className="col-span-9 flex flex-row justify-between">
            <SearchField
              onChange={() => {}}
              placeholder="Search a group"
              id="group-search"
            />
            <CustomDropdown customProps={dropdown} />
          </div>
          <div className="col-span-9">
            <GroupItemList />
          </div>
          <div className="col-span-3 w-full h-full ">
            <div className="flex flex-col items-center p-4 justify-center gap-y-2">
              <img src="/images/group-image.svg" className="" alt="" />
              <p className="text-[#ACACAC] justify-self-center text-xs">
                Here&apos;s the list of all groups
              </p>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default HOADashboard;
