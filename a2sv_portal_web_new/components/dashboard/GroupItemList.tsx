import React, { useEffect, useState } from "react";
import usePaginatedAllGroups from "../../lib/hooks/usePaginatedAllGroups";
// import useAllGroups from "../../lib/hooks/useAllGroups";
import EmptyState from "../common/EmptyState";
import { LoaderSmall } from "../common/Loaders";
import GroupItem from "./GroupItem";

const colors = ["#FFADAD", "#5956E9", "#FBC400"];
const url =
  "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

const GroupItemList = () => {
  const { data, loading, error, refetch } = usePaginatedAllGroups();
  // const { data, loading, error, refetch } = useAllGroups();

  let [groups, setGroups] = useState([]);
  useEffect(() => {
    if (data && data.groups.items) {
      const datas = data.groups.items.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          country: item.country,
          school: item.school,
          head: item.head,
          createdAt: item.createdAt,
          students: item.users,
          totalStudentsCount: item.pageInfo?.count,
        };
      });
      setGroups(datas);
    }
    // if (data && data.groups) {
    //   const datas = data.groups.map((group: any) => {
    //     return {
    //       groupId: group.id,
    //       groupName: group.name,
    //       groupLocation: group.country,
    //       createdAt: group.createdAt,
    //       studentsImage: [url, url, url],
    //       totalStudents: 120,
    //     };
    //   });
    //   setGroups(datas);
    // }
  }, [data, refetch]);

  console.log(groups);
  return loading ? (
    <div className="flex h-full items-center justify-center min-w-full min-h-full">
      <LoaderSmall />
    </div>
  ) : error ? (
    <p>Something went wrong</p>
  ) : data?.items?.length === 0 ? (
    <EmptyState />
  ) : (
    <div className=" w-full h-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-4">
      {groups &&
        groups.map((group: any, index: number) => (
          <GroupItem
            color={colors[index % colors.length]}
            groupProps={group}
            key={index}
          />
        ))}
    </div>
  );
};

export default GroupItemList;
