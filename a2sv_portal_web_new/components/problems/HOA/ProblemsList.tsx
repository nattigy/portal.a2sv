import React, { useState } from "react";
import { ProblemType } from "../../../types/problems";
import { LoaderSmall } from "../../common/Loaders";
import ProblemsItem from "./ProblemsItem";

type Props = {
  problems: ProblemType[];
};

const ProblemsList = ({ problems }: Props) => {
  const [expanded, setExpanded] = useState<false | number>(false);

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
            problem={problem}
            index={index}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        );
      })}
    </div>
  );
};

export default ProblemsList;
