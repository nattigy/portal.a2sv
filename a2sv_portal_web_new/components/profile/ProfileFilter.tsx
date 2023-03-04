import { FormikProps } from "formik";
import React from "react";
import { FilterItem } from "../dashboard/DashboardFilter";
import { ProfileFormValues } from "./ProfileInfo";

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
  {
    title: "Security",
  },
];

type Props = {
  formik: FormikProps<ProfileFormValues>;
  handleTabChange: (idx: number, values: ProfileFormValues) => void;
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
              className="disabled:cursor-not-allowed font-semibold text-xs"
              onClick={() => props.handleTabChange(index, props.formik.values)}
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
