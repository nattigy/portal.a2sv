import React from "react";
import { getSVGIcon } from "../../helpers/getSVGPath";
import { slugify } from "../../helpers/slugify";
import { Topic } from "../../types/topic";
import CustomLink from "../common/CustomLink";
import MenuItem from "../common/MenuItem";
import TopicItem from "./TopicItem";

type Props = {
  idx: number;
  season: { id: string; name: string };
  topic: Topic;
};

const GlobalTopicItem = (props: Props) => {
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
            <MenuItem
              color="black"
              menuItems={[
                {
                  title: "Delete Topic",
                  onClick: (e: any) => {
                    e.stopPropagation();
                  },
                  icon: getSVGIcon("delete"),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </CustomLink>
  );
};

export default GlobalTopicItem;
