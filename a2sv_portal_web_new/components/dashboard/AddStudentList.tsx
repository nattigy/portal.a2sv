import React, { useState, useEffect } from "react";
import AddStudentListItem, { StudentsInfo } from "./AddStudentListItem";
import SearchField from "../common/SearchField";
import { ApolloError, useMutation } from "@apollo/client";
import { ADD_STUDENTS_TO_GROUP } from "../../lib/apollo/Mutations/groupsMutations";

export type UserProps = {
  id?: number;
  fullname: string;
};
type Props = {
  students: Array<StudentsInfo>;
  groupId: string;
};

const AddStudentList = (props: Props) => {
  const [searchStudents, setSearchStudents] = useState<Array<any>>(
    props.students
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Set<number>>(
    new Set([])
  );
  const [selectedStudentCount, setSelectedStudentCount] = useState(0);
  const [addStudentsToGroup, { loading, data, error }] = useMutation(
    ADD_STUDENTS_TO_GROUP
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setSearchStudents(props.students);
  }, [props.students]);

  const handleStudentCheck = (id: number) => {
    if (selectedStudent.has(id)) {
      selectedStudent.delete(id);
    } else {
      selectedStudent.add(id);
    }
    setSelectedStudentCount(selectedStudent.size);
  };

  useEffect(() => {
    let searchedData = props.students;
    searchedData = props.students?.filter((student) => {
      return student.email
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());
    });
    setSearchStudents(searchedData);
  }, [searchQuery]);

  const handleSearchQueryChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleAddStudents = async () => {
    setIsLoading(true);
    const updateValue = [...selectedStudent].map((id: any) => {
      return id;
    });

    await addStudentsToGroup({
      variables: {
        groupId: props.groupId,
        studentIds: updateValue,
      },
      refetchQueries: "active",
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        setIsLoading(false);
      },
      onError: (error) => {
        setErrorMessage((error as ApolloError).message);
        setIsLoading(false);
      },
    });
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-sm">
          Add Students{" "}
          <span className="font-light text-xs pl-1">
            {selectedStudent.size}/{`${props.students?.length}`}
          </span>
        </h1>
        <button
          onClick={handleAddStudents}
          className="flex justify-center items-center w-20 py-2 bg-[#5956E9] rounded-lg text-center text-white font-medium text-sm"
        >
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          Add
        </button>
      </div>
      <div className="w-full">
        <SearchField
          onChange={handleSearchQueryChange}
          placeholder="Search student"
          id=""
          className=""
        />
      </div>
      {searchStudents?.length > 0 ? (
        searchStudents.map((student, index) => (
          <div className="hover:bg-[#5956E91F]" key={index}>
            <AddStudentListItem
              studentProps={student}
              handleStudentCheck={handleStudentCheck}
            />
          </div>
        ))
      ) : (
        <div className="h-full">
          <h1>No students yet!</h1>
        </div>
      )}
    </div>
  );
};

export default AddStudentList;
