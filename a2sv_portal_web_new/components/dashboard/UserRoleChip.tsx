import clsx from "clsx";
import React from "react";
import { UserRoleType } from "../../types/user";

type Props = {
  role: UserRoleType;
};

const UserRoleChip = ({ role }: Props) => {
  return (
    <span
      className={clsx(
        "py-1 capitalize leading-wide font-semibold text-[10px] rounded-md",
        role === UserRoleType.HOE ? "bg-[#F28F8F2E] p-2 text-[#FFADAD]" : "",
        role === UserRoleType.STUDENT
          ? "bg-[#ffdc601A] p-2 text-[#FFDC60]"
          : "",
        role === UserRoleType.HOA ? "bg-[#5CB85C30] p-2 text-[#5CB85C]" : ""
      )}
    >
      {role}
    </span>
  );
};

export default UserRoleChip;
