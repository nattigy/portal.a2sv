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

export type SeasonItemProps = {
  seasonId: number;
  seasonName: string;
  seasonDescription: string;
  students: [];
};

type Props = {
  seasonProps: SeasonItemProps;
};

const SeasonItem = ({ seasonProps }: Props) => {
  const [isSeasonMenuOpen, setIsSeasonMenuOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

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

  const router = useRouter();
  
  const handleClick = (e: any) => {
    router.push({
      pathname: `/seasons/${name}`,
      query: { div: e.div },
    });
  };

  return (
    <>
      {isEditModalOpen && (
        <SeasonModal isEditing onClose={() => setIsEditModalOpen(false)} />
      )}
      {isDeleteModalOpen && (
        <DeletePopupModal
          title="Delete Season"
          description="This will delete this season"
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
      <Link  href={"/seasons/" + seasonProps.seasonName}>
        <div className="cursor-pointer">
          <div className="h-36 relative">
            <div className="absolute top-2 right-2 z-30 ">
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
                  {seasonProps.seasonName}
                </h1>
                <h1 className="text-white">{seasonProps.seasonDescription}</h1>
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
