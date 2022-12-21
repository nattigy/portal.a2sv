import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/common/BaseLayout";
import HOAAllProblemsPage from "../../components/problems/HOA/HOAAllProblemsPage";
import HOATopicProblemsPage from "../../components/problems/HOA/HOATopicProblemsPage";
import ProblemsFilter from "../../components/problems/HOA/ProblemsFilter";
import { useApollo } from "../../lib/apollo/apolloClient";
import { useAllProblems } from "../../lib/hooks/useAllProblems";

type Props = {};

const IndexPage = (props: Props) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  // const Sidebar: React.FC = () => {
  //   return (
  //     <div>
  //       <h1>Problems Sidebar</h1>
  //     </div>
  //   );
  // };

  return (
    <BaseLayout>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-2">Problems</h1>
        <ProblemsFilter
          handleTabChange={handleTabChange}
          activeIndex={tabIndex}
        />
        <div className="">
          {tabIndex == 0 && <HOAAllProblemsPage />}
          {tabIndex == 1 && <HOATopicProblemsPage />}
        </div>
      </div>
    </BaseLayout>
  );
};

export default IndexPage;
