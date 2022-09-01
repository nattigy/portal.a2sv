import React from "react";
import RankItem, { RankItemProps } from "./RankItem";

export type UserRankProps = {
  name: string;
};

const rank: Array<RankItemProps> = [
  {
    id: 1,
    color: "#FFDC60",
    name: "Daily",
    standing: 3,
    totalStudents: 65,
  },
  {
    id: 2,
    color: "#D72B2B",
    name: "Weekly",
    standing: 3,
    totalStudents: 65,
  },
  {
    id: 3,
    color: "#5956E9",
    name: "Monthly",
    standing: 3,
    totalStudents: 65,
  },
  {
    id: 4,
    color: "#F28F8F",
    name: "All time",
    standing: 3,
    totalStudents: 65,
  },
];

// const UserRank = (props: UserRankProps) => {
const UserRank = () => {
  return (
    <div>
      <div className="flex flex-col items-center h-44 relative rounded-t-xl">
        <div className="relative h-28 w-full flex justify-center rounded-t-xl">
          <img src="/images/rank-profile-bg.svg" alt="" className="h-full w-full object-cover rounded-t-xl" />
          <img src="/images/rank-profile.svg" className="absolute top-1/2 w-28 h-28" alt="" />
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center m-2 my-4">
          <p className="font-semibold">Yididya Kebede</p>
          <p className="font-medium">yididiyakebede@gmail.com</p>
        </div>
        <div className="grid grid-cols-2 gap-y-4">
          <RankItem rankItem={rank[0]} />
          <RankItem rankItem={rank[1]} />
          <RankItem rankItem={rank[2]} />
          <RankItem rankItem={rank[3]} />
        </div>
      </div>
    </div>
  );
};

export default UserRank;
