import React from "react";

export type ProblemProps = {
  name: String;
  difficulty: String;
  platform: String;
};

const ProblemsItem = (props: ProblemProps) => {
  return (
    <div className="flex flex-col">
      <h1>{props.name}</h1>
      <h1>{props.difficulty}</h1>
      <h1>{props.platform}</h1>
    </div>
  );
};

export default ProblemsItem;
