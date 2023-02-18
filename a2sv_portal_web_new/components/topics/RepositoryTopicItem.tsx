import { useMutation, ApolloError } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { getSVGIcon } from "../../helpers/getSVGPath";
import { REMOVE_TOPIC } from "../../lib/apollo/Mutations/topicsMutations";
import { Topic } from "../../types/topic";
import CustomLink from "../common/CustomLink";
import MenuItem from "../common/MenuItem";
import DeletePopupModal from "../modals/DeletePopupModal";
import TopicModal from "../modals/TopicModal";
import TopicItem from "./TopicItem";

type Props = {
  idx: number;
  topic: Topic;
};

const RepositoryTopicItem = (props: Props) => {
  const pathname = `repository/${props.topic.name}`;
  const href = {
    pathname,
    query: {
      topicName: props.topic.name,
    },
  };
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [removeTopic, { data, loading, error }] = useMutation(REMOVE_TOPIC);
  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };
  return (
    <div>
      {isEditModalOpen && (
        <TopicModal
          isEditing={true}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
          topic={props.topic}
        />
      )}
      {isDeleteModalOpen && (
        <DeletePopupModal
          description="This will delete the topic from topic repository."
          errorMessage={(error as ApolloError)?.message}
          isLoading={loading}
          onClose={() => {
            setIsDeleteModalOpen(true);
          }}
          onDelete={async () => {
            await removeTopic({
              variables: {
                topicId: props.topic.id,
              },
              notifyOnNetworkStatusChange: true,
              refetchQueries: "active",
              onCompleted: (data) => {
                setIsDeleteModalOpen(false);
              },
            });
          }}
          title="Delete Topic"
        />
      )}
      <CustomLink href={href}>
        <div className="mb-8">
          <div className="h-12 relative">
          <TopicItem {...props} />
            <div className="absolute top-2 right-2">
              <MenuItem
                color="black"
                menuItems={[
                  {
                    title: "Edit Topic",
                    onClick: (e: any) => {
                      e.stopPropagation();
                      handleEditModalOpen();
                    },
                    icon: getSVGIcon("edit"),
                  },
                  {
                    title: "Delete Topic",
                    onClick: (e: any) => {
                      e.stopPropagation();
                      handleDeleteModalOpen();
                    },
                    icon: getSVGIcon("delete"),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </CustomLink>
    </div>
  );
};

export default RepositoryTopicItem;
