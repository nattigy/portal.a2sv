import clsx from "clsx";
import { useRouter } from "next/router";
import React from "react";

export type UpcomingContests = {
  id: number;
  name: string;
  div: number;
  date: string;
};

type Props = {
  upcomingContests?: Array<UpcomingContests>;
};

const UpcomingContestItem = (props: Props) => {
  var images = [
    "/images/contest1.svg",
    "/images/contest2.svg",
    "/images/contest3.svg",
  ];

  const router = useRouter();
  const handleClick = (e: any) => {
    router.push({
      pathname: `/contests/${e.name}`,
      query: { div: e.div },
    });
  };
  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="font-semibold text-lg">Upcoming Contest</h1>
      <div className="flex gap-x-8">
        {props.upcomingContests ? (
          props.upcomingContests.map((contest) => {
            return (
              <div
                key={contest.id}
                style={{
                  backgroundImage: `url(${
                    images[Math.floor(Math.random() * images.length)]
                  })`,
                }}
                className="flex flex-col w-1/3 h-48 justify-between rounded-md items-end"
                onClick={() => handleClick(contest)}
              >
                <div className="self-end p-2">
                  <div className="p-1 px-2 rounded-md bg-white text-[#5956E9] text-sm">
                    Div {contest.div}
                  </div>
                </div>
                <div className="w-full text-white bg-[#00000042] p-3">
                  <h1 className="font-semibold text-md">{contest.name}</h1>
                  <h1 className="font-normal text-sm">{contest.date}</h1>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-row w-full h-32 rounded-md justify-center items-center bg-white">
            No Upcoming Contests
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingContestItem;
