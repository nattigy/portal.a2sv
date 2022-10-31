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
      {problems.map((problem, index) => {
        return (
          <ProblemsItem
            key={index}
            name={problem.name}
            difficulty={problem.difficulty}
            platform={problem.platform}
          />
        );
      })}
    </div>
  );
};

export default ProblemsList;
