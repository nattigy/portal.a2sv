import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import BaseLayout from "../../../../../../components/common/BaseLayout";
import ProblemsPage from "../../../../../../components/problems/ProblemsPage";
import TopicResourcesItem, {
  TopicResourcesProps,
} from "../../../../../../components/problems/TopicResourcesItem";

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

  const router = useRouter();
  const query = router.query;

  return (
    <BaseLayout sidebar={<Sidebar sidebarProps={topicResource} />}>
      <div>
        <h1 className="capitalize text-2xl font-semibold">{query?.name}</h1>
        <ProblemsPage seasonId={query?.seasonId as string} topicId={query?.topicId as string}/>
      </div>
    </BaseLayout>
  );
};

export default IndexPage;
