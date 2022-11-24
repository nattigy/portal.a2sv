import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import authenticatedVar from "../constants/authenticated";

type Props = {
  children: JSX.Element;
  authUser: any;
};
const PublicRoute = ({ authUser, children }: Props) => {
  const router = useRouter();
  const authenticated = useReactiveVar(authenticatedVar);

  useEffect(() => {
    if (authUser) {
      router.replace("/dashboard");
    }
  }, [authUser, authenticated, router]);

  return <div>{children}</div>;
};

export default PublicRoute;
