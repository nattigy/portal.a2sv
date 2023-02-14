import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/common/BaseLayout";
import AllProblemsPage from "../../components/problems/HOA/AllProblemsPage";
import AllTopicsPage from "../../components/problems/HOA/AllTopicsPage";
import ProblemsFilter from "../../components/problems/HOA/ProblemsFilter";
import { useApollo } from "../../lib/apollo/apolloClient";
import { useAllProblems } from "../../lib/hooks/useProblems";

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
        <h1 className="text-lg font-semibold mb-2">Repository</h1>
        <ProblemsFilter
          handleTabChange={handleTabChange}
          activeIndex={tabIndex}
        />
        <div className="">
          {tabIndex == 0 && <AllProblemsPage />}
          {tabIndex == 1 && <AllTopicsPage />}
        </div>
      </div>
    </BaseLayout>
  );
};

export default IndexPage;
