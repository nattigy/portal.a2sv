import clsx from "clsx";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { ProblemDifficultyType } from "../../types/problems";
import CustomLink from "../common/CustomLink";
import Tag from "../common/Tag";
import { DifficultyChips } from "../problems/DifficultyChips";

export type NewContestQuestionProps = {
  id: number;
  title: string;
  difficulty: ProblemDifficultyType;
  tags: Array<string>;
};


type Props = {
  formik: any;
  questions?: Array<any>;
  handleUnselectQuestion: any;
};

const QuestionsItem = ({ questions, handleUnselectQuestion, formik }: Props) => {

  return (
    <div className="flex flex-col bg-white ">
      <h1 className="p-6 font-semibold">Questions</h1>
      <div className="overflow-x-auto ">
        {questions && questions?.length > 0 ? (
          <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">
            <thead className="text-[#979797] bg-white">
              <tr >
                <th scope="col" className="p-2 px-4">
                  <div className="flex flex-row">
                    <div className="text-[#979797]"></div>
                  </div>
                </th>
                <th scope="col" className="p-2">
                  <div className="flex flex-row gap-x-1">
                    <div className="text-[#979797] font-medium">Title</div>
                  </div>
                </th>
                <th scope="col" className="p-2">
                  <div className="flex flex-row gap-x-1">
                    <div className="text-[#979797] font-medium">
                      Difficulty
                    </div>
                  </div>
                </th>
                <th scope="col" className="p-2">
                  <div className="text-[#979797] font-medium">Tags</div>
                </th>
                <th scope="col" className="p-2">
                  <div className="text-[#979797]"></div>
                </th>
              </tr>
            </thead>
            <tbody >
              {questions.map(
                (question: any, index: number) => {
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
                        className="px-4 py-4 whitespace-nowrap"
                      >
                        <div>{index + 1}</div>
                      </td>
                      <td scope="row" className="w-52  pl-2 py-4 whitespace-wrap">
                          <p className="w-48 font-semibold">{question.title}</p>
                      
                      </td>
                      <td
                        scope="row"
                        className="px-2 py-4 whitespace-nowrap"
                      >
                        <DifficultyChips status={question.difficulty} />
                      </td>
                      <td scope="row" className="py-4 px-2">
                        <div
                          key={index}
                          className="flex flex-wrap w-[620px] gap-y-2 gap-x-3"
                        >
                          {question.tags &&
                            question.tags.map((tag: any, index: number) => {
                              return (
                                <Tag value={tag} key={index}>
                                  <p className="font-semibold">{tag.name}</p>
                                </Tag>
                              );
                            })}
                        </div>
                      </td>
                      <td scope="row" className="w-full whitespace-nowrap pr-5">
                        <FaTrashAlt onClick={()=>handleUnselectQuestion(question.id)} color="#EF2118" size={16} className="m-auto" />
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
