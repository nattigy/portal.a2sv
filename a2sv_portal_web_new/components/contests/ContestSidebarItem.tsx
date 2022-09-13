import clsx from "clsx";
import React from "react";
import { ContestInfo } from "../dashboard/ContestRating";
import TopStudentsList from "./TopStudentsList";

type Props = {
  contestStanding: Array<ContestInfo>
};

const ContestSidebarItem = (props: Props) => {
  return (
    <div className={clsx("h-full flex flex-col justify-between")}>
      <div className={clsx("flex flex-col gap-y-2 transition-all")}>
        <div className="flex flex-col">
          <TopStudentsList contestStatus={props.contestStanding} />
        </div>
      </div>
      <div className="flex flex-col">
        <img src="images/contest-page.svg" alt="" />
        <p className="text-center text-xs">
          Be Consistent to see yourself on the leaderboards.
        </p>
      </div>
    </div>
  );
};

export default ContestSidebarItem;
