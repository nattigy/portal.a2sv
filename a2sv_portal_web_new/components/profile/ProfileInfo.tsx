import React, { ReactNode, useEffect, useState } from "react";
import BaseLayout from "../common/BaseLayout";
import router from "next/router";
import ProfileFilter from "./ProfileFilter";
import PersonalDetails from "./PersonalDetails";
import ProgrammingDetails from "./ProgrammingDetails";
import SocialMediaDetails from "./SocialMediaDetails";

type Props = {
  groupId?: number;
};

const ProfileInfo = (props: Props) => {
  // const [currentPath, setCurrentPath] = useState<number>(0)
  const [tabIndex, setTabIndex] = useState(0);

  // useEffect(() => {
  //   setCurrentPath(props.groupId)
  // }, [router.pathname])

  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <BaseLayout>
      <div className="flex flex-col relative py-2 pr-4">
        <h1 className="text-2xl font-bold mb-4">Personal Profile</h1>
        <ProfileFilter
          handleTabChange={handleTabChange}
          activeIndex={tabIndex}
        />
        {/* {loading ? (
          <div className="w-full flex justify-center">
            <LoaderSmall color="#5956E9" />
          </div>
        ) : ( */}
        <div className="">
          {tabIndex == 0 && <PersonalDetails />}
          {tabIndex == 1 && <SocialMediaDetails />}
          {tabIndex == 2 && <ProgrammingDetails />}
        </div>
      </div>
    </BaseLayout>
  );
};

export default ProfileInfo;
