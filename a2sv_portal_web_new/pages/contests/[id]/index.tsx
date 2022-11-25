import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BaseLayout from "../../../components/common/BaseLayout";
import { LoaderSmall } from "../../../components/common/Loaders";
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
} from "../../../lib/hooks/useAllContests";
import { ContestDetail, ContestProblem, GroupContest, GroupContestDetail } from "../../../types/contest";
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
  ] = useGetAllGroupContests((authUser as any).groupId, (router.query?.id as string) || "");

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
      console.log("Student")
    }
    if (groupData) {
      const fetchedContest = groupData.groupContests.items;
      setGroupContest(fetchedContest);
      console.log("Group")
    }
  }, [data]);

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
            <div className="flex items-center gap-x-4">
              <h1 className="font-bold text-2xl">{groupContest?.contest.name}</h1>
              {/* <span className="bg-white px-2 text-xs text-primary">
                Div {div}
              </span> */}
            </div>
            <SingleContestStat
              rankItem={{
                id: 1,
                rank: 3,
                totalStudents: 74,
                solved: 3,
                totalQuestions: 4,
                hour: 2,
                minute: 30,
                wrong: 3,
              }}
            />
            {/* <SingleContestProblems problemSolvedProps /> */}
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
                    Div {userContest.contest?.div}
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
