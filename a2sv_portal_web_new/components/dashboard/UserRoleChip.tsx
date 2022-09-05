import clsx from "clsx";
import React from "react";
import { GraphqlUserRole } from "../../types/user";

type Props = {
  role: GraphqlUserRole;
};

const UserRoleChip = ({ role }: Props) => {
  const getRole = () => {
    switch (role) {
      case GraphqlUserRole.HEAD_OF_EDUCATIONS:
        return "HoE"
      case GraphqlUserRole.HEAD_OF_ACADEMY:
        return "HoA"
      case GraphqlUserRole.STUDENT:
        return "Student"
      default: {
        return role
      }
    }
  }
  return (
    <span
      className={clsx(
        "py-1 capitalize leading-wide font-semibold text-[10px] rounded-md",
        role === GraphqlUserRole.HEAD_OF_EDUCATIONS ? "bg-[#F28F8F2E] p-2 text-[#FFADAD]" : "",
        role === GraphqlUserRole.STUDENT
          ? "bg-[#ffdc601A] p-2 text-[#FFDC60]"
          : "",
        role === GraphqlUserRole.HEAD_OF_ACADEMY ? "bg-[#5CB85C30] p-2 text-[#5CB85C]" : "",
        role === GraphqlUserRole.ASSISTANT ? "bg-[#6e2bea30] p-2 text-[#6e2bea90]" : ""

      )}
    >
      {getRole()}
    </span>
  );
};

export default UserRoleChip;
