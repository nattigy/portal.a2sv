import React from "react";

type Props = {};

const ActivityItem = (props: Props) => {
  return (
    <div className="flex flex-col justify-between h-fit p-4 rounded-md bg-[#F1F0F9]">
      <div className="flex items-center gap-x-2">
        <div className="rounded-full bg-[#5956E9] w-4 h-4"></div>
        <p className="text-xs font-light text-gray-300 dark:text-[#8A8A8A]">
          9:00: 10:00 AM
        </p>
      </div>
      <div>
        <a className="focus:outline-none text-sm font-medium leading-5 text-gray-100 dark:text-gray-900">
          Zoom call with design team
        </a>
        <p className="text-xs leading-4 text-gray-300 dark:text-[#636363]">
          Discussion on UX sprint and Wireframe review
        </p>
      </div>
    </div>
  );
};

export default ActivityItem;
