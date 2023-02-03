import React from "react";
import { getSVGIcon } from "../../helpers/getSVGPath";
import { slugify } from "../../helpers/slugify";
import { Topic } from "../../types/topic";
import CustomLink from "../common/CustomLink";
import MenuItem from "../common/MenuItem";
import TopicItem from "./TopicItem";

type Props = {
  idx: number;
  topic: Topic;
  isChecked:boolean;
  handleOnChange:()=>void
  season: { id: string; name: string };
};

const GroupTopicItem = (props: Props) => {
  const pathname = `${slugify(
    props.season?.name.toString() || ""
  )}/topics/${slugify(props.topic.name)}/problems`;

  const href = {
    pathname: pathname,
    query: {
      seasonId: props.season?.id,
      topicId: props.topic.id,
    },
  };
  return (
    <CustomLink href={href}>
      <div className="mb-8">
        <div className="h-12 relative">
          <TopicItem idx={props.idx} topic={props.topic} />
          <div className="absolute top-2 right-2">
            <div>
              <input
                type="checkbox"
                id="checkbox-button"
                onClick={(e) => {
                  e.stopPropagation();
                  props.handleOnChange();
                }}
                checked={props.isChecked}
              />
              {/* <label htmlFor="radio-button">Option text</label> */}
            </div>
          </div>
        </div>
      </div>
    </CustomLink>
  );
};

export default GroupTopicItem;
