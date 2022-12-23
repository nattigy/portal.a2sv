import React, { ReactNode } from "react";
import clsx from "clsx";
import { MdContentPaste, MdModeEditOutline } from "react-icons/md";
import { getGoogleIcon } from "../../helpers/getGoogleIcon";
import CustomLink from "../common/CustomLink";
import { Resource } from "../../types/resource";
import { format } from "date-fns";
import { HiOutlineTrash } from "react-icons/hi";
import { getIcon } from "../../helpers/getReactIcon";
import Tag from "../common/Tag";
import { DifficultyChips } from "./DifficultyChips";

type Props = {
  topicResource: Resource;
};

const TopicResourcesItem = ({ topicResource }: Props) => {
  return (
    <div className="bg-white flex flex-col justify-center items-center py-2">
      <div className="flex flex-col justify-center w-full">
        <button className="group focus:outline-none">
          <div className="flex flex-row justify-center items-center gap-1 text-sm text-[#565656] hover:bg-[#F6F6FC]">
            <div className="flex justify-center w-2/12 py-2 items-center bg-[#F6F6FC] rounded-lg">
              <img
                src={getGoogleIcon(topicResource.type)}
                className="w-7"
                alt=""
              />
            </div>
            <div className="flex flex-col items-start justify-center py-3 pl-2 w-8/12">
              <p className="w-full font-semibold truncate text-start text-ellipsis">
                {topicResource.name}
              </p>
              <p className="text-xs font-medium">{topicResource.date}</p>
            </div>
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div className="max-h-0 overflow-hidden duration-300 group-focus:max-h-fit group-focus:p-4 group-focus:shadow-md">
            <div className="bg-white flex w-full h-fit">
              <h1 className="text-start text-xs font-light">{topicResource.description}</h1>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default TopicResourcesItem;
