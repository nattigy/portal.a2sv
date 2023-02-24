import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import GroupComparisonChart from "../../../components/charts/GroupComparisonChart";
import BaseLayout from "../../../components/common/BaseLayout";
import { LoaderSmall } from "../../../components/common/Loaders";
import GroupContestProblems from "../../../components/contests/GroupContestProblems";
import GroupContestStat from "../../../components/contests/GroupContestStat";
import Leaderboard, {
  LeaderboardProps,
} from "../../../components/contests/Leaderboard";
import SingleContestProblems from "../../../components/contests/SingleContestProblems";
import SingleContestStat from "../../../components/contests/SingleContestStat";
import { authenticatedUser } from "../../../lib/constants/authenticated";
import WithPermission from "../../../lib/Guard/WithPermission";
import {
  useGetAllGroupContests,
  useGetContestDetailsForStudent,
  useGetSingleGroupContests,
} from "../../../lib/hooks/useContests";
import {
  ContestDetail,
  ContestProblem,
  ContestProblemsInfo,
  GroupContest,
  GroupContestDetail,
  ProblemsStat,
} from "../../../types/contest";
import { GraphqlUserRole } from "../../../types/user";

const IndexPage = () => {
  const contestUserList: Array<LeaderboardProps> = [
    {
      id: 1,
      name: "Hanna Samuel",
      photo: "/images/group-students-profile.svg",
      solved: 4,
      total: 4,
      time: "1:23:42",
    },
    {
      id: 2,
      name: "Kaleb Mesfin",
      photo: "/images/group-students-profile.svg",
      solved: 4,
      total: 4,
      time: "1:23:42",
    },
    {
      id: 3,
      name: "Emre Varol",
      photo: "/images/group-students-profile.svg",
      solved: 4,
      total: 4,
      time: "1:23:42",
    },
    {
      id: 4,
      name: "Yididiya Kebede",
      photo: "/images/group-students-profile.svg",
      solved: 4,
      total: 4,
      time: "1:23:42",
    },
    {
      id: 5,
      name: "Hanna Samuel",
      photo: "/images/group-students-profile.svg",
      solved: 4,
      total: 4,
      time: "1:23:42",
    },
    {
      id: 6,
      name: "Kaleb Mesfin",
      photo: "/images/group-students-profile.svg",
      solved: 4,
      total: 4,
      time: "1:23:42",
    },
    {
      id: 7,
      name: "Emre Varol",
      photo: "/images/group-students-profile.svg",
      solved: 4,
      total: 4,
      time: "1:23:42",
    },
    {
      id: 8,
      name: "Yididiya Kebede",
      photo: "/images/group-students-profile.svg",
      solved: 4,
      total: 4,
      time: "1:23:42",
    },
    {
      id: 9,
      name: "Hanna Samuel",
      photo: "/images/group-students-profile.svg",
      solved: 4,
      total: 4,
      time: "1:23:42",
    },
    {
      id: 10,
      name: "Kaleb Mesfin",
      photo: "/images/group-students-profile.svg",
      solved: 4,
      total: 4,
      time: "1:23:42",
    },
    {
      id: 11,
      name: "Emre Varol",
      photo: "/images/group-students-profile.svg",
      solved: 4,
      total: 4,
      time: "1:23:42",
    },
    {
      id: 12,
      name: "Yididiya Kebede",
      photo: "/images/group-students-profile.svg",
      solved: 4,
      total: 4,
      time: "1:23:42",
    },
    {
      id: 13,
      name: "Yididiya Kebede",
      photo: "/images/group-students-profile.svg",
      solved: 4,
      total: 4,
      time: "1:23:42",
    },
    {
      id: 14,
      name: "Yididiya Kebede",
      photo: "/images/group-students-profile.svg",
      solved: 4,
      total: 4,
      time: "1:23:42",
    },
    {
      id: 15,
      name: "Yididiya Kebede",
      photo: "/images/group-students-profile.svg",
      solved: 4,
      total: 4,
      time: "1:23:42",
    },
  ];
  const Sidebar: React.FC = () => {
    return (
      <div className="flex flex-col gap-y-4">
        <h1 className="font-semibold text-lg">LeaderBoard</h1>
        <Leaderboard contestStatus={contestUserList} />{" "}
      </div>
    );
  };

  const router = useRouter();
  const authUser = useReactiveVar(authenticatedUser);

  const [loadStudentContestDetail, { loading, data, error, refetch }] =
    useGetContestDetailsForStudent(
      (authUser as any).id,
      (router.query?.id as string) || ""
    );
  const [
    loadGroupContestDetail,
    {
      loading: groupLoading,
      data: groupData,
      error: groupError,
      refetch: groupRefetch,
    },
  ] = useGetSingleGroupContests(
    (authUser as any).groupId,
    router.query?.id as string
  );

  const [userContest, setUserContest] = useState<ContestDetail>();
  const [groupContest, setGroupContest] = useState<GroupContestDetail>();

  useEffect(() => {
    if ((authUser as any).role === GraphqlUserRole.STUDENT) {
      loadStudentContestDetail();
    } else {
      loadGroupContestDetail();
    }
  }, [
    authUser,
    groupRefetch,
    loadGroupContestDetail,
    loadStudentContestDetail,
    refetch,
  ]);

  useEffect(() => {
    if (data) {
      const fetchedContest = {
        ...data.userContest,
        totalProblems: data.userContest.totalProblems
          ? data.userContest.totalProblems
          : data.userContest.userContestProblems.length,
      };
      setUserContest(fetchedContest);
      console.log("Student");
    }
    if (groupData) {
      const fetchedContest = {
        ...groupData.groupContest,
        totalProblems: groupData.groupContest.totalProblems
          ? groupData.groupContest.totalProblems
          : groupData.groupContest.contest.problems.length,
        totalStudents: groupData.groupContest.totalStudents
          ? groupData.groupContest.totalStudents
          : groupData.groupContest.group.users?.length,
      };
      setGroupContest(fetchedContest);
    }
  }, [data, groupData]);

  return (
    <BaseLayout sidebar={<Sidebar />}>
      <div className="flex flex-col gap-y-4">
        <WithPermission
          allowedRoles={[
            GraphqlUserRole.HEAD_OF_EDUCATION,
            GraphqlUserRole.HEAD_OF_ACADEMY,
          ]}
        >
          <>
            {loading && (
              <div className="flex h-full items-center justify-center min-w-full min-h-full">
                <LoaderSmall />
              </div>
            )}
            {error && <p>Something went wrong</p>}
            {groupContest && (
              <>
                <div className="flex items-center gap-x-4">
                  <h1 className="font-bold text-2xl">
                    {groupContest.contest?.name}
                  </h1>
                  <span className="bg-white px-2 text-xs text-primary">
                    Div {groupContest?.contest?.div}
                  </span>
                </div>
                <GroupContestStat
                  rankItem={{
                    totalStudents: 0,
                    date: groupContest.contest.startTime,
                    timeDedicated: 0,
                    totalAttendance: groupContest.contestAttendance,
                    totalQuestions: groupContest.totalProblems,
                  }}
                />
                <div className="no-scrollbar w-full h-full flex flex-col  justify-between bg-white rounded-md p-6">
                  <div className="flex flex-col">
                    <h1 className="font-semibold">Group Comparsion</h1>
                  </div>
                  <div className="flex flex-row gap-x-3 items-end h-full">
                    {loading && (
                      <div className="flex items-center justify-center w-full">
                        <LoaderSmall />
                      </div>
                    )}
                    <div className="w-full h-full">
                      {/* {data && ( */}
                      <GroupComparisonChart />
                      {/* )} */}
                    </div>
                    {/* <ConsistencyDiagramItem /> */}
                  </div>
                </div>
                <div className="no-scrollbar w-full h-full flex flex-col  justify-between bg-white rounded-md p-6">
                  <div className="flex flex-col">
                    <h1 className="font-semibold">Problem Set</h1>
                  </div>
                  <div className="flex flex-row gap-x-3 items-end h-full">
                    {loading && (
                      <div className="flex items-center justify-center w-full">
                        <LoaderSmall />
                      </div>
                    )}
                    <GroupContestProblems
                      contestProblems={
                        groupContest.contest.problems as ContestProblemsInfo[]
                      }
                      problemsStat={groupContest.problemsStat as ProblemsStat[]}
                    />
                  </div>
                </div>
              </>
            )}
          </>
        </WithPermission>
        <WithPermission allowedRoles={[GraphqlUserRole.STUDENT]}>
          <>
            {loading && (
              <div className="flex h-full items-center justify-center min-w-full min-h-full">
                <LoaderSmall />
              </div>
            )}
            {error && <p>Something went wrong</p>}
            {userContest && (
              <>
                <div className="flex items-center gap-x-4">
                  <h1 className="font-bold text-2xl">
                    {userContest.contest?.name}
                  </h1>
                  <span className="bg-white px-2 text-xs text-primary">
                    Div {userContest?.contest?.div}
                  </span>
                </div>
                <SingleContestStat
                  rankItem={{
                    id: 1,
                    rank: userContest.rank,
                    totalStudents: 74,
                    solved: userContest.problemsSolved,
                    totalQuestions: userContest.totalProblems,
                    hour: Math.floor(userContest.timeSpent / 60),
                    minute: userContest.timeSpent % 60,
                    wrong: userContest.wrongSubmissions,
                  }}
                />
                <SingleContestProblems
                  contestProblems={
                    userContest.userContestProblems as ContestProblem[]
                  }
                />
              </>
            )}
          </>
        </WithPermission>
      </div>
    </BaseLayout>
  );
};

export default IndexPage;
