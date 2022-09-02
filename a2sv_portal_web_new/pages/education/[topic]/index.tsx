import React, { ReactNode } from "react";
import StudentLayout from "../../../components/common/StudentLayout";
import TopicList from "../../../components/topics/TopicList";
import TopicStruggledList from "../../../components/topics/TopicStruggledList";

const IndexPage = () => {
  const Sidebar: React.FC = () => {
    return (
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-y-5">
          <p className="font-bold">Topics struggling with</p>
          <TopicStruggledList />
        </div>

        <div className="flex-col flex items-center">
          <p className="text-sm">Are You Strugging with a Topic?</p>
          <img src="/images/struggling.svg" className="w-3/5" alt="" />
          <p className="text-[#747474] font-light text-sm">
            Don’t worry we’ll give you a reliable hand. Don’t give up keep
            pushing!
          </p>
        </div>
      </div>
    );
  };

  return (
    <StudentLayout sidebar={<Sidebar />}>
      <h1 className="text-2xl font-bold mb-2">Topics</h1>
      <TopicList title="Current" />
      <TopicList title="Recent" />
      <TopicList title="All covered" />
    </StudentLayout>
  );
};

export default IndexPage;
