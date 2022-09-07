import React, { ReactNode, useEffect, useState } from "react";
import BaseLayout from "../common/BaseLayout";
import DashboardFilter from "./DashboardFilter";
import StatComponent from "./StatComponent";
import StatSidebar from "./StatSidebar";
import StudentSidebar from "./StudentSidebar";
import GroupStudents from "./GroupStudents";
import router from "next/router";
import useGroupDetail from "../../lib/hooks/useGroupDetail";

type Props = {
  groupId: string;
};

const GroupInfo = (props: Props) => {
  const [currentPath, setCurrentPath] = useState<number>(0)
  const [tabIndex, setTabIndex] = useState(0);
  const [isAddStudentToGroupSidebarOpen, setIsAddStudentToGroupSidebarOpen] = useState(false)
  const { data, loading, error, refetch } = useGroupDetail(router.query["id"]?.toString())
    useEffect(() => {
        setCurrentPath(parseInt(router.query["id"]?.toString() || "1"))
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

  return (
    <BaseLayout sidebar={tabIndex == 0 ? <StatSidebar/> : <StudentSidebar showStudentList={isAddStudentToGroupSidebarOpen}/> }>
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
        <div>
          {tabIndex == 0 && <StatComponent groupData={data} />}
          {tabIndex == 1 && <GroupStudents groupData={data} isAddStudentToGroupSidebarOpen={isAddStudentToGroupSidebarOpen} setIsAddStudentToGroupSidebarOpen={setIsAddStudentToGroupSidebarOpen}/>}
        </div>
        {/* )} */}
      </div>
    </BaseLayout>
  );
};

export default GroupInfo;
