import React, { useState } from "react";
import StudentLayout from "../common/StudentLayout";

type Props = {};

const HOADashboard = (props: Props) => {
  const Sidebar: React.FC = () => {
    return <div></div>;
  };
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <StudentLayout>
      <div>
        <h1 className="text-2xl font-bold mb-2">HOA Dashboard</h1>
      </div>
    </StudentLayout>
  );
};

export default HOADashboard;
