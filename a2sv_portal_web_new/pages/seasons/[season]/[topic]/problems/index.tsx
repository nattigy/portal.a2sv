import { Reorder } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import BaseLayout from "../../../../../components/common/BaseLayout";
import EmptyState from "../../../../../components/common/EmptyState";
import { LoaderSmall } from "../../../../../components/common/Loaders";
import ResourceModal from "../../../../../components/modals/ResourceModal";
import ProblemsPage from "../../../../../components/problems/ProblemsPage";
import TopicResourcesItem from "../../../../../components/problems/TopicResourcesItem";
import WithPermission from "../../../../../lib/Guard/WithPermission";
import { useGetSeasonTopicResources } from "../../../../../lib/hooks/useResources";
import { Resource } from "../../../../../types/resource";
import { GraphqlUserRole } from "../../../../../types/user";

const IndexPage = () => {
  const Sidebar: React.FC<{ sidebarProps: Array<Resource> }> = ({
    sidebarProps,
  }: {
    sidebarProps: Array<Resource>;
  }) => {
    const router = useRouter();
    const { data, loading, error } = useGetSeasonTopicResources(
      router.query.seasonId?.toString() || "",
      router.query.topicId?.toString() || ""
    );

    const [resources, setResources] = useState<Resource[]>([]);
    useEffect(() => {
      setResources(data?.seasonTopic?.seasonTopicResources);
    }, [data]);

    const [expanded, setExpanded] = useState<false | number>(false);

    return (
      <div className="flex flex-col justify-between h-full">
        <div>
          <div>
            <h1 className="font-semibold text-md mb-4 text-[#565656]">
              Resources
            </h1>
          </div>
          {loading ? (
            <div className="w-full flex items-center justify-center">
              <LoaderSmall />
            </div>
          ) : error ? (
            <p>Something went wrong</p>
          ) : resources?.length === 0 ? (
            <div className="flex p-2 items-center justify-center">
              <h1 className="font-medium">There are no resources yet!</h1>
            </div>
          ) : (
            <Reorder.Group values={resources ? resources : []} onReorder={setResources}>
              {resources?.map((resource, index) => (
                <Reorder.Item key={resource.id} value={resource}>
                  <TopicResourcesItem
                    expanded={expanded}
                    setExpanded={setExpanded}
                    index={index}
                    topicResource={resource}
                    key={resource.id}
                  />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          )}
          <WithPermission allowedRoles={[GraphqlUserRole.HEAD_OF_ACADEMY,GraphqlUserRole.HEAD_OF_EDUCATION]}>
          <div
            onClick={handleModalOpen}
            className="flex gap-x-1 items-center justify-center bg-[#F6F6FC] border-2 border-dashed border-[#CDCDCD] rounded-md p-3 mt-2"
          >
            <BiPlus size={22} />
            <h1 className="font-medium text-md">Add More Resources</h1>
          </div>
          </WithPermission>
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
