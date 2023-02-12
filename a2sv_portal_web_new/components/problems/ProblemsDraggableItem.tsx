import { format } from "date-fns";
import React from "react";
import { getIcon } from "../../helpers/getReactIcon";
import { ProblemType } from "../../types";
import { DifficultyChips } from "./DifficultyChips";

type Props = {
  problem: ProblemType;
  seasonId?: string;
  topicId?: string;
  group?: boolean;
};

const ProblemsDraggableItem = ({
  problem,
  seasonId,
  group,
  topicId,
}: Props) => {
  const dragStarted = (
    e: React.DragEvent<HTMLDivElement>,
    source: string,
    problemId: string
  ) => {
    e.dataTransfer.setData("problemId", problemId);
    e.dataTransfer.setData("problemSource", source);
  };
  return (
    <div
      draggable
      onDragStart={(e) => dragStarted(e, group ? "group" : "all", problem.id)}
      className="flex w-full gap-x-4 p-4 bg-white"
    >
      <a
        className="text-primary w-1/2"
        href={problem.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {problem.title}
      </a>
      <div className="w-1/6">
        <DifficultyChips status={problem.difficulty?.toUpperCase()} />
      </div>
      <div className="flex w-1/4 first-letter:items-center flex-row gap-x-2 capitalize">
        {getIcon(problem.platform?.toUpperCase())}
        {problem.platform.toLowerCase()}
      </div>{" "}
      {/* <div className="1/3">
        <h1> {format(new Date(problem.createdAt), "MMM dd yyyy")}</h1>
      </div> */}
    </div>
  );
};

export default ProblemsDraggableItem;
