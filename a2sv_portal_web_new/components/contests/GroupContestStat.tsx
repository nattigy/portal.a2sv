import clsx from "clsx";
import { format } from "date-fns";
import React from "react";
import ContestStatItem from "./ContestStatItem";

export type GroupContestStatProps = {
  totalAttendance: number;
  totalStudents: number;
  timeDedicated: number;
  totalQuestions: number;
  date: string;
};

type Props = {
  rankItem: GroupContestStatProps;
};

const GroupContestStat = (props: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ContestStatItem
        rankItem={{
          color: "#5956E9",
          title: "Total Attended",
          content: (
            <div>
              <span className="text-2xl">{props.rankItem.totalAttendance}</span>
              <span className="text-sm">/{props.rankItem.totalStudents}</span>
            </div>
          ),
        }}
      />
      <ContestStatItem
        rankItem={{
          color: "#FFCE31",
          title: "Time Dedicated",
          content: (
            <div className="flex gap-x-1">
              <div>
                <span className="text-2xl">
                  {Math.floor(props.rankItem.timeDedicated / 60)}
                </span>
                <span className="text-sm">hr</span>
              </div>
              <div>
                <span className="text-2xl">
                  {props.rankItem.timeDedicated % 60}
                </span>
                <span className="text-sm">min</span>
              </div>
            </div>
          ),
        }}
      />
      <ContestStatItem
        rankItem={{
          color: "#8A70D6",
          title: "Questions",
          content: (
            <span className="text-2xl">{props.rankItem.totalQuestions}</span>
          ),
        }}
      />
      <ContestStatItem
        rankItem={{
          color: "#FFADAD",
          title: "Date",
          content: (
            <span className="text-2xl">
              {format(new Date(props.rankItem.date), "MMM dd yyyy")}
            </span>
          ),
        }}
      />
    </div>
  );
};

export default GroupContestStat;
