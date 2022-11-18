import { useRouter } from "next/router";
import React from "react";
import { FiChevronRight } from "react-icons/fi";
import CustomLink from "../../common/CustomLink";
import { slugify } from "../../topics/TopicItem";

export type Props = {
  topic: any;
  idx: number;
};

const colors = ["#5956E9", "#FFDC60", "#FFADAD", "#FFADAD"];

const TopicsItem = ({ topic, idx }: Props) => {
  const router = useRouter();
  const pathname = `problems/${topic.name}`;
  const href={
    pathname,
    query: {
      topicName : topic.name ,
    }, // the data
  }


  const handleClick = () => {
    router.push("/" + topic.name);
  };

  return (
    <CustomLink href={href}>
      <div className="h-[72px] flex w-full rounded-r-lg gap-x-3 bg-white items-center cursor-pointer">
        <div
          className={`w-1 h-full`}
          style={{
            background: colors[idx % colors.length],
          }}
        ></div>
        {/* <img src={titleToIcon[props.title].imgPath} className="w-12" alt="" /> */}
        <div className="flex flex-row justify-between w-full items-center pr-3">
          <div className="flex flex-col justify-center">
            <p className="font-Poppins font-semibold text-sm">{topic.name}</p>
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

export default TopicsItem;
