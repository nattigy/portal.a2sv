import React, { useState, useEffect } from "react";
import CustomLink from "../common/CustomLink";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddStudentListItem, { StudentsInfo } from "./AddStudentListItem";
import { UserRoleType } from "../../types/user";
import { useGetUsersWithNoGroup, useUsersByGroupId } from "../../lib/hooks/useUsers";
import { LoaderSmall } from "../common/Loaders";
import SearchField from "../common/SearchField";
import { ApolloError, useMutation } from "@apollo/client";
import { ADD_STUDENTS_TO_GROUP } from "../../lib/apollo/Mutations/usersMutations";

export type UserProps = {
  id?: number;
  fullname: string;
};
type Props = {
  students: Array<StudentsInfo>
}

const AddStudentList = (props: Props) => {
  const [searchStudents, setSearchStudents] = useState<Array<any>>(props.students)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStudentCount, setSelectedStudentCount] = useState(0)
  const [addStudentsToGroup] = useMutation(ADD_STUDENTS_TO_GROUP)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    setSearchStudents(props.students)
  }, [props.students])

  const [selectedStudent, setSelectedStudent] = useState<Set<number>>(new Set([]))

  const handleStudentCheck = (id: number) => {
    if (selectedStudent.has(id)) {
      selectedStudent.delete(id)
    } else {
      selectedStudent.add(id)
    }
    setSelectedStudentCount(selectedStudent.size)
  }

  useEffect(() => {
    let searchedData = props.students
    searchedData = props.students.filter(student => {
      return student.email.toLowerCase().includes(searchQuery.trim().toLowerCase())
    })
    setSearchStudents(searchedData)
  }, [searchQuery])

  const handleSearchQueryChange = (text: string) => {
    setSearchQuery(text)
  }

  const handleAddStudents = async () => {
    setIsLoading(true)
    console.log(selectedStudent, " is the soelected data")
    await addStudentsToGroup({
      variables: {
        updateGroupInput: {
          id: 1,
          studentsId: []
        }
      },
      refetchQueries: "active",
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        setIsLoading(false)
      },
      onError: (error) => {
        setErrorMessage((error as ApolloError).message);
        setIsLoading(false)

      }
    })
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-lg">Add Students <span className="font-light text-xs pl-1">{selectedStudent.size}/{`${props.students.length}`}</span></h1>
        <button onClick={handleAddStudents} className="w-20 py-2 bg-[#5956E9] rounded-lg text-center text-white font-medium text-sm">
          Add
        </button>
      </div>
      <div className="w-full">
        <SearchField onChange={handleSearchQueryChange} placeholder="Search student" id="" className="" />
      </div>
      {
        searchStudents.length > 0 ? (
          searchStudents.map((student, index) => (
            <div className="hover:bg-[#5956E91F]" key={index}>
              <AddStudentListItem
                studentProps={student}
                handleStudentCheck={handleStudentCheck}
              />
            </div>
          ))
        ) : (
          <div className="h-full bg-red-400">
            <h1>No students yet!</h1>
          </div>
        )}
    </div>
  );
};

export default AddStudentList;
