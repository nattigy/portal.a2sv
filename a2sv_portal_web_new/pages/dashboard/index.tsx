import React, { ReactNode } from "react";
import StudentLayout from "../../components/common/StudentLayout";
import { useReactiveVar } from "@apollo/client";
import { authenticatedUser } from "../../lib/constants/authenticated";
import HOEDashboard from "../../components/dashboard/HOEDashboard";
import HOADashboard from "../../components/dashboard/HOADashboard";
import StudentDashboard from "../../components/dashboard/StudentDashboard";
import { GraphqlUserRole } from "../../types/user";

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
      case GraphqlUserRole.STUDENT: {
        return <StudentDashboard />
      }
      case GraphqlUserRole.HEAD_OF_EDUCATIONS: {
        return <HOEDashboard />
      }
      case GraphqlUserRole.HEAD_OF_ACADEMY: {
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
