import { useReactiveVar } from "@apollo/client";
import clsx from "clsx";
import React from "react";
import { authenticatedUser } from "../../lib/constants/authenticated";
import { GraphqlUserRole } from "../../types/user";
import { ContestInfo } from "../dashboard/ContestRating";
import TopStudentsList from "./TopStudentsList";

type Props = {
  contestStanding: Array<ContestInfo>;
};

const ContestSidebarItem = (props: Props) => {
  const authUser = useReactiveVar(authenticatedUser);
  return (
    <div className={clsx("h-full flex flex-col justify-between")}>
      <div className={clsx("flex flex-col gap-y-2 transition-all")}>
        <div className="flex flex-col">
          <TopStudentsList contestStatus={props.contestStanding} />
        </div>
      </div>
      {(authUser as any).role === GraphqlUserRole.STUDENT && (
        <div className="flex flex-col">
          <img src="images/contest-page.svg" alt="" />
          <p className="text-center text-xs">
            Be Consistent to see yourself on the leaderboards.
          </p>
        </div>
      )}
      {(authUser as any).role === GraphqlUserRole.HEAD_OF_EDUCATION && (
        <div className="flex flex-col items-center gap-y-6">
          <img className="w-fit h-48" src="images/add-contest.svg" alt="" />
          <button className="flex flex-col items-center w-52 p-2 bg-primary text-white rounded-md">
            <p>+ Create New Contest</p>
          </button>
          <p className="text-center text-xs">
            Create new contest to see the status of your group students.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContestSidebarItem;
