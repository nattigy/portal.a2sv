import { ApolloError, useMutation } from "@apollo/client";
import clsx from "clsx";
import { format } from "date-fns";
import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { MdModeEditOutline } from "react-icons/md";
import { getIcon } from "../../../helpers/getReactIcon";
import { REMOVE_PROBLEM } from "../../../lib/apollo/Mutations/problemsMutations";
import { ProblemType } from "../../../types/problems";
import Tag from "../../common/Tag";
import DeletePopupModal from "../../modals/DeletePopupModal";
import ProblemModal from "../../modals/ProblemModal";
import { DifficultyChips } from "../DifficultyChips";

type Props = {
  index: number;
  problem: ProblemType;
  expanded: false | number;
  setExpanded: React.Dispatch<React.SetStateAction<number | false>>;
};

const ProblemsItem = ({ index, problem, expanded, setExpanded }: Props) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [removeProblem] = useMutation(REMOVE_PROBLEM);

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };
  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const isOpen = index === expanded;

  return (
    <>
      {isEditModalOpen && (
        <ProblemModal
          problem={problem}
          isEditing={true}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <DeletePopupModal
          title="You are about to delete this problem"
          errorMessage={errorMessage}
          isLoading={isLoading}
          description={`This action will delete ${problem.title} from problem repository`}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={async () => {
            setIsLoading(true);
            await removeProblem({
              variables: {
                problemId: problem.id,
              },
              refetchQueries: "active",
              notifyOnNetworkStatusChange: true,
              onCompleted: (data) => {
                setIsDeleteModalOpen(false);
                setIsLoading(false);
              },
              onError: (error) => {
                setErrorMessage((error as ApolloError).message);
                setIsLoading(false);
              },
            });
          }}
        />
      )}

      <div className="bg-white flex justify-center items-center p-2">
        <div className="flex flex-col justify-center w-full px-2">
          <button
            onClick={() => setExpanded(isOpen ? false : index)}
            className="group focus:outline-none"
          >
            <div className="flex items-center justify-between h-12 px-3 font-semibold">
              <div className="w-full grid grid-cols-4">
                <span className="text-left text-sm truncate">
                  {problem.title}
                </span>
                <span className="text-left text-sm truncate">
                  <DifficultyChips status={problem.difficulty.toUpperCase()} />
                </span>
                <span className="text-left text-sm truncate">
                  <div className="flex flex-row gap-x-2 uppercase">
                    {getIcon(problem.platform.toUpperCase())}
                    {problem.platform}
                  </div>
                </span>
                <span className="text-left text-sm truncate">
                  {format(new Date(problem.createdAt), "MMM dd, yyyy")}
                </span>
              </div>
              <svg
                className={clsx("h-8 w-8 duration-200", isOpen ? "rotate-180" : "")}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div
              className={clsx(
                "max-h-0 overflow-hidden duration-300  border-[#a2a2a2]",
                isOpen ? "max-h-fit p-4 px-10 shadow-md" : ""
              )}
            >
              <div className="bg-white flex w-full">
                <div className="w-1/2 flex flex-col items-start justify-start gap-y-2">
                  <h1 className="text-sm font-semibold">Tags</h1>
                  <div className="flex gap-x-1">
                    {problem.tags &&
                      problem.tags.map((tag: any, index: number) => {
                        return (
                          <Tag value={tag} key={index}>
                            <p className="font-semibold text-xs">{tag.name}</p>
                          </Tag>
                        );
                      })}
                  </div>
                </div>
                <div className="w-5/12 flex flex-col items-start">
                  <h1>Created By</h1>
                  <div className="h-24">Info</div>
                </div>
                <div className="w-1/12 flex flex-col items-end gap-y-2">
                  <MdModeEditOutline onClick={handleEditModalOpen} size={24} />
                  <HiOutlineTrash
                    onClick={handleDeleteModalOpen}
                    color="red"
                    size={24}
                  />
                </div>
              </div>
              <span className="float-right">Aug 12, 2022</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProblemsItem;
