import clsx from "clsx";
import React from "react";

export type RankItemProps = {
  id: number;
  name: string;
  color: string;
  standing: number;
  totalStudents: number;
};

type Props = {
  rankItem: RankItemProps;
};

const RankItem = (props: Props) => {
  return (
    <div
      style={{
        borderColor: props.rankItem.color,
      }}
      className={clsx("border-l-4 flex flex-row justify-center h-24")}
    >
      <div className="flex flex-col  w-full justify-center pl-4 bg-white font-medium">
        <h4 className="text-sm font-medium w-full">
          {`${props.rankItem.name}`} Rank
        </h4>
        <div>
          <span className="text-3xl">{props.rankItem.standing}</span>
          <span className="text-sm">{`/${props.rankItem.totalStudents}`}</span>
        </div>
      </div>
    </div>
  );
};

export default RankItem;
