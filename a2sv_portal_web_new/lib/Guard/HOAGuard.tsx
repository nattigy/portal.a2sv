import { useReactiveVar } from "@apollo/client";
import React, { useEffect } from "react";
import { GraphqlUserRole } from "../../types/user";
import { authenticatedUser, AuthUser } from "../constants/authenticated";
import { useRouter } from "next/router";

type Props = {
  children: JSX.Element;
};

const HOAGuard = ({ children }: Props) => {
  const router = useRouter();
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;
  useEffect(() => {
    if (authUser.role != GraphqlUserRole.HEAD_OF_ACADEMY) {
      router.replace("/dashboard");
    }
  }, [router.pathname, authUser?.role]);

  return children;
};

export default HOAGuard;
