import React, { ReactNode, useEffect, useState } from "react";
import {
  ProblemsInfo,
} from "../../types/problems";
import ProblemsTable from "./ProblemsTable";
import { useReactiveVar } from "@apollo/client";
import { authenticatedUser } from "../../lib/constants/authenticated";
import { GraphqlUserRole } from "../../types/user";
import NewProblemModal from "../modals/NewProblemModal";
import useAllProblems, {
} from "../../lib/hooks/useAllProblems";
import { LoaderSmall } from "../common/Loaders";
import Button from "../common/Button";

export type PlatformInfo = {
  id: string;
  name: string;
};
type ProblemsPageProps = {
  seasonId: number;
  groupId: number;
  topicId: number;
};

const ProblemsPage = (props:ProblemsPageProps) => {
  const authUser = useReactiveVar(authenticatedUser);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { loading, data, refetch, error } = useAllProblems();
  const [problems, setProblems] = useState<ProblemsInfo[]>([]);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (data) {
      setProblems(data.problems);
    }
  }, [refetch, data]);

  return (
    <>
      {isModalOpen && <NewProblemModal {...props} onClose={() => setIsModalOpen(false)} />}
      <div className="h-screen font-semibold text-[#565656]">
        <div className="flex flex-row items-center justify-between my-6 font-semibold text-xl text-[#565656]">
          <div className="p-2 pl-2">
            <label htmlFor="table-search" className="sr-only">
              Search a problem
            </label>
            <div className="relative flex items-center mt-1">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="bg-white text-gray-400 font-medium text-sm rounded-full px-2  appearance-none  dark:appearance-none focus:ring-0 focus:border-none dark:border-transparent border-transparent block w-80 pl-10 p-2.5  dark:bg-white  dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-0 dark:focus:border-none"
                onChange={handleSearch}
                value={searchQuery}
                placeholder="Search a problem"
              />
            </div>
          </div>
          <div>
            {(authUser as any).role !== GraphqlUserRole.STUDENT && (
              <div className="flex justify-end items-center px-5">
                <Button onClick={handleModalOpen} text="Add New Problem"/>
              </div>
            )}
          </div>
        </div>
        {loading ? (
          <div className="w-full flex items-center justify-center">
            <LoaderSmall />
          </div>
        ) : (
          <ProblemsTable problems={problems} />
        )}
      </div>
    </>
  );
};
export default ProblemsPage;
