import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import BaseLayout from "../../../../../../components/common/BaseLayout";
import ResourceModal from "../../../../../../components/modals/ResourceModal";
import ProblemsPage from "../../../../../../components/problems/ProblemsPage";
import TopicResourcesItem from "../../../../../../components/problems/TopicResourcesItem";
import { Resource } from "../../../../../../types/resource";

const IndexPage = () => {
  const Sidebar: React.FC<{ sidebarProps: Array<Resource> }> = ({
    sidebarProps,
  }: {
    sidebarProps: Array<Resource>;
  }) => {
    const [expanded, setExpanded] = useState<false | number>(false);

    return (
      <div className="flex flex-col justify-between h-full">
        <div>
          <div>
            <h1 className="font-semibold text-md mb-4 text-[#565656]">
              Resources
            </h1>
          </div>
          {sidebarProps &&
            sidebarProps.map((sidebarProp: Resource, index: number) => {
              return (
                <TopicResourcesItem
                  expanded={expanded}
                  setExpanded={setExpanded}
                  index={index}
                  topicResource={sidebarProp}
                  key={sidebarProp.id}
                />
              );
            })}
          <div
            onClick={handleModalOpen}
            className="flex gap-x-1 items-center justify-center bg-[#F6F6FC] border-2 border-dashed border-[#CDCDCD] rounded-md p-3 mt-2"
          >
            <BiPlus size={22} />
            <h1 className="font-medium text-md">Add More Resources</h1>
          </div>
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <BaseLayout sidebar={<Sidebar sidebarProps={[]} />}>
      {isModalOpen && (
        <ResourceModal
          isEditing={false}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <div>
        <ProblemsPage
          topicName={query?.name as string}
          seasonId={query?.seasonId as string}
          topicId={query?.topicId as string}
        />
      </div>
    </BaseLayout>
  );
};

export default IndexPage;
