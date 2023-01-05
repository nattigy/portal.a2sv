import { useReactiveVar } from "@apollo/client";
import React, { ReactNode, useEffect, useState } from "react";
import BaseLayout from "../../../components/common/BaseLayout";
import { LoaderSmall } from "../../../components/common/Loaders";
import ProfileInfo from "../../../components/profile/ProfileInfo";
import {
  authenticatedUser,
  AuthUser,
} from "../../../lib/constants/authenticated";
import { useGetUserProfile } from "../../../lib/hooks/useUsers";
import { UserProfile } from "../../../types/user";

const IndexPage = () => {
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;
  const { data, loading, error, refetch } = useGetUserProfile(authUser.id);

  return (
    <BaseLayout>
      {/* <ProfileInfo userProfile={data?.user.userProfile} /> */}
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <LoaderSmall />
        </div>
      ) : data ? (
        <ProfileInfo userProfile={data.user.userProfile} />
      ) : (
        <p>Something went wrong</p>
      )}
    </BaseLayout>
  );
};

export default IndexPage;
