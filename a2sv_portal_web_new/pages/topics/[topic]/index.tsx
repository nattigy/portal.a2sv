import { useReactiveVar } from "@apollo/client";
import React, { ReactNode, useEffect, useState } from "react";
import CustomDropdown, { CustomDropdownProps } from "../../../components/common/CustomDropdown";
import StudentLayout from "../../../components/common/StudentLayout";
import TopicList from "../../../components/topics/TopicList";
import TopicStruggledList from "../../../components/topics/TopicStruggledList";
import { authenticatedUser } from "../../../lib/constants/authenticated";

const IndexPage = () => {
  const [select, setSelect] = useState("Education");
  const dropdown: CustomDropdownProps = {
    label: "",
    options: ["Education", "Camp"],
  };

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

  useEffect(() => {

  }, [select]);

  return (
    <StudentLayout sidebar={<Sidebar />}>
      <>
        <div className="flex items-center mb-2 gap-x-4">
          <h1 className="text-2xl font-bold">Topics</h1>
          <div className="flex flex-col items-center">
            <CustomDropdown customProps={dropdown} selected={select} setSelected={setSelect} />
          </div>
        </div>
        <TopicList title="Current" />
        <TopicList title="Recent" />
        <TopicList title="All covered" />
      </>
    </StudentLayout>
  );
};

export default IndexPage;
