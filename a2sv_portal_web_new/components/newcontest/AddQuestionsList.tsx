import React, { useState, useEffect } from "react";
import SearchField from "../common/SearchField";
import AddQuestionListItem, { QuestionsInfo } from "./AddQuestionListItem";

export type UserProps = {
  id?: number;
  fullname: string;
};
type Props = {
  questions: Array<QuestionsInfo>;
  handleSelect: (question: any) => void;
};

const AddQuestionsList = ({ questions, handleSelect }: Props) => {
  const [searchQuestions, setSearchQuestions] = useState<Array<any>>(questions);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchQuestions(questions);
  }, [questions]);

  useEffect(() => {
    const searchedData = questions?.filter((question) => {
      return question.title
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());
    });
    setSearchQuestions(searchedData);
  }, [questions, searchQuery]);

  const handleSearchQueryChange = (text: string) => {
    setSearchQuery(text);
  };

  //   const handleAddQuestions = async () => {
  //     setIsLoading(true)
  //     const updateValue = [...selectedQuestion].map((id: any) => {
  //       return {
  //         id: parseInt(id.toString())
  //       }
  //     })

  //     await addStudentsToGroup({
  //       variables: {
  //         updateGroupInput
  //       },
  //       refetchQueries: "active",
  //       notifyOnNetworkStatusChange: true,
  //       onCompleted: (data) => {
  //         setIsLoading(false)
  //       },
  //       onError: (error) => {
  //         setErrorMessage((error as ApolloError).message);
  //         setIsLoading(false)

  //       }
  //     })
  //     setIsLoading(false)
  //   }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Questions</h1>
        <select className="focus:outline-none text-xs rounded-md">
          <option value="" selected disabled hidden></option>
          <option>Codeforces</option>
          <option>Leetcode</option>
          <option>Hackerrank</option>
        </select>
      </div>
      <div className="w-full">
        <SearchField
          onChange={handleSearchQueryChange}
          placeholder="Search question"
          id=""
          className=""
        />
      </div>
      {searchQuestions?.length > 0 ? (
        searchQuestions.map((question, index) => (
          <div
            onClick={() => handleSelect(question)}
            className="hover:bg-[#5956E91F]"
            key={index}
          >
            <AddQuestionListItem questionProps={question} />
          </div>
        ))
      ) : (
        <div className="h-full">
          <h1>No Questions found!</h1>
        </div>
      )}
    </div>
  );
};

export default AddQuestionsList;
