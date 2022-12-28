import clsx from "clsx";
import React from "react";
// import CalendarItem from "./CalendarItem";
import SeasonRequestItem from "./SeasonRequestItem";

type Props = {};

const SeasonSidebarItem = (props: Props) => {
  return (
    <div className={clsx("h-full flex flex-col gap-y-2 justify-between")}>
      <div className={clsx("flex flex-col gap-y-4 transition-all")}>
        {/* <CalendarItem/> */}
        <h1 className="p-1 text-xl font-semibold">Season Requests</h1>

        <SeasonRequestItem
          hoe="Feysel Mubarek"
          group="Group 41"
          season="Camp G4"
        />
        <SeasonRequestItem
          hoe="Feysel Mubarek"
          group="Group 41"
          season="Camp G4"
        />
        <SeasonRequestItem
          hoe="Feysel Mubarek"
          group="Group 41"
          season="Camp G4"
        />
      </div>
    </div>
  );
};

export default SeasonSidebarItem;
