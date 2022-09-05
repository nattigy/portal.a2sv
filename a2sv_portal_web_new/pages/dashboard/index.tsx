import React, { ReactNode } from "react";
import StudentLayout from "../../components/common/StudentLayout";
import { useReactiveVar } from "@apollo/client";
import { authenticatedUser } from "../../lib/constants/authenticated";
import HOEDashboard from "../../components/dashboard/HOEDashboard";
import HOADashboard from "../../components/dashboard/HOADashboard";
import StudentDashboard from "../../components/dashboard/StudentDashboard";

const IndexPage = () => {
  const authUser = useReactiveVar(authenticatedUser)

  const ActiveComponent = ({ user }: {
    user: {
      id: string,
      role: string, status: string
      email: string,
    }
  }) => {

    switch (user.role) {
      case "STUDENT": {
        return <StudentDashboard />
      }
      case "HOE": {
        return <HOEDashboard />
      }
      case "HOA": {
        return <HOADashboard />
      }
      default: {
        return <StudentDashboard />
      }
    }

  }
  return (
    < >
      <ActiveComponent user={authUser as any} />
    </>
  );
};

export default IndexPage;
