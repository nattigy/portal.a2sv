import React from "react";
import TopicItem from "./TopicItem";
import TopicStruggledItem from "./TopicStruggledItem";

type TopicListProps = {
  title: string;
  selectedSeason: string;
};

const TopicList = (props: TopicListProps) => {
  const DUMMY_DATA = [
    {
      id: 0,
      title: "Dynamic Programming",
      description: "",
    },
    {
      id: 1,
      title: "Sliding Window",
      description: "",
    },
    {
      id: 2,
      title: "Bit Manipulation",
      description: "",
    },
    {
      id: 3,
      title: "Queue",
      description: "",
    },
  ];

  return (
    <>
      <p className="font-Poppins font-semibold text-[#565656] text-sm">
        {props.title}
      </p>
      <div className="grid grid-cols-3 gap-3 gap-x-12">
        {DUMMY_DATA.map((item) => (
          <TopicItem season={props.selectedSeason} key={item.id} title={item.title} />
        ))}
      </div>
    </>
  );
};

export default TopicList;
