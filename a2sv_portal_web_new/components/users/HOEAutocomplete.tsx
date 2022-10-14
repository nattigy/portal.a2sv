import { useEffect, useState } from "react";
import CommonAutocomplete from "../common/CustomAutocomplete";
import { useFilteredUsers } from "../../lib/hooks/useUsers";

type Props = {
  handleSearchStudent: (value: any) => void;
};
export type UserType = {
  id: number;
  email: string;
};
export default function HOEAutocomplete({ handleSearchStudent }: Props) {
  const [query, setQuery] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [loadUsers, { loading, data, error, refetch }] = useFilteredUsers(2);
  const [selectedHOE, setSelectedHOE] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (data) {
      setUsersData(data.users);
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
    console.log(val, " is value");
    setSelectedHOE(val);
    handleSearchStudent(val);
    // setQuery(val.title)
  };

  return (
    <CommonAutocomplete
      filteredValues={filteredStudents}
      query={query}
      selectedValue={selectedHOE}
      handleSearchQuery={handleSearchQuery}
      handleSelectValue={handleSelectHOE}
    />
  );
}
