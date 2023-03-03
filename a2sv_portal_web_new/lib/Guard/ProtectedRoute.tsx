import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { LoaderLarge } from "../../components/common/Loaders";
import { UserStatusType } from "../../types/profile";

type Props = {
  children: JSX.Element;
  authUser: any;
};
const ProtectedRoute = ({ children, authUser }: Props) => {
  const router = useRouter();
  useEffect(() => {
    if (!authUser) {
      router.replace("/auth");
    } else {
      if (authUser.status === UserStatusType.INACTIVE) {
        router.replace("/profile/edit");
      }
    }
  }, [authUser]);

  const hasFilledProfile = authUser && authUser.status === UserStatusType.ACTIVE;

  if (!hasFilledProfile && router.pathname !== "/profile/edit") {
    router.replace("/profile/edit");
    return null;
  }

  if (authUser) {
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
