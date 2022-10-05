import clsx from "clsx";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { ProblemDifficultyType } from "../../types/problems";
import Tag from "../common/Tag";
import { DifficultyChips } from "../problems/DifficultyChips";

export type NewContestQuestionProps = {
  id: number;
  title: string;
  difficulty: ProblemDifficultyType;
  tags: Array<string>;
};

type Props = {
  questions?: Array<NewContestQuestionProps>;
};

const QuestionsItem = ({ questions }: Props) => {
  return (
    <div className="flex flex-col gap-2 bg-white">
      <h1 className="p-6 font-semibold">Questions</h1>
      <div className="w-full overflow-x-auto relative bg-white sm:rounded-lg">
        {questions ? (
          <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">
            <thead className="text-[#979797] bg-white">
              <tr> 
                <th scope="col" className="p-2 px-4">
                  <div className="flex flex-row">
                    <div className="text-[#979797] font-semibold"></div>
                  </div>
                </th>
                <th scope="col" className="p-2">
                  <div className="flex flex-row gap-x-1">
                    <div className="text-[#979797] font-semibold">Title</div>
                  </div>
                </th>
                <th scope="col" className="p-2">
                  <div className="flex flex-row gap-x-1">
                    <div className="text-[#979797] font-semibold">
                      Difficulty
                    </div>
                  </div>
                </th>
                <th scope="col" className="p-2">
                  <div className="text-[#979797]">Tags</div>
                </th>
                <th scope="col" className="p-2">
                  <div className="text-[#979797]"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {questions.map(
                (question: NewContestQuestionProps, index: number) => {
                  return (
                    <tr
                      className={clsx(
                        "text-[#565656] hover:bg-gray-50 dark:hover:bg-[#E2E2E2]",
                        index % 2 == 0 ? "bg-[#F6F6FC]" : "bg-white"
                      )}
                      key={index}
                    >
                      <td
                        scope="row"
                        className="w-8 px-4 py-4 whitespace-nowrap"
                      >
                        <div>{index + 1}</div>
                      </td>
                      <td scope="row" className="w-1/4 pl-2 py-4 whitespace">
                        <div className="text-xs font-semibold">{question.title}</div>
                      </td>
                      <td
                        scope="row"
                        className="w-1/6 px-2 py-4 whitespace-nowrap"
                      >
                        <DifficultyChips status={question.difficulty} />
                      </td>
                      <td scope="row" className="w-1/2 py-4 px-2">
                        <div
                          key={index}
                          className="flex flex-wrap gap-y-2 gap-x-3"
                        >
                          {question.tags &&
                            question.tags.map((tag: string, index: number) => {
                              return (
                                <Tag value={tag} key={index}>
                                  <h1 className="font-semibold">{tag}</h1>
                                </Tag>
                              );
                            })}
                        </div>
                      </td>
                      <td scope="row" className="pl-2 py-4 whitespace-nowrap">
                        <FaTrashAlt size={16} />
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        ) : (
          <div className="w-full flex flex-col gap-y-8 items-center">
            <img src="/icons/empty-questions.svg" alt="" />
            <h1 className="w-1/3 text-center text-sm">
              You haven’t added any questions yet. Choose any questions from the
              list or search for a question.{" "}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionsItem;
