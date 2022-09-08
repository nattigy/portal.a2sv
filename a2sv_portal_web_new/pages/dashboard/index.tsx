import React, { ReactNode } from "react";
import { useReactiveVar } from "@apollo/client";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import HOEDashboard from "../../components/dashboard/HOEDashboard";
import HOADashboard from "../../components/dashboard/HOADashboard";
import StudentDashboard from "../../components/dashboard/StudentDashboard";
import { GraphqlUserRole } from "../../types/user";

const IndexPage = () => {
  const authUser = useReactiveVar(authenticatedUser) as AuthUser
  console.log(authUser as any, " authUsers")
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
      case GraphqlUserRole.HEAD_OF_EDUCATION: {
        return <HOEDashboard groupId={authUser.headToGroup.id} />
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
