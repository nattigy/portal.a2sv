import React, { useState, useEffect } from "react";
import SearchField from "../common/SearchField";
import AddQuestionListItem, { QuestionsInfo } from "./AddQuestionListItem";

export type UserProps = {
  id?: number;
  fullname: string;
};
type Props = {
  questions: Array<QuestionsInfo>;
};

const AddQuestionsList = (props: Props) => {
  const [searchQuestions, setSearchQuestions] = useState<Array<any>>(
    props.questions
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(0);
  //   const [addStudentsToGroup, { loading, data, error }] = useMutation(ADD_STUDENTS_TO_GROUP)
  //   const [isLoading, setIsLoading] = useState(false)
  //   const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    setSearchQuestions(props.questions);
  }, [props.questions]);

  const [selectedQuestion, setSelectedQuestion] = useState<Set<number>>(
    new Set([])
  );

  const handleQuestionCheck = (id: number) => {
    if (selectedQuestion.has(id)) {
      selectedQuestion.delete(id);
    } else {
      selectedQuestion.add(id);
    }
    setSelectedQuestionCount(selectedQuestion.size);
  };

  useEffect(() => {
    let searchedData = props.questions;
    searchedData = props.questions?.filter((question) => {
      return question.name
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());
    });
    setSearchQuestions(searchedData);
  }, [searchQuery]);

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

  //     const updateGroupInput = {
  //       id: parseInt(props.groupId.toString()),
  //       users: updateValue
  //     }
  //     console.log(updateValue, updateGroupInput, props.groupId, " is the selected data")

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
      {/* <div className="flex justify-between items-center">
        <h1 className="font-medium text-sm">Add Students <span className="font-light text-xs pl-1">{selectedQuestion.size}/{`${props.questions?.length}`}</span></h1>
        <button onClick={handleAddStudents} className="flex justify-center items-center w-20 py-2 bg-[#5956E9] rounded-lg text-center text-white font-medium text-sm">
          {
            loading && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )
          }
          Add
        </button>
      </div> */}
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
          <div className="hover:bg-[#5956E91F]" key={index}>
            <AddQuestionListItem
              questionProps={question}
              handleQuestionCheck={handleQuestionCheck}
            />
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
