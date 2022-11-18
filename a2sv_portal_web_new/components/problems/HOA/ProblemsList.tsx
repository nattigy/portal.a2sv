import React from "react";
import { LoaderSmall } from "../../common/Loaders";
import ProblemsItem, { ProblemProps } from "./ProblemsItem";

type Props = {
  problems: ProblemProps[];
};

const ProblemsList = ({ problems }: Props) => {
  return problems.length === 0 ? (
    <div className="w-full flex h-full items-center justify-center min-w-full min-h-full">
      <LoaderSmall />
    </div>
  ) : (
    <div>
      {/* <div className="flex items-center justify-between h-12 px-3 font-semibold hover:bg-gray-200">
        <div className="w-full grid grid-cols-4">
          <h1>title</h1>
          <h1>title</h1>
          <h1>title</h1>
          <h1>title</h1>
        </div>
      </div> */}
      {problems.map((problem, index) => {
        return (
          <ProblemsItem
            key={index}
            title={problem.title}
            difficulty={problem.difficulty}
            platform={problem.platform}
            createdAt={problem.createdAt}
            tags={problem.tags}
          />
        );
      })}
    </div>
  );
};

export default ProblemsList;
