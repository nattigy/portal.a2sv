import React, { useState } from "react";
import BaseLayout from "../../components/common/BaseLayout";
import ContestSidebarItem from "../../components/contests/ContestSidebarItem";
import PreviousContestsItem, {
  ContestDetail,
} from "../../components/contests/PreviousContestsItem";
import UpcomingContestItem, {
  UpcomingContests,
} from "../../components/contests/UpcomingContestItem";
import { ContestInfo } from "../../components/dashboard/ContestRating";

const IndexPage = () => {
  const contests: Array<ContestDetail> = [
    {
      id: 1,
      title: "A2SV G3 01",
      div: 2,
      attended: true,
      solved: 3,
      totalQuestion: 5,
      date: "Something",
      timeSpent: "Something",
    },
    {
      id: 2,
      title: "A2SV G3 01",
      div: 2,
      attended: true,
      solved: 4,
      totalQuestion: 5,
      date: "Something",
      timeSpent: "Something",
    },
    {
      id: 3,
      title: "A2SV G3 01",
      div: 1,
      attended: true,
      solved: 1,
      totalQuestion: 5,
      date: "Something",
      timeSpent: "Something",
    },
    {
      id: 4,
      title: "A2SV G3 01",
      div: 2,
      attended: false,
      solved: 0,
      totalQuestion: 5,
      date: "Something",
      timeSpent: "-",
    },
    {
      id: 5,
      title: "A2SV G3 01",
      div: 3,
      attended: true,
      solved: 4,
      totalQuestion: 5,
      date: "Something",
      timeSpent: "Something",
    },
  ];

  const upcomingContests: Array<UpcomingContests> = [
    {
      id: 1,
      name: "A2SV G3 01",
      div: 2,
      date: "Saturday 3:30LT",
    },
    {
      id: 2,
      name: "A2SV G3 01",
      div: 2,
      date: "Saturday 9:30LT",
    },
    {
      id: 3,
      name: "A2SV G3 01",
      div: 1,
      date: "Sunday 3:30LT",
    },
  ];

  const contestUserList: Array<ContestInfo> = [
    {
      id: 1,
      name: "Hanna Samuel",
      photo: "/images/group-students-profile.svg",
      solved: 24,
      total: 26,
      contestRating: 1854,
      currentRank: 1,
      previousRank: 3,
    },
    {
      id: 2,
      name: "Kaleb Mesfin",
      photo: "/images/group-students-profile.svg",
      solved: 23,
      total: 26,
      contestRating: 1829,
      currentRank: 2,
      previousRank: 2,
    },
    {
      id: 3,
      name: "Emre Varol",
      photo: "/images/group-students-profile.svg",
      solved: 22,
      total: 26,
      contestRating: 1811,
      currentRank: 3,
      previousRank: 1,
    },
    {
      id: 4,
      name: "Yididiya Kebede",
      photo: "/images/group-students-profile.svg",
      solved: 20,
      total: 26,
      contestRating: 1786,
      currentRank: 4,
      previousRank: 4,
    },
  ];

  const Sidebar: React.FC = () => {
    return (
      <div className="flex flex-col h-full">
        <div className="mx-3 mb-2 font-semibold text-md text-[#565656]">
          <h1 className="font-semibold text-lg">Top Students</h1>
        </div>
        <ContestSidebarItem contestStanding={contestUserList} />
      </div>
    );
  };

  return (
    <BaseLayout sidebar={<Sidebar />}>
      <div className="flex flex-col gap-y-4">
        <h1 className="font-bold text-2xl">Contest</h1>
        <UpcomingContestItem upcomingContests={upcomingContests} />
        <PreviousContestsItem contests={contests} />
      </div>
    </BaseLayout>
  );
};

export default IndexPage;
