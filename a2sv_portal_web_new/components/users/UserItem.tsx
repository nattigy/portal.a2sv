import React from "react";
import CustomLink from "../common/CustomLink";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GraphqlUserRole, UserRoleType } from "../../types/user";
import UserRoleChip from "./UserRoleChip";
import PromoteStudent from "../common/PromoteStudent";
import { useMutation, useReactiveVar } from "@apollo/client";
import { PROMOTE_USER_TO_HOE_MUTATION } from "../../lib/apollo/Mutations/usersMutations";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
export type UserProps = {
  id: number;
  fullname: string;
  email: string;
  role: GraphqlUserRole;
  createdAt: string;
  group: any;
  headToGroup: any;
  status: string;
  updatedAt: string;
};

const UserItem = ({ id, email, role }: UserProps) => {
  const [promoteStudent, { loading, data }] = useMutation(
    PROMOTE_USER_TO_HOE_MUTATION
  );
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;

  const handlePromote = async () => {
    await promoteStudent({
      variables: {
        updateUserInput: {
          id: parseInt(id?.toString()),
          role: GraphqlUserRole.HEAD_OF_EDUCATION,
        },
      },
      refetchQueries: "active",
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {},
      onError: (error) => {},
    });
  };

  return (
    <div>
      <div className="min-h-[90px] cursor-pointer gap-x-2 bg-white border flex items-center justify-start px-2 rounded-md">
        <img
          className="object-cover w-12 h-12 rounded-full"
          src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/vertical-menu/2/avatar-male.png"
          alt=""
        />

        <div className="flex flex-col flex-1 gap-y-2 w-4/6">
          <p className="text-[#565656] font-semibold text-xs truncate text-ellipsis ">
            {email}
          </p>
          <div className="flex flex-row items-center justify-between">
            <UserRoleChip role={role} />
            {/* <CustomLink href={`users/${id}`}> */}
            <div className="text-[#5956E9] text-[12px] font-semibold mx-2 justify-end">
              Details
            </div>
            {/* </CustomLink> */}
          </div>
        </div>
        <div className="flex justify-start items-start h-full py-2 ">
          {authUser.role === GraphqlUserRole.HEAD_OF_ACADEMY &&
            role === GraphqlUserRole.STUDENT && (
              <PromoteStudent onClick={handlePromote} />
            )}
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
