import clsx from "clsx";
import React from "react";
import CalendarItem from "./CalendarItem";

type Props = {};

const SeasonSidebarItem = (props: Props) => {
  return (
    <div className={clsx("h-full flex flex-col gap-y-2 justify-between")}>
      <div className={clsx("flex flex-col gap-y-2 transition-all")}>
        <CalendarItem />
      </div>
    </div>
  );
};

export default SeasonSidebarItem;
