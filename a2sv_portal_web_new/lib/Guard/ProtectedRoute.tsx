import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { LoaderLarge } from "../../components/common/Loaders";

type Props = {
  children: JSX.Element;
  authUser: any;
};
const ProtectedRoute = ({ children, authUser }: Props) => {
  const router = useRouter();
  useEffect(() => {
    console.log(authUser, " is auth user");
    if (!authUser) {
      router.replace("/auth");
    }
  }, [authUser, router.isReady]);

  if (true) {
    return <div>{children}</div>;
  } else {
    return (
      <div className="min-h-screen min-w-full flex justify-center items-center">
        <LoaderLarge />
      </div>
    );
  }
};

export default ProtectedRoute;
