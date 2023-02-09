import React, { ReactNode, useState } from "react";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import { MdContentPaste } from "react-icons/md";
import { DifficultyChips } from "./DifficultyChips";
import { getIcon } from "../../helpers/getReactIcon";
import {
  ProblemType,
} from "../../types/problems";
import DeletePopupModal from "../modals/DeletePopupModal";
import { ApolloError, useMutation, useReactiveVar } from "@apollo/client";
import {
  ADD_PROBLEM_TO_GROUP_SEASON_TOPIC,
  REMOVE_SEASON_TOPIC_PROBLEM,
} from "../../lib/apollo/Mutations/problemsMutations";
import { GraphqlUserRole } from "../../types/user";
import Button from "../common/Button";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import clsx from "clsx";
import { format } from "date-fns";

export type PlatformInfo = {
  id: string;
  name: string;
};

type Props = {
  problems: any[];
  seasonId?: string;
  topicId?: string;
  group?: boolean;
};

const ProblemsTable = ({ problems, seasonId, topicId, group }: Props) => {
  // const [titleAscending, setTitleAscending] = useState(false)
  // const [titleDescending, setTitleDescending] = useState(false)
  // const [difficultyAscending, setDifficultyAscending] = useState(false)
  // const [difficultyDescending, setDifficultyDescending] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [removeSeasonTopicProblem, { loading, error }] = useMutation(
    REMOVE_SEASON_TOPIC_PROBLEM
  );

  const [
    addGroupSeasonTopicProblems,
    { loading: addLoading, error: addError },
  ] = useMutation(ADD_PROBLEM_TO_GROUP_SEASON_TOPIC);
  const [selectedProblem, setSelectedProblem] = useState<Set<string>>(
    new Set([])
  );

  const allProblemsId = [...problems]?.map((problem: any) => problem.id);
  const [checkedAll, setCheckedAll] = useState(false);
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;

  const [selectedProblemsCount, setSelectedProblemsCount] = useState(0);

  const handleProblemCheck = (id: string) => {
    if (selectedProblem.has(id)) {
      selectedProblem.delete(id);
    } else {
      selectedProblem.add(id);
    }
    setSelectedProblemsCount(selectedProblem.size);
    if (checkedAll && selectedProblem.size !== allProblemsId.length) {
      setCheckedAll(false);
    }
  };

  const handleAllProblemCheck = () => {
    if (checkedAll) {
      setSelectedProblem(new Set());
      setSelectedProblemsCount(0);
    } else {
      setSelectedProblem(new Set([...allProblemsId]));
      setSelectedProblemsCount(allProblemsId.length);
    }
    setCheckedAll(!checkedAll);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleAddGroupSeasonTopicProblems = async () => {
    await addGroupSeasonTopicProblems({
      variables: {
        groupSeasonTopicId: {
          groupId: authUser.groupId,
          seasonId: seasonId,
          topicId: topicId,
        },
        problemIds: [...selectedProblem]
      },
      refetchQueries: "active",
      notifyOnNetworkStatusChange: true,
    })
  };
  return (
    <>
      {isDeleteModalOpen && (
        <DeletePopupModal
          title="Delete problem"
          errorMessage={(error as ApolloError)?.message || ""}
          isLoading={loading}
          description="This will remove the problem from this season topic"
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={async () => {
            await removeSeasonTopicProblem({
              variables: {
                seasonTopicProblemId: {
                  // problemId: problemId,
                  seasonId: seasonId,
                  topicId: topicId,
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
      <div className="overflow-x-auto relative bg-white border-blue-100 shadow-md sm:rounded-lg border p-4 ">
        <div className="flex justify-between mx-3 my-2 font-semibold text-md text-[#565656]">
          <h2>Problem Set</h2>
          {(authUser as any).role !== GraphqlUserRole.STUDENT && (
            <Button
              onClick={handleAddGroupSeasonTopicProblems}
              text={group ? "Remove Problem" : "Add New Problem"}
              classname={clsx(
                "bg-primary text-white text-xs",
                selectedProblemsCount === 0 ? "hidden" : ""
              )}
              isLoading={group ? false : addLoading}
            />
          )}
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-[#979797] bg-white ">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    checked={checkedAll}
                    onChange={() => handleAllProblemCheck()}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-white rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-white"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="flex flex-row gap-x-1">
                  <div className="text-[#979797]">Title</div>
                  <div className="flex flex-row">
                    <FaLongArrowAltUp className="-mr-2 pr-1" />
                    <FaLongArrowAltDown />
                  </div>
                </div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="flex flex-row gap-x-1">
                  <div className="text-[#979797]">Difficulty</div>
                  <div className="flex flex-row">
                    <FaLongArrowAltUp className="-mr-2 pr-1" />
                    <FaLongArrowAltDown />
                  </div>
                </div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="text-[#979797]">Platform</div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="text-[#979797]">Created at</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {problems ? (
              problems.map((problem: ProblemType, index: number) => {
                return (
                  <tr
                    className="bg-white text-[#565656] hover:bg-gray-50 dark:hover:bg-[#E2E2E2]"
                    key={problem.id}
                  >
                    <td className="p-4 w-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          name={`prob-${problem.id}`}
                          checked={selectedProblem.has(problem.id)}
                          onChange={() => handleProblemCheck(problem.id)}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700"
                        />
                        <label
                          htmlFor="checkbox-table-search-1"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td scope="row" className="py-4 px-6 whitespace-nowrap ">
                      <a
                        className="text-primary"
                        href={problem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {problem.title}
                      </a>
                    </td>
                    <td className="py-4 px-6">
                      <DifficultyChips
                        status={problem.difficulty?.toUpperCase()}
                      />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center flex-row gap-x-2 capitalize">
                        {getIcon(problem.platform?.toUpperCase())}
                        {problem.platform.toLowerCase()}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {format(new Date(problem.createdAt), "MMM dd yyyy")}
                    </td>
                  </tr>
                );
              })
            ) : (
              <h5>Problems Not Found</h5>
            )}
          </tbody>
        </table>
        {/* <nav
className="flex justify-between items-center pt-4"
aria-label="Table navigation"
>
<span className="text-sm font-normal text-gray-500 dark:text-gray-400">
Showing{" "}
<span className="font-semibold text-gray-900 dark:text-white">
1-10
</span>{" "}
of{" "}
<span className="font-semibold text-gray-900 dark:text-white">
1000
</span>
</span>
<ul className="inline-flex items-center -space-x-px">
<li>
<a
href="#"
className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
>
<span className="sr-only">Previous</span>
<svg
className="w-5 h-5"
aria-hidden="true"
fill="currentColor"
viewBox="0 0 20 20"
xmlns="http://www.w3.org/2000/svg"
>
<path
  fillRule="evenodd"
  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
  clipRule="evenodd"
></path>
</svg>
</a>
</li>
<li>
<a
href="#"
className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
>
1
</a>
</li>
<li>
<a
href="#"
className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
>
2
</a>
</li>
<li>
<a
href="#"
aria-current="page"
className="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
>
3
</a>
</li>
<li>
<a
href="#"
className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
>
...
</a>
</li>
<li>
<a
href="#"
className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
>
100
</a>
</li>
<li>
<a
href="#"
className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
>
<span className="sr-only">Next</span>
<svg
className="w-5 h-5"
aria-hidden="true"
fill="currentColor"
viewBox="0 0 20 20"
xmlns="http://www.w3.org/2000/svg"
>
<path
  fillRule="evenodd"
  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
  clipRule="evenodd"
></path>
</svg>
</a>
</li>
</ul>
</nav> */}
      </div>
    </>
  );
};
export default ProblemsTable;
