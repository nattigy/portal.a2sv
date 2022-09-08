import React, { ReactNode, useEffect, useState } from "react";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import { MdContentPaste } from "react-icons/md";
import { DifficultyChips } from "./DifficultyChips";
import { getIcon } from "../../helpers/getReactIcon";
import {
    ProblemsInfo,
    ProblemDifficultyType,
    ProblemStatus,
} from "../../types/problems";
import CustomLink from "../common/CustomLink";
import ProblemModalDetail from '../../components/modals/ProblemDetailModal'
import ProblemsTable from "./ProblemsTable";
import { useReactiveVar } from "@apollo/client";
import { authenticatedUser } from "../../lib/constants/authenticated";
import { GraphqlUserRole } from "../../types/user";
import NewProblemModal from "../modals/NewProblemModal";
import useAllGroups from "../../lib/hooks/useAllGroups";
import useAllProblems from "../../lib/hooks/useAllProblems";
import { LoaderSmall } from "../common/Loaders";

export type PlatformInfo = {
    id: string;
    name: string;
};

const ProblemsPage = () => {
    // const problems: Array<ProblemsInfo> = [
    //     {
    //         id: 1,
    //         name: "Min Cost Climbing Stairs",
    //         difficulty: ProblemDifficultyType.EASY,
    //         platform: {
    //             id: "leetcode",
    //             name: "Leetcode",
    //         },
    //         status: ProblemStatus.SOLVED,
    //     },
    //     {
    //         id: 2,
    //         name: "Min Cost Falling Stairs",
    //         difficulty: ProblemDifficultyType.MEDIUM,
    //         platform: {
    //             id: "hackerrank",
    //             name: "Hackerrank",
    //         },
    //         status: ProblemStatus.SOLVED,
    //     },
    //     {
    //         id: 3,
    //         name: "Min Cost Tripping Stairs",
    //         difficulty: ProblemDifficultyType.HARD,
    //         platform: {
    //             id: "codeforces",
    //             name: "Codeforces",
    //         },
    //         status: ProblemStatus.SOLVED,
    //     },
    //     {
    //         id: 4,
    //         name: "Max Cost Tripping Stairs",
    //         difficulty: ProblemDifficultyType.HARD,
    //         platform: {
    //             id: "geeksforgeeks",
    //             name: "GeeksForGeeks",
    //         },
    //         status: ProblemStatus.SOLVED,
    //     },
    // ];

    const authUser = useReactiveVar(authenticatedUser);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { loading, data, refetch, error } = useAllProblems()
    const [problems, setProblems] = useState<ProblemsInfo[]>([])
    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleSearch = (e: any) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        if (data) {
            setProblems(data.problems)
        }
    }, [refetch, data])



    return (
        <>
            {isModalOpen && (
                <NewProblemModal onClose={() => setIsModalOpen(false)} />
            )}
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
                                <button
                                    onClick={handleModalOpen}
                                    className="flex justify-center items-center min-w-min px-6 py-3 text-sm font-semibold text-white bg-primary rounded-lg"
                                >
                                    Add New Problem
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {
                    loading ? (
                        <div className="w-full flex items-center justify-center">
                            <LoaderSmall />
                        </div>
                    ) : (
                        <ProblemsTable problems={problems} />
                    )
                }
            </div>
        </>
    );
};
export default ProblemsPage;
