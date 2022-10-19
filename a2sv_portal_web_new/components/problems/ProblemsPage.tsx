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
import SearchField from "../common/SearchField";
import EmptyState from "../common/EmptyState";

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
         <SearchField onChange={(e)=>handleSearch} placeholder='Search a problem' id='problem'/>
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
        ) : error?<p>Something went wrong</p>:problems.length===0?<EmptyState/>: (
          <ProblemsTable problems={problems} />
        )}
      </div>
    </>
  );
};
export default ProblemsPage;
