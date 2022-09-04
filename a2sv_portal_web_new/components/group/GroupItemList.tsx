import React from "react";
import GroupItem, { GroupItemProps } from "./GroupItem";

const colors = ["#FFADAD", "#5956E9", "#FBC400"];
const url =
  "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

const DUMMY_DATA: GroupItemProps[] = [
  {
    groupName: "Group 32",
    groupLocation: "AAU, Addis Ababa",
    createdAt: "Aug 22, 2022",
    studentsImage: [url, url, url],
    totalStudents: 120,
  },
  {
    groupName: "Group 32",
    groupLocation: "AAU, Addis Ababa",
    createdAt: "Aug 22, 2022",
    studentsImage: [url, url, url],
    totalStudents: 120,
  },
  {
    groupName: "Group 32",
    groupLocation: "AAU, Addis Ababa",
    createdAt: "Aug 22, 2022",
    studentsImage: [url, url, url],
    totalStudents: 120,
  },
  {
    groupName: "Group 32",
    groupLocation: "AAU, Addis Ababa",
    createdAt: "Aug 22, 2022",
    studentsImage: [url, url, url],
    totalStudents: 120,
  },
  {
    groupName: "Group 32",
    groupLocation: "AAU, Addis Ababa",
    createdAt: "Aug 22, 2022",
    studentsImage: [url, url, url],
    totalStudents: 120,
  },
];

const GroupItemList = () => {
  return (
    <div className="grid grid-cols-3 gap-y-5">
      {DUMMY_DATA.map((item, index) => (
        <GroupItem
          color={colors[index % colors.length]}
          {...item}
          key={index}
        />
      ))}
    </div>
  );
};

export default GroupItemList;
