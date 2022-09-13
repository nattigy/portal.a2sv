import React from "react";

type Props = {};

const UpcomingContestItem = (props: Props) => {
  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="font-semibold text-lg">Upcoming Contest</h1>
      <div className="flex gap-x-8">
        <div className="flex flex-col w-1/3 h-48 justify-between rounded-md items-end bg-[url('/images/contest1.svg')]">
          <div className="self-end p-2">
            <div className="p-1 px-2 rounded-md bg-white text-[#5956E9] text-sm">
              Div 3
            </div>
          </div>
          <div className="w-full text-white bg-[#00000042] p-3">
            <h1 className="font-semibold text-md">A2SV-G3 2</h1>
            <h1 className="font-normal text-sm">Saturday 3:30LT</h1>
          </div>
        </div>
        <div className="flex flex-col w-1/3 h-48 justify-between rounded-md items-end bg-[url('/images/contest2.svg')]">
          <div className="self-end p-2">
            <div className="p-1 px-2 rounded-md bg-white text-[#5956E9] text-sm">
              Div 1
            </div>
          </div>
          <div className="w-full text-white bg-[#00000042] p-3">
            <h1 className="font-semibold text-md">A2SV-G3 2</h1>
            <h1 className="font-normal text-sm">Sunday 3:30LT</h1>
          </div>
        </div>
        <div className="flex flex-col w-1/3 h-48 justify-between rounded-md items-end bg-[url('/images/contest3.svg')]">
          <div className="self-end p-2">
            <div className="p-1 px-2 rounded-md bg-white text-[#5956E9] text-sm">
              Div 2
            </div>
          </div>
          <div className="w-full text-white bg-[#00000042] p-3">
            <h1 className="font-semibold text-md">A2SV-G3 2</h1>
            <h1 className="font-normal text-sm">Sunday 3:30LT</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingContestItem;
