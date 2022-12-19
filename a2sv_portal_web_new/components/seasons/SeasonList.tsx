import React, { useEffect, useState } from "react";
import { useGetGroupSeasons } from "../../lib/hooks/useSeasons";
import { Season } from "../../types/season";
import EmptyState from "../common/EmptyState";
import { LoaderSmall } from "../common/Loaders";
import SeasonItem from "./SeasonItem";

type SeasonListProps = {
  seasons: Season[];
};

const SeasonList = ({ seasons }: SeasonListProps) => {
  // useEffect(() => {
  //   if (data) {
  //     setseasons(data?.seasons);
  //   }
  // }, [groupId, data]);

  return(
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {seasons.map((item: any, index: number) => (
        <SeasonItem key={index} seasonProps={item} />
      ))}
    </div>)
};

export default SeasonList;
