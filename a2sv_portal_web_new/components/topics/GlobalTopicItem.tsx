import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { getSVGIcon } from "../../helpers/getSVGPath";
import { slugify } from "../../helpers/slugify";
import { REMOVE_SEASON_TOPIC } from "../../lib/apollo/Mutations/topicsMutations";
import { Topic } from "../../types/topic";
import CustomLink from "../common/CustomLink";
import MenuItem from "../common/MenuItem";
import DeletePopupModal from "../modals/DeletePopupModal";
import TopicItem from "./TopicItem";

type Props = {
  idx: number;
  season: { id: string; name: string };
  topic: Topic;
};

const GlobalTopicItem = (props: Props) => {
  const pathname = `${slugify(
    props.season?.name.toString() || ""
  )}/${slugify(props.topic.name)}/problems`;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [removeSeason, { loading, error,reset }] = useMutation(REMOVE_SEASON_TOPIC);
  const href = {
    pathname: pathname,
    query: {
      seasonId: props.season?.id,
      topicId: props.topic.id,
    },
  };
  return (
    <>
      {isDeleteModalOpen && (
        <DeletePopupModal
          title="You are about to remove this topic"
          errorMessage={error?.message || ""}
          description={`This action will remove ${props.topic.name} from ${props.season.name} permanently`}
          isLoading={loading}
          onClose={() => {
            setIsDeleteModalOpen(false);
            reset();
          }}
          onDelete={async () => {
            await removeSeason({
              variables: {
                seasonTopicId: {
                  topicId: props.topic.id,
                  seasonId: props.season.id,
                },
              },
              refetchQueries: "active",
              notifyOnNetworkStatusChange: true,
              onCompleted: (data) => {
                setIsDeleteModalOpen(false);
              },
            });
          }}
        />
      )}
      <CustomLink href={href}>
        <div className="mb-8">
          <div className="h-12 relative">
            <TopicItem idx={props.idx} topic={props.topic} />
            <div className="absolute top-2 right-2">
              <MenuItem
                color="black"
                menuItems={[
                  {
                    title: "Remove Topic",
                    onClick: (e: any) => {
                      e.stopPropagation();
                      setIsDeleteModalOpen(true);
                    },
                    icon: getSVGIcon("delete"),
                  },
  
                ]}
              />
            </div>
          </div>
        </div>
      </CustomLink>
    </>
  );
};

export default GlobalTopicItem;
