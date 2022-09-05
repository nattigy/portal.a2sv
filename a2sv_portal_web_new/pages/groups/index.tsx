import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import CustomDropdown from "../../components/common/CustomDropdown";
import SearchField from "../../components/common/SearchField";
import StudentLayout from "../../components/common/StudentLayout";
import GroupItem from "../../components/group/GroupItem";
import GroupItemList from "../../components/group/GroupItemList";
import GroupStatItem from "../../components/group/GroupStatItem";
import GroupStatList from "../../components/group/GroupStatList";
import NewGroupModal from "../../components/modals/NewGroupModal";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  return (
    <StudentLayout>
      {isModalOpen && (
        <NewGroupModal onClose={() => setIsModalOpen(false)} />
      )}
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

        <div className="grid grid-cols-6 gap-y-10">
          <div className="col-span-4 flex flex-row justify-between">
            <SearchField placeholder="Search a group" id="group-search" />
            <CustomDropdown />
          </div>
          <div className="col-span-4">
            <GroupItemList />
          </div>
          <div className="col-span-2 grid justify-items-stretch">
            <img
              src="/images/group-image.svg"
              className="justify-self-center w-60 h-60"
              alt=""
            />
            <p className="text-[#ACACAC] justify-self-center text-xs">
              Here&apos;s the list of all groups
            </p>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Index;
