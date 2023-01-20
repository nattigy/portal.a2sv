import React, { useEffect, useState } from "react";
import { Season } from "../../types/season";
import SeasonItem from "./SeasonItem";

type SeasonListProps = {
  seasons: Season[];
};

const SeasonList = ({ seasons }: SeasonListProps) => {


  return(
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {seasons.map((item: any, index: number) => (
        <SeasonItem key={index} seasonProps={item} />
      ))}
    </div>)
};

export default SeasonList;
