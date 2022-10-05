import React, { ReactNode } from "react";
import clsx from "clsx";
import { MdContentPaste } from "react-icons/md";
import { getGoogleIcon } from "../../helpers/getGoogleIcon";
import CustomLink from "../common/CustomLink";

export type TopicResourcesProps = {
  id: number;
  type: string;
  name: string;
  date: string;
  size: string;
  link: string;
};

type Props = {
  topicResource: TopicResourcesProps;
};

const TopicResourcesItem = ({ topicResource }: Props) => {
  let date = Date.now();
  // let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)
  return (
    <div className="flex flex-row justify-center items-center px-1 gap-1 text-sm text-[#565656] hover:bg-[#F6F6FC]">
      <div className="flex flex-none justify-center w-2/12 py-2 items-center bg-[#F6F6FC] rounded-lg">
        <img src={getGoogleIcon(topicResource.type)} className="w-7" alt="" />
      </div>
      <div className="flex flex-col flex-none justify-center py-3 pl-3 w-7/12">
        <p className="font-semibold truncate text-ellipsis">
          {topicResource.name}
        </p>
        <p className="text-xs font-medium">{topicResource.date}</p>
      </div>
      <div className="flex-none w-2/12 p-2 font-semibold">
        <p>{topicResource.size}</p>
      </div>
      <div></div>
    </div>
  );
};

export default TopicResourcesItem;
