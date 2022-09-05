import React from "react";
import { FiChevronRight } from "react-icons/fi";
import CustomLink from "../common/CustomLink";

export type TopicItemProps = {
  title: string;
};
export type ColorSVG = {
  imgPath: string;
  color: string;
};

export const titleToIcon: { [title: string]: ColorSVG } = {
  "Dynamic Programming": { imgPath: "/icons/dp-icon.svg", color: "#5956E9" },
  "Sliding Window": { imgPath: "/icons/sw-icon.svg", color: "#FFDC60" },
  "Bit Manipulation": { imgPath: "/icons/bm-icon.svg", color: "#FFADAD" },
  Queue: { imgPath: "/icons/queue-icon.svg", color: "#FFADAD" },
};
export const slugify = (...args: (string | number)[]): string => {
  const value = args.join(" ");
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");
};

const TopicItem = (props: TopicItemProps) => {
  return (
    <CustomLink href={`topics/${slugify(props.title)}/problems`}>
      <div className="h-[72px] flex w-72 rounded-r-lg gap-x-3 bg-white m-3 items-center cursor-pointer">
        <div
          className={`w-1 h-full`}
          style={{
            background: titleToIcon[props.title].color,
          }}
        ></div>
        <img src={titleToIcon[props.title].imgPath} className="w-12" alt="" />
        <div className="flex flex-row justify-between w-full items-center pr-3">
          <div className="flex flex-col justify-center">
            <p className="font-Poppins font-semibold text-sm">{props.title}</p>
            <p className="font-Poppins font-medium text-xs text-[#8A8A8A]">
              Solved 12/32
            </p>
          </div>
          <FiChevronRight size={18} />
        </div>
      </div>
    </CustomLink>
  );
};

export default TopicItem;
