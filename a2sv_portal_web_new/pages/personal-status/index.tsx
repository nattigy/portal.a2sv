import React, { ReactNode } from "react";
import StudentLayout from "../../components/common/StudentLayout";

const IndexPage = () => {
  const Sidebar: React.FC = () => {
    return <h1>Personal Status Sidebar</h1>;
  };

  return (
    <StudentLayout sidebar={<Sidebar />}>
      <div>Personal Status</div>
    </StudentLayout>
  );
};

export default IndexPage;
