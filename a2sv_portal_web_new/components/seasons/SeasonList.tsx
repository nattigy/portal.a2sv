import React from "react";
import { useGetGroupSeasons } from "../../lib/hooks/useSeasons";
import { Season } from "../../types/season";
import EmptyState from "../common/EmptyState";
import { LoaderSmall } from "../common/Loaders";
import SeasonItem from "./SeasonItem";

type SeasonListProps = {
  groupId: string;
};

const SeasonList = ({ groupId }: SeasonListProps) => {
  const { data, loading, error } = useGetGroupSeasons(groupId);

  return !groupId ? (
    <div className="h-full flex items-center">
      <EmptyState />
    </div>
  ) : loading ? (
    <div className="w-full flex h-full items-center justify-center min-w-full min-h-full">
      <LoaderSmall />
    </div>
  ) : error ? (
    <p>Something went wrong</p>
  ) : data?.seasons?.items.length == 0 ? (
    <EmptyState />
  ) : (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {data?.seasons?.items?.map((item: any, index: number) => (
        <SeasonItem key={index} seasonProps={item} />
      ))}
    </div>
  );
};

export default SeasonList;
