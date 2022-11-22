import React, { useState } from "react";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import MenuItem from "../common/MenuItem";
import { StudentAvatar } from "../dashboard/GroupItem";
import NewSeasonModal from "../modals/SeasonModal";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import DeletePopupModal from "../modals/DeletePopupModal";
import SeasonModal from "../modals/SeasonModal";
import { Season } from "../../types/season";
import { ApolloError, useMutation } from "@apollo/client";
import { DELETE_SEASON } from "../../lib/apollo/Mutations/seasonsMutations";
import WithPermission from "../../lib/Guard/WithPermission";
import { GraphqlUserRole } from "../../types/user";
import { slugify } from "../topics/TopicItem";

type Props = {
  seasonProps: Season;
};

const SeasonItem = ({ seasonProps }: Props) => {
  const [isSeasonMenuOpen, setIsSeasonMenuOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [deleteSeason, { loading }] = useMutation(DELETE_SEASON);

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };
  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };
  const handleSeasonMenuOpen = () => {
    setIsSeasonMenuOpen(true);
  };

  var images = [
    "/images/season-item.svg",
    "/images/season-item.svg",
    "/images/season-item.svg",
  ];

  // const handleClick = (e: any) => {
  //   router.push({
  //     pathname: `/seasons/${seasonProps.name}`,
  //     query: { seasonId: seasonProps.id },
  //   });
  // };
  const pathname = `seasons/${slugify(seasonProps.name)}`;
  const href = {
    pathname,
    query: {
      seasonId: seasonProps.id,
    }, // the data
  };

  return (
    <>
      {isEditModalOpen && (
        <SeasonModal
          isEditing
          onClose={() => setIsEditModalOpen(false)}
          season={seasonProps}
        />
      )}
      {isDeleteModalOpen && (
        <DeletePopupModal
          title="Delete Season"
          description="This will delete this season"
          errorMessage={errorMessage}
          isLoading={loading}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={async () => {
            await deleteSeason({
              variables: {
                deleteSeasonId: seasonProps.id,
              },
              notifyOnNetworkStatusChange: true,
              refetchQueries: "active",
              onCompleted: (data) => {
                setIsDeleteModalOpen(false);
              },
              onError: (error) => {
                setErrorMessage((error as ApolloError).message);
              },
            });
          }}
        />
      )}
      <Link href={href} as={pathname}>
        <div className="cursor-pointer">
          <div className="h-36 relative">
            <div className="absolute top-2 right-2 z-30 ">
              <WithPermission
                allowedRoles={[
                  GraphqlUserRole.HEAD_OF_ACADEMY,
                  GraphqlUserRole.HEAD_OF_EDUCATION,
                ]}
              >
                <MenuItem
                  menuItems={[
                    {
                      title: "Edit Season",
                      onClick: (e: any) => {
                        e.stopPropagation();
                        handleEditModalOpen();
                      },
                    },
                    {
                      title: "Delete Season",
                      onClick: (e: any) => {
                        e.stopPropagation();
                        handleDeleteModalOpen();
                      },
                    },
                  ]}
                />
              </WithPermission>
            </div>
            <div className="h-full w-full bg-gradient-to-t from-black/75 absolute z-10"></div>
            <Image
              layout="fill"
              className="h-full w-full flex flex-col justify-between rounded-t-md gap-y-2 object-cover absolute z-0"
              src={images[Math.floor(Math.random() * images.length)]}
              alt=""
            />
            <div className="flex flex-col justify-between gap-y-2 absolute z-20 h-full p-4">
              <div className="rounded-t-md">
                <h1 className="text-md font-semibold text-white">
                  {seasonProps.name}
                </h1>
                <h1 className="text-white">{seasonProps.name}</h1>
              </div>
              <div className="flex gap-x-2">
                <div className="p-2 w-20 bg-[#E4E3F0] rounded-md text-sm text-primary text-center">
                  Current
                </div>
                <div className="p-2 w-20 bg-[#E4E3F0] rounded-md text-sm text-primary text-center">
                  21 days
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-end bg-white h-16 rounded-b-md p-4">
            <h1 className="text-xs font-semibold">Aug 12, 2022</h1>
            {/* users */}
          </div>
        </div>
      </Link>
    </>
  );
};

export default SeasonItem;
