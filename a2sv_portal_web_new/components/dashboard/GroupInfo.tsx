import React, { useEffect, useState } from "react";
import BaseLayout from "../common/BaseLayout";
import DashboardFilter from "./DashboardFilter";
import BarsStatComponent from "./StatComponent";
import StatSidebar from "./StatSidebar";
import StudentSidebar from "./StudentSidebar";
import GroupStudents from "./GroupStudents";
import { useRouter } from "next/router";
import useGroupDetail from "../../lib/hooks/useGroupDetail";
import { GroupStudentsSidebarProps } from "./GroupStudentsSidebarItem";
import { useReactiveVar } from "@apollo/client";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import SeasonSidebarItem from "../seasons/SeasonSidebarItem";
import SeasonList from "../seasons/SeasonList";
import { Season, SeasonType } from "../../types/season";
import StatComponent from "./StatComponent";
import CustomDropdown from "../common/CustomDropdown";

type Props = {
  groupId: string;
};

// const seasons: Array<Season> = [
//   {
//     id: "1",
//     name: "Camp 2021",
//     startDate:new Date(),
//     endDate:new Date(),
//     groupId:"1",
//     seasonType:SeasonType.CAMP

//   },
//   {
//     id: "2",
//     name: "Camp 2021",
//     startDate:new Date(),
//     endDate:new Date(),
//     groupId:"1",
//     seasonType:SeasonType.CAMP

//   },
//   {
//     id: "3",
//     name: "Camp 2021",
//     startDate:new Date(),
//     endDate:new Date(),
//     groupId:"1",
//     seasonType:SeasonType.CAMP

//   },

// ];

const GroupInfo = ({ groupId }: Props) => {
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;
  const [currentPath, setCurrentPath] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [isAddStudentToGroupSidebarOpen, setIsAddStudentToGroupSidebarOpen] =
    useState(false);

  const { data, loading, error, refetch } = useGroupDetail(groupId);
  const router = useRouter();
  useEffect(() => {
    setCurrentPath(groupId);
    refetch();
  }, [router.pathname]);

  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };
  const groupHeadData: GroupStudentsSidebarProps = {
    id: data?.group.head?.id,
    role: data?.group.head?.role,
    name: data?.group.head?.email,
    photo: "/images/group-students-profile.svg",
  };

  return (
    <BaseLayout
      sidebar={
        tabIndex == 0 ? (
          <StatSidebar />
        ) : tabIndex == 1 ? (
          <StudentSidebar
            groupId={groupId}
            showStudentList={isAddStudentToGroupSidebarOpen}
            groupHead={groupHeadData}
          />
        ) : (
          <SeasonSidebarItem />
        )
      }
    >
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
          <CustomDropdown
            customProps={{
              label: "",
              options: ["Camp 22", "Education 22", "Project 22"],
            }}
          />
        </div>
        <DashboardFilter
          handleTabChange={handleTabChange}
          activeIndex={tabIndex}
        />
        <div className="">
          {tabIndex == 0 && <StatComponent groupData={data} />}
          {tabIndex == 1 && (
            <GroupStudents
              groupId={groupId}
              groupData={data?.group}
              isAddStudentToGroupSidebarOpen={isAddStudentToGroupSidebarOpen}
              setIsAddStudentToGroupSidebarOpen={
                setIsAddStudentToGroupSidebarOpen
              }
            />
          )}
          {tabIndex == 2 && (
            <div>
              <SeasonList seasons={[]} />
            </div>
          )}
        </div>
        {/* )} */}
      </div>
    </BaseLayout>
  );
};

export default GroupInfo;
