import { useMutation } from "@apollo/client";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { getSVGIcon } from "../../helpers/getSVGPath";
import { DELETE_CONTEST } from "../../lib/apollo/Mutations/contestMutations";
import WithPermission from "../../lib/Guard/WithPermission";
import { useGetAllContests } from "../../lib/hooks/useContests";
import { Contest } from "../../types/contest";
import { GraphqlUserRole } from "../../types/user";
import EmptyState from "../common/EmptyState";
import { LoaderSmall } from "../common/Loaders";
import MenuItem from "../common/MenuItem";
import DeletePopupModal from "../modals/DeletePopupModal";
import UpcomingContestItem from "./UpcomingContestItem";

const UpcomingContests = () => {
  const { data, loading, error } = useGetAllContests();


  return (
    <>
     
      <div className="flex flex-col gap-y-2">
        <h1 className="font-semibold text-md">Upcoming Contest</h1>
        <div className="grid xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {loading ? (
            <div className="flex h-full items-center justify-center min-w-full min-h-full">
              <LoaderSmall />
            </div>
          ) : error ? (
            <p>Something went wrong</p>
          ) : data?.items?.length === 0 ? (
            <EmptyState />
          ) : (
            data?.contests?.items.map((contest: Contest) => {
              return <UpcomingContestItem key={contest.id} contest={contest} />;
            })
          )}
        </div>
      </div>
    </>
  );
};

export default UpcomingContests;
