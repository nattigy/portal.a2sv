import React, { ReactNode } from "react";
import StudentLayout from "../../../../../components/common/StudentLayout";
import ProblemsTable from "../../../../../components/problems/ProblemsTable";
import TopicResourcesItem, { TopicResourcesProps } from "../../../../../components/problems/TopicResourcesItem";

const IndexPage = () => {
  const topicResource: Array<TopicResourcesProps> = [
    {
      id: 1,
      name: "DP Patterns.doc",
      size: "12MB",
      date: "Oct 28 9:27PM",
      type: "Docs",
      link: "/#",
    },
    {
      id: 2,
      name: "DP Patterns.ppt",
      size: "2MB",
      date: "Oct 28 9:27PM",
      type: "Slides",
      link: "/#",
    },
    {
      id: 3,
      name: "DP Patterndfkdkfjdkfjdkjfs.xlsx",
      size: "1MB",
      date: "Oct 28 9:27PM",
      type: "Sheets",
      link: "/#",
    },
  ];
  const Sidebar: React.FC<{ sidebarProps: Array<TopicResourcesProps> }> = ({
    sidebarProps,
  }: {
    sidebarProps: Array<TopicResourcesProps>;
  }) => {
    return (
      <div className="flex flex-col justify-between h-full">
        <div>
          <div>
            <h1 className="font-semibold text-md mb-4 text-[#565656]">
              Resources
            </h1>
          </div>
          {sidebarProps ? (
            sidebarProps.map((sidebarProp: TopicResourcesProps) => {
              return (
                <TopicResourcesItem
                  topicResource={sidebarProp}
                  key={sidebarProp.id}
                />
              );
            })
          ) : (
            <h1>No Resources for this topic yet</h1>
          )}
        </div>
        <div>
          <img src="/icons/resources.svg" alt="" />
          <p className="text-center text-[#565656]">
            Make sure to use the resources to get the best results.
          </p>
        </div>
      </div>
    );
  };

  return (
    <StudentLayout sidebar={<Sidebar sidebarProps={topicResource} />}>
      <div>
        <ProblemsTable />
      </div>
    </StudentLayout>
  );
};

export default IndexPage;
