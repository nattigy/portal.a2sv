import { useMutation } from "@apollo/client";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { getSVGIcon } from "../../helpers/getSVGPath";
import { DELETE_CONTEST } from "../../lib/apollo/Mutations/contestMutations";
import WithPermission from "../../lib/Guard/WithPermission";
import { GraphqlUserRole } from "../../types/user";
import CustomLink from "../common/CustomLink";
import MenuItem from "../common/MenuItem";
import DeletePopupModal from "../modals/DeletePopupModal";

type Props = {
  contest: any;
};

const UpcomingContestItem = ({ contest }: Props) => {
  var images = [
    "/images/contest1.svg",
    "/images/contest2.svg",
    "/images/contest3.svg",
  ];

  const router = useRouter();

  const href = {
    pathname: `/contests/${contest.name}`,
  };
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteContest, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_CONTEST);

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      {isDeleteModalOpen && (
        <DeletePopupModal
          description="This action will delete the contest permanently"
          errorMessage={deleteError?.message || ""}
          isLoading={deleteLoading}
          onClose={() => {
            setIsDeleteModalOpen(false);
          }}
          onDelete={async () => {
            await deleteContest({
              variables: {
                contestId: contest.id,
              },
              refetchQueries: "active",
              notifyOnNetworkStatusChange: true,
            });
          }}
          title="You are about to delete this contest"
        />
      )}
      <CustomLink href={href}>
        <div
          key={contest.id}
          style={{
            backgroundImage: `url(${
              images[Math.floor(Math.random() * images.length)]
            })`,
          }}
          className="flex flex-col h-48 justify-between rounded-md bg-cover bg-no-repeat relative"
        >
          <WithPermission
            allowedRoles={[
              GraphqlUserRole.HEAD_OF_ACADEMY,
              GraphqlUserRole.HEAD_OF_EDUCATION,
            ]}
          >
            <div className="relative pt-2 pr-2">
              <MenuItem
                menuItems={[
                  {
                    title: "Edit Contest",
                    onClick: (e: any) => {
                      e.stopPropagation();
                      router.push({
                        pathname: "/contests/edit",
                        query: {
                          contestId: contest.id,
                        },
                      });
                    },
                    icon: getSVGIcon("edit"),
                  },
                  {
                    title: "Delete Contest",
                    onClick: (e: any) => {
                      e.stopPropagation();
                      handleDeleteModalOpen();
                    },
                    icon: getSVGIcon("delete"),
                  },
                ]}
              />
            </div>
          </WithPermission>

          <div className="absolute top-2 left-2 self-start p-2">
            <div className="p-1 px-2 rounded-md bg-white text-[#5956E9] text-sm">
              {contest.div}
            </div>
          </div>
          <div className="w-full text-white bg-[#00000042] p-3">
            <h1 className="font-semibold text-md">{contest.name}</h1>
            <h1 className="font-normal text-sm">{format(new Date(contest.startTime), "MMM, d, u h:mm aa")}</h1>
          </div>
        </div>
      </CustomLink>
    </>
  );
};

export default UpcomingContestItem;
