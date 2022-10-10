import React from "react";
import SeasonItem, { SeasonItemProps } from "./SeasonItem";

type SeasonListProps = {
  seasons: Array<SeasonItemProps>;
};

const SeasonList = (props: SeasonListProps) => {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-x-6">
      {props.seasons?.map((season: any, index: number) => (
        <SeasonItem key={index} seasonProps={season} />
      ))}
    </div>
  );
};

export default SeasonList;
