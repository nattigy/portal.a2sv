import React, { ReactNode } from "react";
import StudentLayout from "../../components/common/StudentLayout";
import UserItem from "../../components/dashboard/UserItem";
import UsersFilter from "../../components/dashboard/UsersFilter";
import { useState } from "react";
import UsersList from "../../components/dashboard/UsersList";
import UserRank from "../../components/personal-status/UserRank";

const IndexPage = () => {
  const Sidebar: React.FC = () => {
    return <UserRank />;
  };
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <StudentLayout sidebar={<Sidebar />}>
      <div>
        <h1 className="text-2xl font-bold mb-2">Users</h1>
        <UsersFilter handleTabChange={handleTabChange} activeIndex={tabIndex} />
        <UsersList />
      </div>
    </StudentLayout>
  );
};

export default IndexPage;
