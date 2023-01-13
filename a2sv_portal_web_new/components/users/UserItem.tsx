import React, { useState } from "react";
import CustomLink from "../common/CustomLink";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GraphqlUserRole, UserRoleType } from "../../types/user";
import UserRoleChip from "./UserRoleChip";
import PromoteStudent from "../common/PromoteStudent";
import { useMutation, useReactiveVar } from "@apollo/client";
import { CHANGE_USER_ROLE } from "../../lib/apollo/Mutations/usersMutations";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import MenuItem from "../common/MenuItem";
import ChangeRoleModal from "../modals/ChangeRoleModal";
import { getSVGIcon } from "../../helpers/getSVGPath";
export type UserProps = {
  id: string;
  userProfile: {
    firstName: string;
    lastName: string;
  };
  email: string;
  role: GraphqlUserRole;
  createdAt: string;
  group: any;
  headToGroup: any;
  status: string;
  updatedAt: string;
};

const UserItem = ({ id, email, userProfile, group, role }: UserProps) => {
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div>
      {isModalOpen && (
        <ChangeRoleModal
          userId={id}
          role={role}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
      <div className="min-h-[90px] cursor-pointer gap-x-2 bg-white border flex items-center justify-start px-2 rounded-md">
        <img
          className="object-cover w-16 h-16 rounded-full"
          src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/vertical-menu/2/avatar-male.png"
          alt=""
        />

        <div className="flex flex-col flex-1 h-[60px] justify-evenly">
          <p className="text-[#565656] w-fit sm:w-36 md:w-44 lg:w-48 font-semibold text-xs truncate text-ellipsis">
            {userProfile
              ? userProfile.firstName + " " + userProfile.lastName
              : email}
          </p>
          <div className="flex flex-row items-center gap-x-2">
            <UserRoleChip role={role} />
            {group && (
              <div className="bg-primary/20 p-2 text-primary py-1 capitalize leading-wide font-semibold text-[10px] rounded-md">
                <h1>G{group.name.substring(group.name?.length - 2)}</h1>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-start items-start h-full py-2 ">
          <div className="w-full  relative">
            <div className="absolute bottom-1 right-2">
              {authUser.role === GraphqlUserRole.HEAD_OF_ACADEMY && (
                <MenuItem
                  color="black"
                  menuItems={[
                    {
                      title: "Change role",
                      onClick: (e: any) => {
                        e.stopPropagation();
                        setIsModalOpen(true);
                        // handlePromote();
                      },
                      icon: getSVGIcon("change_role"),
                    },
                    {
                      title: "Assign New Group",
                      onClick: (e: any) => {
                        e.stopPropagation();
                      },
                      icon: getSVGIcon("assign_new"),
                    },
                    {
                      title: "Remove From Group",
                      onClick: (e: any) => {
                        e.stopPropagation();
                      },
                      icon: getSVGIcon("remove_from_group"),
                    },
                    {
                      title: "Delete Student",
                      onClick: (e: any) => {
                        e.stopPropagation();
                      },
                      className: "text-red-500 group-hover:text-white",
                      color: "",
                      icon: getSVGIcon("delete"),
                    },
                  ]}
                />
              )}
            </div>
          </div>
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
    </div>
  );
};

export default UserItem;
