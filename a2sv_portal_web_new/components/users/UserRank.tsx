import React, { useEffect } from "react";
import RankItem, { RankItemProps } from "./RankItem";
import { useGetSingleUser } from "../../lib/hooks/useUsers";
import { LoaderSmall } from "../common/Loaders";
import { getRandomNumber } from "../../helpers/getReactIcon";

export type UserRankProps = {
  selected: string;
};

const UserRank = ({ selected }: UserRankProps) => {
  const [fetchUser, { refetch, data, loading, error }] =
    useGetSingleUser(selected);

  useEffect(() => {
    fetchUser();
  }, [refetch, selected]);

  const rank: Array<RankItemProps> = [
    {
      id: 1,
      color: "#5CB85C",
      name: "Daily",
      standing: getRandomNumber(1, 65),
      totalStudents: 65,
    },
    {
      id: 2,
      color: "#FFDC60",
      name: "Weekly",
      standing: getRandomNumber(1, 65),
      totalStudents: 65,
    },
    {
      id: 3,
      color: "#D72B2BCC",
      name: "Monthly",
      standing: getRandomNumber(1, 65),
      totalStudents: 65,
    },
    {
      id: 4,
      color: "#5956E9",
      name: "All time",
      standing: getRandomNumber(1, 65),
      totalStudents: 65,
    },
  ];

  // const UserRank = () => {
  return (
    <div>
      <div className="flex flex-col items-center h-44 relative rounded-t-xl">
        <div className="relative h-28 w-full flex justify-center rounded-t-xl">
          <img
            src="/images/rank-profile-bg.svg"
            alt=""
            className="h-full w-full object-cover rounded-t-xl"
          />
          <img
            src="/images/rank-profile.svg"
            className="absolute top-1/2 w-28 h-28"
            alt=""
          />
        </div>
      </div>
      {loading ? (
        <div className="w-full flex justify-center items-center">
          <LoaderSmall />
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center m-2 my-4">
            {data && (
              <div className="flex flex-col">
                <p className="text-center font-semibold">
                  {data.user?.userProfile
                    ? data.user?.userProfile?.firstName +
                      " " +
                      data.user?.userProfile?.lastName
                    : "No Name"}
                </p>
                <p className="font-semibold">{data.user && data.user.email}</p>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
            <RankItem rankItem={rank[0]} />
            <RankItem rankItem={rank[1]} />
            <RankItem rankItem={rank[2]} />
            <RankItem rankItem={rank[3]} />
          </div>
          <div>
            <div className="flex flex-col my-6">
              <h1 className="font-semibold text-sm">Topics coverage</h1>
              <div className="">
                <div className="flex items-center gap-x-2">
                  <div className="rounded-md bg-[#DEDEDE] w-full h-2">
                    <div
                      style={{
                        width: "80%",
                      }}
                      className="rounded-md bg-[#8A70D6] h-2 px-2"
                    ></div>
                  </div>
                  <h1>80%</h1>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="font-semibold text-sm">Contest Conversion Rate</h1>
              <div className="">
                <div className="flex items-center gap-x-2">
                  <div className="rounded-md bg-[#DEDEDE] w-full h-2">
                    <div
                      style={{
                        width: "32%",
                      }}
                      className="rounded-md bg-[#8A70D6] h-2 px-2"
                    ></div>
                  </div>
                  <h1>32%</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRank;
