import { useRouter } from "next/router";
import React from "react";

export type TopicProps = {
  name: String;
};

const TopicsItem = (props: TopicProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/" + props.name);
  };

  return (
    <div onClick={handleClick} className="flex flex-col">
      <h1>{props.name}</h1>
    </div>
  );
};

export default TopicsItem;
