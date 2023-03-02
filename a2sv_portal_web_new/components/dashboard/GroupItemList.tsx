import { ApolloError } from "@apollo/client";
import React, { useEffect, useState } from "react";
import usePaginatedAllGroups from "../../lib/hooks/usePaginatedAllGroups";
// import useAllGroups from "../../lib/hooks/useAllGroups";
import EmptyState from "../common/EmptyState";
import { LoaderSmall } from "../common/Loaders";
import GroupItem from "./GroupItem";

const colors = ["#FFADAD", "#5956E9", "#FBC400"];
const url =
  "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

  type Props = {
    groups?: any[],
    loading?: boolean,
    error?: ApolloError,

  }
const GroupItemList = ({groups, loading, error}:Props) => {
  return loading ? (
    <div className="flex h-full items-center justify-center min-w-full min-h-full">
      <LoaderSmall />
    </div>
  ) : error ? (
    <p>Something went wrong</p>
  ) : groups?.length === 0 ? (
    <EmptyState />
  ) : (
    <div className=" w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-x-12">
      {groups &&
        groups.map((group: any, index: number) => (
          <GroupItem
            color={colors[index % colors.length]}
            groupProps={group}
            key={index}
          />
        ))}
    </div>
  );
};

export default GroupItemList;
