import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CommonAutocomplete from "../common/CustomAutocomplete";
import { useFilteredUsers } from "../../lib/hooks/useUsers";

type Props = {
  handleSearchStudent: (value: any) => void;
  user?: any;
};

export type UserType = {
  id: number;
  email: string;
};

export default function HOEAutocomplete({ handleSearchStudent, user }: Props) {
  const [usersData, setUsersData] = useState([]);
  const [loadUsers, { loading, data, error, refetch }] = useFilteredUsers(2);
  const [selectedHOE, setSelectedHOE] = useState(user);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    if (data) {
      setUsersData(data.users.items);
    }
  }, [refetch, data]);

  const filteredStudents =
    query === ""
      ? usersData
      : usersData.filter((student: UserType) =>
        student.email
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      );
  const handleSearchQuery = (event: any) => {
    setQuery(event.target.value.trim());
  };
  const handleSelectHOE = (val: any) => {
    setSelectedHOE(val);
    handleSearchStudent(val);
    // setQuery(val.title)
  };

  return (
    <CommonAutocomplete
      placeholder="Search student"
      filteredValues={filteredStudents}
      query={query}
      selectedValue={selectedHOE}
      handleSearchQuery={handleSearchQuery}
      handleSelectValue={handleSelectHOE}
    />
  );
}
