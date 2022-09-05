import React from "react";
import CustomLink from "../common/CustomLink";
import { BsThreeDotsVertical } from "react-icons/bs";
import { UserRoleType } from "../../types/user";
import UserRoleChip from "./UserRoleChip";
export type UserProps = {
  id?: number;
  fullname: string;
  email: string;
  role: UserRoleType;
  createdAt: string;
  group: any
  headToGroup: any
  status: string;
  updatedAt: string;
};

const UserItem = ({ email, role }: UserProps) => {
  return (
    <CustomLink href={`topics/fp/problems`}>
      <div className="h-[76px] flex w-56 bg-white items-center cursor-pointer gap-x-2 rounded-sm drop-shadow-sm">
        <img
          className="object-cover w-12 h-12 rounded-full ml-3"
          src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/vertical-menu/2/avatar-male.png"
          alt=""
        />
        <div className="flex flex-row justify-between w-full items-start h-full">
          <div className="flex flex-col justify-center w-full my-auto">
            <p className="text-[#565656] font-semibold text-xs">{email}</p>
            <div className="flex flex-row items-center justify-between">
              <UserRoleChip role={role} />
              <div className="text-[#5956E9] text-[10px] font-semibold">
                Details
              </div>
            </div>
          </div>
          <BsThreeDotsVertical
            color="#565656"
            size={14}
            className="mt-2 mr-2"
          />
        </div>
      </div>
    </CustomLink>
  );
};

export default UserItem;
