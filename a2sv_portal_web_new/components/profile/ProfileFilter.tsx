import React from "react";
import { FilterItem } from "../dashboard/DashboardFilter";

const filterItems: Array<FilterItem> = [
  {
    title: "Personal Details",
  },
  {
    title: "Social Media Handles",
  },
  {
    title: "Programming Site Handles",
  },
];

type Props = {
  handleTabChange: (idx: number) => void;
  handleModalOpen?: () => void;
  activeIndex: number;
};

const ProfileFilter = (props: Props) => {
  return (
    <div className="flex flex-row bg-white rounded-sm w-full h-16 items-center px-5">
      <div className="flex flex-1 gap-x-6 ">
        {filterItems.map((item, index) => (
          <div key={index}>
            <button
              style={{
                color: props.activeIndex == index ? "#565656" : "#9F9F9F",
              }}
              className="font-semibold text-xs"
              onClick={() => props.handleTabChange(index)}
            >
              {item.title}
            </button>
            {props.activeIndex == index && (
              <div className="h-0.5 w-full rounded-full bg-[#5956E9]"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileFilter;
