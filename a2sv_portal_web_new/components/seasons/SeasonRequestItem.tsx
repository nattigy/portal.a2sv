import React from "react";
import FormAffirmativeButton from "../common/FormAffirmativeButton";
import FormRejectButton from "../common/FormRejectButton";

type Props = {
  hoe: string;
  season: string;
  group: string;
};

const SeasonRequestItem = ({ hoe, season, group }: Props) => {
  return (
    <div>
      <div className="flex items-start gap-x-2">
        <div className="">
          <img
            className="w-16"
            src={"/images/group-students-profile.svg"}
            alt=""
          />
        </div>
        <div>
          <p className="text-xs">
            <span className="font-semibold">{hoe}</span> requested to start{" "}
            <span className="font-semibold">{season}</span> for{" "}
            <span className="font-semibold">{group}</span>
          </p>
          <div className="flex justify-between items-center">
            <FormRejectButton
              className="!py-2 !px-4 border !bg-white bg-opacity-100 border-primary text-primary text-xs"
              text="Decline"
              onClick={() => {}}
            />
            <FormAffirmativeButton
              className="!py-2 !px-4 border border-primary text-xs"
              text="Approve"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonRequestItem;
