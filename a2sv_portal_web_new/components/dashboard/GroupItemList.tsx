import React, { useEffect, useState } from "react";
import useAllGroups from "../../lib/hooks/useAllGroups";
import GroupItem, { GroupItemProps } from "./GroupItem";

const colors = ["#FFADAD", "#5956E9", "#FBC400"];
const url =
  "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

// let DUMMY_DATA: GroupItemProps[] = [
//   {
//     groupName: "Group 32",
//     groupLocation: "AAU, Addis Ababa",
//     createdAt: "Aug 22, 2022",
//     studentsImage: [url, url, url],
//     totalStudents: 120,
//   },
//   {
//     groupName: "Group 32",
//     groupLocation: "AAU, Addis Ababa",
//     createdAt: "Aug 22, 2022",
//     studentsImage: [url, url, url],
//     totalStudents: 120,
//   },
//   {
//     groupName: "Group 32",
//     groupLocation: "AAU, Addis Ababa",
//     createdAt: "Aug 22, 2022",
//     studentsImage: [url, url, url],
//     totalStudents: 120,
//   },
//   {
//     groupName: "Group 32",
//     groupLocation: "AAU, Addis Ababa",
//     createdAt: "Aug 22, 2022",
//     studentsImage: [url, url, url],
//     totalStudents: 120,
//   },
//   {
//     groupName: "Group 32",
//     groupLocation: "AAU, Addis Ababa",
//     createdAt: "Aug 22, 2022",
//     studentsImage: [url, url, url],
//     totalStudents: 120,
//   },
// ];

const GroupItemList = () => {
  const { data, loading, error, refetch } = useAllGroups()
  console.log(data, loading, error, " is fetching")
  let [groups, setGroups] = useState([])
  useEffect(() => {
    if (data && data.groups) {
      console.log("data is ", data)
      const datas = data.groups.map((group: any) => {
        return {
          groupId: group.id,
          groupName: group.name,
          groupLocation: group.country,
          createdAt: group.createdAt,
          studentsImage: [url, url, url],
          totalStudents: 120,
        }
      })
      setGroups(datas)
    }
  }, [data])

  return (
    <div className="grid grid-cols-3 gap-y-5">
      {
        loading ? (
          <h1>Loading</h1>
        ) : (
          groups && groups.map((item: GroupItemProps, index: number) => (
            <GroupItem
              color={colors[index % colors.length]}
              {...item}
              key={index}
            />
          ))
        )
      }
    </div>
  );
};

export default GroupItemList;
