import { useReactiveVar } from "@apollo/client";
import React, { ReactNode, useEffect, useState } from "react";
import BaseLayout from "../../../../components/common/BaseLayout";
import CustomDropdown, { CustomDropdownProps } from "../../../../components/common/CustomDropdown";
import TopicStruggledList from "../../../../components/topics/TopicStruggledList";

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

  useEffect(() => {}, [select]);

  return (
    <BaseLayout sidebar={<Sidebar />}>
      <>
        <div className="flex items-center mb-2 gap-x-4">
          <h1 className="text-2xl font-bold text-gray-700">Topics</h1>
          <div className="flex flex-col items-center">
            <CustomDropdown
              customProps={dropdown}
              selected={select}
              setSelected={setSelect}
            />
          </div>
        </div>
      </>
    </BaseLayout>
  );
};

export default IndexPage;
