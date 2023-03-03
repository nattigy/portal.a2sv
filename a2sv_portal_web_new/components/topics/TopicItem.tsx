import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { generateRandomColor } from "../../helpers/getReactIcon";
import { getSVGIcon } from "../../helpers/getSVGPath";
import { slugify } from "../../helpers/slugify";
import { REMOVE_TOPIC } from "../../lib/apollo/Mutations/topicsMutations";
import { Topic } from "../../types/topic";
import CustomLink from "../common/CustomLink";
import MenuItem from "../common/MenuItem";
import SeasonItem from "../seasons/SeasonItem";

export type Props = {
  topic: Topic;
  idx: number;
};

const colors = ["#5956E9", "#FFDC60", "#FFADAD", "#FFADAD"];


const TopicItem = (props: Props) => {
  
  
  return (
      <div className="h-[72px] flex w-full rounded-r-lg gap-x-3 bg-white items-center cursor-pointer ripple shadow-sm">
        <div
          className={`w-1 h-full`}
          style={{
            background: colors[props.idx % colors.length],
          }}
        ></div>
        <div className="flex flex-row justify-between w-full items-center pr-3">
          <div className="flex flex-col justify-center">
            <p className="font-Poppins font-semibold text-sm">{props.topic.name}</p>
            <p className="font-Poppins font-medium text-xs text-[#8A8A8A]">
              Solved 12/32
            </p>
          </div>
        </div>
      </div>
  );
};

export default TopicItem;
