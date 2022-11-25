import React from "react";
import { LoaderSmall } from "../common/Loaders";
import MonthlyConsistency from "./MonthlyConsistency";
type Props = {
  series: Array<any>;
};

const CustomConsistencyChart = (props: Props) => {
  return (
    <div className="w-full px-2 flex h-60 gap-x-2 overflow-x-scroll overflow-y-visible items-center bg-[rgba(89, 86, 233, 0.05)] py-5 bg-primary/5 no-scrollbar">
      {props.series.map((data, index) => {
        return (
          <div
            key={index + data}
            className="flex gap-2 flex-col items-center border-blue-700"
          >
            <MonthlyConsistency data={data} />
            <h2 className="">{data.name}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default CustomConsistencyChart;
