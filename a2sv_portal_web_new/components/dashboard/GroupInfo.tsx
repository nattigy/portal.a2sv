import React, { ReactNode, useEffect, useState } from "react";
import BaseLayout from "../common/BaseLayout";
import DashboardFilter from "./DashboardFilter";
import StatComponent from "./StatComponent";
import StatSidebar from "./StatSidebar";
import StudentSidebar from "./StudentSidebar";
import GroupStudents from "./GroupStudents";
import router from "next/router";
import useGroupDetail from "../../lib/hooks/useGroupDetail";
import { GroupStudentsSidebarProps } from "./GroupStudentsSidebarItem";

type Props = {
  groupId: number;
};

const GroupInfo = (props: Props) => {
  const [currentPath, setCurrentPath] = useState<number>(0)
  const [tabIndex, setTabIndex] = useState(0);
  const [isAddStudentToGroupSidebarOpen, setIsAddStudentToGroupSidebarOpen] = useState(false)

  const { data, loading, error, refetch } = useGroupDetail(props.groupId)
  // router.query["id"]?.toString()
  console.log(data, " is group data users")
  useEffect(() => {
    // setCurrentPath(parseInt(router.query["id"]?.toString() || "1"))
    setCurrentPath(props.groupId)
    refetch()
  }, [router.pathname])
  //   const [loadUsers, { loading, data, error, refetch }] = useFilteredUsers(tabIndex);
  //     useEffect(() => {
  //       loadUsers();
  //     }, [tabIndex]);

  //     useEffect(() => {
  //       if (data) {
  //         console.log("data is ", data);
  //         setUsersData(data.users);
  //       }
  //     }, [refetch, data]);

  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };
  const groupHeadData : GroupStudentsSidebarProps = {
    id:data?.group.head.id,
    role:data?.group.head.role,
    name:data?.group.head.email,
    photo:"/images/group-students-profile.svg",

  }

  return (
    <BaseLayout sidebar={tabIndex == 0 ? <StatSidebar /> : <StudentSidebar groupId={props.groupId} showStudentList={isAddStudentToGroupSidebarOpen} groupHead={groupHeadData}/>}>
      <div className="flex flex-col relative">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <DashboardFilter
          handleTabChange={handleTabChange}
          activeIndex={tabIndex}
        />
        {/* {loading ? (
          <div className="w-full flex justify-center">
            <LoaderSmall color="#5956E9" />
          </div>
        ) : ( */}
        <div className="">
          {tabIndex == 0 && <StatComponent groupData={data} />}
          {tabIndex == 1 && <GroupStudents groupId={props.groupId} groupData={data?.group} isAddStudentToGroupSidebarOpen={isAddStudentToGroupSidebarOpen} setIsAddStudentToGroupSidebarOpen={setIsAddStudentToGroupSidebarOpen} />}
        </div>
        {/* )} */}
      </div>
    </BaseLayout>
  );
};

export default GroupInfo;
