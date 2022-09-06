import React from "react";
import CustomLink from "../common/CustomLink";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GraphqlUserRole, UserRoleType } from "../../types/user";
import UserRoleChip from "./UserRoleChip";
export type UserProps = {
  id?: number;
  fullname: string;
  email: string;
  role: GraphqlUserRole;
  createdAt: string;
  group: any
  headToGroup: any
  status: string;
  updatedAt: string;
};

const UserItem = ({ email, role }: UserProps) => {
  return (
    <CustomLink href={`topics/fp/problems`}>
      <div className="min-h-[90px] cursor-pointer min-w-full bg-white border flex items-center justify-between gap-x-4 px-2 rounded-md">
        <div className="flex justify-between items-center gap-x-2 w-full">
          <img
            className="object-cover w-12 h-12 rounded-full"
            src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/vertical-menu/2/avatar-male.png"
            alt=""
          />
          <div className="flex flex-col flex-1 gap-y-2 w-full">
            <p className="text-[#565656] font-semibold text-xs">{email}</p>
            <div className="flex flex-row items-center justify-between w-full">
              <UserRoleChip role={role} />
              <div className="text-[#5956E9] text-[12px] font-semibold mx-2 justify-end">
                Details
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-start h-full py-2">
          <BsThreeDotsVertical
            color="#565656"
            size={14}
          />
        </div>

      </div>
      {/* <div className="border-2 overflow-hidden min-h-[90px] flex justify-start bg-white items-center cursor-pointer gap-x-2 rounded-md drop-shadow-sm px-5">
        <img
          className="object-cover w-12 h-12 rounded-full"
          src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/vertical-menu/2/avatar-male.png"
          alt=""
        />
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
          // className="mt-2 mr-2"
        />
      </div> */}
    </CustomLink>
  );
};

export default UserItem;
