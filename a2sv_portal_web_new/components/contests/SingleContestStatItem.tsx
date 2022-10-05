import clsx from "clsx";
import React from "react";

export type ContestRankItemProps = {
  id: number;
  color: string;
  title: string;
  content: any;
};

type Props = {
  rankItem: ContestRankItemProps;
};

const SingleContestStatItem = (props: Props) => {
  return (
    <div
      style={{
        borderColor: props.rankItem.color,
      }}
      className={clsx("border-l-4 flex flex-row justify-center h-20")}
    >
      <div className="flex flex-col w-full justify-center pl-4 gap-y-2 bg-white font-medium">
        <h4 className="text-xs font-semibold w-full">{props.rankItem.title}</h4>
        <div>
          <span className="text-3xl">{props.rankItem.content}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleContestStatItem;
