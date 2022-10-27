import React, { ReactNode, useEffect, useState } from "react";
import BaseLayout from "../common/BaseLayout";
import DashboardFilter from "./DashboardFilter";
import StatComponent from "./StatComponent";
import StatSidebar from "./StatSidebar";
import StudentSidebar from "./StudentSidebar";
import GroupStudents from "./GroupStudents";
import { useRouter } from "next/router";
import useGroupDetail from "../../lib/hooks/useGroupDetail";
import { GroupStudentsSidebarProps } from "./GroupStudentsSidebarItem";
import { useReactiveVar } from "@apollo/client";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import { GraphqlUserRole } from "../../types/user";
import SeasonsTab from "./SeasonsTab";
import SeasonSidebarItem from "../seasons/SeasonSidebarItem";
import SeasonItem, { SeasonItemProps } from "../seasons/SeasonItem";
import SeasonList from "../seasons/SeasonList";

type Props = {
  groupId: number;
};

const seasons: Array<SeasonItemProps> = [
  {
    seasonId: 1,
    seasonName: "Camp 2021",
    seasonDescription: "Description about the season",
    students: [],
  },
  {
    seasonId: 2,
    seasonName: "Camp 2021",
    seasonDescription: "Description about the season",
    students: [],
  },
  {
    seasonId: 3,
    seasonName: "Camp 2021",
    seasonDescription: "Description about the season",
    students: [],
  },
];


const GroupInfo = (props: Props) => {
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;
  const [currentPath, setCurrentPath] = useState<number>(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [isAddStudentToGroupSidebarOpen, setIsAddStudentToGroupSidebarOpen] =
    useState(false);

  const { data, loading, error, refetch } = useGroupDetail(props.groupId);
  const router = useRouter();
  useEffect(() => {
    setCurrentPath(props.groupId);
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
            groupId={props.groupId}
            showStudentList={isAddStudentToGroupSidebarOpen}
            groupHead={groupHeadData}
          />
        ) : (
          <SeasonSidebarItem/>
        )
      }
    >
      <div className="flex flex-col relative">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <DashboardFilter
          handleTabChange={handleTabChange}
          activeIndex={tabIndex}
        />
        <div className="">
          {tabIndex == 0 && <StatComponent groupData={data} />}
          {tabIndex == 1 && (
            <GroupStudents
              groupId={props.groupId}
              groupData={data?.group}
              isAddStudentToGroupSidebarOpen={isAddStudentToGroupSidebarOpen}
              setIsAddStudentToGroupSidebarOpen={
                setIsAddStudentToGroupSidebarOpen
              }
            />
          )}
          {tabIndex == 2 && (
            <div>
              <SeasonList seasons={seasons}/>
            </div>
          )}
        </div>
        {/* )} */}
      </div>
    </BaseLayout>
  );
};

export default GroupInfo;
