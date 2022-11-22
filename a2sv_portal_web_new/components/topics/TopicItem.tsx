import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { generateRandomColor } from "../../helpers/getReactIcon";
import CustomLink from "../common/CustomLink";
import SeasonItem from "../seasons/SeasonItem";

export type TopicItemProps = {
  title: string;
  season?: { name: string; id: string };
  topic: any;
  groupId?: string;
  idx: number;
};
export type ColorSVG = {
  imgPath: string;
  color: string;
};
const colors = ["#5956E9", "#FFDC60", "#FFADAD", "#FFADAD"];
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
  const pathname = `${slugify(
    props.season?.name.toString() || ""
  )}/topics/${slugify(props.topic.name)}/problems`;

  const href = {
    pathname: pathname,
    query: {
      seasonId: props.season?.id,
      groupId: props.groupId,
      topicId: props.topic.id,
    }, // the data
  };
  return (
    <CustomLink href={href}>
      <div className="h-[72px] flex w-full rounded-r-lg gap-x-3 bg-white items-center cursor-pointer">
        <div
          className={`w-1 h-full`}
          style={{
            background: colors[props.idx % colors.length],
          }}
        ></div>
        {/* <img src={titleToIcon[props.title].imgPath} className="w-12" alt="" /> */}
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
