import clsx from "clsx";
import React from "react";
import WithPermission from "../../lib/Guard/WithPermission";
import { useGetSeasonRequests } from "../../lib/hooks/useSeasons";
import { GraphqlUserRole } from "../../types/user";
import { LoaderSmall } from "../common/Loaders";
// import CalendarItem from "./CalendarItem";
import SeasonRequestItem, { SeasonRequestItemProps } from "./SeasonRequestItem";

type Props = {};

const SeasonSidebarItem = (props: Props) => {
  const { data, loading, error } = useGetSeasonRequests();

  return (
    <div className={clsx("h-full flex flex-col gap-y-2 justify-between overflow-auto")}>
    
      <div className={clsx("flex flex-col gap-y-4 transition-all")}>
        {/* <CalendarItem/> */}
        <WithPermission allowedRoles={[GraphqlUserRole.HEAD_OF_ACADEMY]}>
          <>
            <h1 className="p-1 text-xl font-semibold">Season Requests</h1>
            {loading ? (
              <LoaderSmall />
            ) : (
              data?.groupSeasons?.items.map(
                (seasonRequest: SeasonRequestItemProps, idx: number) => (
                  <SeasonRequestItem key={idx} {...seasonRequest} />
                )
              )
            )}
          </>
        </WithPermission>
      </div>
    </div>
  );
};

export default SeasonSidebarItem;
