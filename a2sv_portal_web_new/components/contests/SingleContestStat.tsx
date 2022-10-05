import clsx from "clsx";
import React from "react";
import SingleContestStatItem from "./SingleContestStatItem";

export type ContestStatProps = {
  id: number;
  hour: number;
  minute: number;
  rank: number;
  totalStudents: number;
  wrong: number;
  solved: number;
  totalQuestions: number;
};

type Props = {
  rankItem: ContestStatProps;
};

const SingleContestStat = (props: Props) => {
  return (
    <div className="grid grid-cols-4 gap-x-8">
      <SingleContestStatItem
        rankItem={{
          color: "#5956E9",
          title: "Rank",
          content: (
            <div>
              <span className="text-2xl">{props.rankItem.rank}</span>
              <span className="text-sm">/{props.rankItem.totalStudents}</span>
            </div>
          ),
          id: 1,
        }}
      />
      <SingleContestStatItem
        rankItem={{
          color: "#FFCE31",
          title: "Total Time Spent",
          content: (
            <div className="flex gap-x-1">
              <div>
                <span className="text-2xl">{props.rankItem.hour}</span>
                <span className="text-sm">hr</span>
              </div>
              <div>
                <span className="text-2xl">{props.rankItem.minute}</span>
                <span className="text-sm">min</span>
              </div>
            </div>
          ),
          id: 2,
        }}
      />
      <SingleContestStatItem
        rankItem={{
          color: "#8A70D6",
          title: "Wrong Submissions",
          content: (
            <span className="text-2xl">{props.rankItem.wrong.toString()}</span>
          ),
          id: 3,
        }}
      />
      <SingleContestStatItem
        rankItem={{
          color: "#FFADAD",
          title: "Solved",
          content: (
            <span className="text-2xl">
              {props.rankItem.solved}/{props.rankItem.totalQuestions}
            </span>
          ),
          id: 4,
        }}
      />
    </div>
  );
};

export default SingleContestStat;
