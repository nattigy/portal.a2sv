import React, { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import CustomDropdown, { CustomDropdownProps } from "../common/CustomDropdown";
import SearchField from "../common/SearchField";
import BaseLayout from "../common/BaseLayout";
import GroupItemList from "./GroupItemList";
import GroupStatList from "./GroupStatList";
import Button from "../common/Button";
import GroupModal from "../modals/GroupModal";
import WithPermission from "../../lib/Guard/WithPermission";
import { GraphqlUserRole } from "../../types/user";

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
      {isModalOpen && (
        <GroupModal isEditing={false} onClose={() => setIsModalOpen(false)} />
      )}
      <div className="w-full h-screen flex flex-col gap-y-2">
        <GroupStatList />
        <div className="flex flex-row justify-between ">
          <div>
            <p className="text-[#565656] font-semibold">Groups</p>
            <p className="text-[#ACACAC] text-xs">
              Here‘s the list of all groups{" "}
            </p>
          </div>
          <WithPermission allowedRoles={[GraphqlUserRole.HEAD_OF_ACADEMY]} >
            <Button
              icon={<BsPlus color="#ffffff" size={18} />}
              onClick={handleModalOpen}
              classname="bg-primary text-white text-xs"
              text="New Group"
            />
          </WithPermission>
        </div>

        <div className="grid grid-cols-12 gap-y-5 w-full">
          <div className="col-span-9 flex flex-row justify-between">
            <SearchField
              onChange={() => { }}
              placeholder="Search a group"
              id="group-search"
            />
            <CustomDropdown customProps={dropdown} />
          </div>
          <div className="col-span-12">
            <GroupItemList />
          </div>
          {/* <div className="hidden lg:block col-span-3 w-full h-full ">
            <div className="flex flex-col items-center p-4 justify-center gap-y-2">
              <img src="/images/group-image.svg" className="" alt="" />
              <p className="text-[#ACACAC] justify-self-center text-xs">
                Here&apos;s the list of all groups
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </BaseLayout>
  );
};

export default HOADashboard;
