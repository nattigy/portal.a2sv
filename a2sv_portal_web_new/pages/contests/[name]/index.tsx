import { useRouter } from "next/router";
import React, { useState } from "react";
import BaseLayout from "../../../components/common/BaseLayout";
import Leaderboard, {
  LeaderboardProps,
} from "../../../components/contests/Leaderboard";
import SingleContestProblems from "../../../components/contests/SingleContestProblems";
import SingleContestStat from "../../../components/contests/SingleContestStat";

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
  const name = router.query["name"] || "";
  const div = parseInt(router.query["div"]?.toString() || "1");

  return (
    <BaseLayout sidebar={<Sidebar />}>
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <h1 className="font-bold text-2xl">{name}</h1>
          <span className="bg-white px-2 text-xs text-primary">Div {div}</span>
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
        <SingleContestProblems problemSolvedProps />
      </div>
    </BaseLayout>
  );
};

export default IndexPage;
