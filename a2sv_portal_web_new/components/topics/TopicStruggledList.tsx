import React from "react";
import TopicStruggledItem, { TopicStruggledProps } from "./TopicStruggledItem";

const DUMMY_DATA: TopicStruggledProps[] = [
  {
    votes: 20,
    percent: 20,
    name: "DFS",
  },
  {
    votes: 50,
    percent: 50,
    name: "Binary search",
  },
  {
    votes: 30,
    percent: 30,
    name: "Trie",
  },
];

const TopicStruggledList = () => {
  return (
    <>
      {DUMMY_DATA.map((item) => (
        <TopicStruggledItem
          key={item.name}
          votes={item.votes}
          percent={item.percent}
          name={item.name}
        />
      ))}
    </>
  );
};

export default TopicStruggledList;
