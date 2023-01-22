import { useReactiveVar } from "@apollo/client";
import React from "react";
import BaseLayout from "../../components/common/BaseLayout";
import ProfileDetails from "../../components/profile/ProfileDetails";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import { useGetUserProfile } from "../../lib/hooks/useUsers";

const ProfilePage = () => {
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;

  const { data, loading, error, refetch } = useGetUserProfile(authUser.id);
  return (
    <BaseLayout>
      <ProfileDetails userProfile={data?.user?.userProfile} user={authUser} />
    </BaseLayout>
  );
};

export default ProfilePage;
