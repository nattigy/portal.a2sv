import { ApolloError, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { getSVGIcon } from "../../../helpers/getSVGPath";
import { REMOVE_TOPIC } from "../../../lib/apollo/Mutations/topicsMutations";
import { Topic } from "../../../types/topic";
import { GraphqlUserRole } from "../../../types/user";
import CustomLink from "../../common/CustomLink";
import MenuItem from "../../common/MenuItem";
import DeletePopupModal from "../../modals/DeletePopupModal";
import TopicModal from "../../modals/TopicModal";
import { slugify } from "../../topics/TopicItem";

export type Props = {
  topic: Topic;
  idx: number;
};

const colors = ["#5956E9", "#FFDC60", "#FFADAD", "#FFADAD"];

const TopicsItem = ({ topic, idx }: Props) => {
  const router = useRouter();
  const pathname = `repository/${topic.name}`;
  const href = {
    pathname,
    query: {
      topicName: topic.name,
    }, // the data
  };

  const handleClick = () => {
    router.push("/" + topic.name);
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
    <>
      {isEditModalOpen && (
        <TopicModal
          isEditing={true}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
          newTopic={true}
          topic={topic}
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
                topicId: topic.id,
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
        <div className="h-[72px] flex w-full rounded-r-lg gap-x-3 bg-white items-center cursor-pointer">
          <div
            className={`w-1 h-full`}
            style={{
              background: colors[idx % colors.length],
            }}
          ></div>
          {/* <img src={titleToIcon[props.title].imgPath} className="w-12" alt="" /> */}
          <div className="flex flex-row justify-between w-full items-center pr-3">
            <div className="flex flex-col justify-center">
              <p className="font-Poppins font-semibold text-sm">{topic.name}</p>
              <p className="font-Poppins font-medium text-xs text-[#8A8A8A]">
                Solved 12/32
              </p>
            </div>
            <div className="h-12 relative">
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
        </div>
      </CustomLink>
    </>
  );
};

export default TopicsItem;
