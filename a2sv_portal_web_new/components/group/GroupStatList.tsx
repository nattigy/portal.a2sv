import React from "react";
import GroupStatItem, { GropStatItemProps } from "./GroupStatItem";
const svgs: string[] = [
  "/icons/total-students.svg",
  "/icons/total-groups.svg",
  "/icons/total-hoe.svg",
  "/icons/country.svg",
  "/icons/location.svg",
];
const groupStats: GropStatItemProps[] = [
  { count: 182, name: "Total Students" },
  { count: 8, name: "Total Groups" },
  { count: 24, name: "Total HoE" },
  { count: 1, name: "Country" },
  { count: 2, name: "Location" },
];

const GroupStatList = () => {
  return (
    <div>
      <p className="font-semibold text-[#565656] text-lg">Overview</p>
      <div className="flex flex-row">
        {groupStats.map((item, index) => (
          <GroupStatItem {...item} path={svgs[index]} key={index} />
        ))}
      </div>
    </div>
  );
};

export default GroupStatList;
