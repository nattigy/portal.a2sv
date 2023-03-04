import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { AuthUser } from "../../lib/constants/authenticated";
import { UserProfile } from "../../types/user";
import Button from "../common/Button";
type Props = {
  userProfile: UserProfile;
  user: AuthUser;
};
const ProfileDetails = ({ userProfile, user }: Props) => {
  const router = useRouter();
  const goToEditProfile = () => {
    router.push("/profile/edit");
  };

  const socialHandles = [
    { id: 1, icon: "/icons/telegram.svg", link: userProfile?.telegram },
    { id: 2, icon: "/icons/linkedin.svg", link: userProfile?.linkedin },
    { id: 3, icon: "/icons/twitter.svg", link: userProfile?.twitter },
    { id: 4, icon: "/icons/instagram.svg", link: userProfile?.instagram },
  ];

  const programmingHandles = [
    {
      id: 1,
      name: "Leetcode",
      handle: userProfile?.leetcode,
      icon: "/icons/leetcode.svg",
    },
    {
      id: 2,
      name: "Codeforces",
      handle: userProfile?.codeforces,
      icon: "/icons/codeforces.svg",
    },
    {
      id: 3,
      name: "Hackerrank",
      handle: userProfile?.hackerrank,
      icon: "/icons/hackerrank.svg",
    },
    {
      id: 4,
      name: "Geeksforgeeks",
      handle: userProfile?.geekforgeeks,
      icon: "/icons/geeksforgeeks.svg",
    },
  ];

  type basicInfoType = {
    name: string;
    phone: string;
    email: string;
    country: string;
    city: string;
  };

  type workInfoType = {
    education_Institute: string;
    education_Status: string;
    work_Status: string;
  };

  const basicInfo: basicInfoType = {
    name: `${userProfile?.firstName} ${userProfile?.lastName}`,
    phone: userProfile?.phone,
    email: user?.email,
    country: userProfile?.country,
    city: userProfile?.city,
  };

  const workInfo: workInfoType = {
    education_Institute: userProfile?.educationPlace,
    education_Status: userProfile?.currentEducationStatus.toLowerCase(),
    work_Status: userProfile?.currentWorkStatus.toLowerCase(),
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className={`w-full lg:w-1/3 overflow-hidden`}>
        <div className="rounded-md border-b border-gray-200 bg-white px-4 py-5 sm:px-6 mb-4">
          <div className="p-4">
            <img
              className="rounded-lg w-full"
              alt="Profile"
              src="https://picsum.photos/350/200"
            />

            <p className="uppercase text-center p-4 text-xl">
              {basicInfo.name}
            </p>

            <div className="grid grid-cols-4 w-full items-center ">
              {socialHandles.map((handle) => (
                <div
                  key={handle.id}
                  title={handle.link}
                  className="cursor-pointer flex border items-center justify-self-center justify-center border-primary w-12 h-12 rounded-full"
                >
                  <div className="w-6 h-6 rounded-full">
                    <img src={handle.icon} width={50} alt="" />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={goToEditProfile}
              className="hover:opacity-80 transition duration-300 ease-in-out flex items-center justify-center w-full h-12 bg-primary text-white rounded-md p-4 my-6"
            >
              Edit
            </button>
          </div>
        </div>
        <div className="rounded-md border-b border-gray-200 bg-white px-4 py-2 sm:px-6">
          <p className="uppercase text-center p-4 text-xl">
            Programming Site Handles
          </p>
          <ul role="list" className="divide-y divide-gray-200">
            {programmingHandles.map((programmingHandle) => (
              <li
                key={programmingHandle.id}
                className="flex p-4 items-center cursor-pointer hover:bg-[#F9F9F9] w-full"
              >
                <div className="rounded-full bg-primary-lite flex justify-center items-center min-w-[50px] min-h-[50px] flex-1">
                  <img
                    className="w-6 h-6"
                    src={programmingHandle.icon}
                    alt=""
                  />
                </div>

                <div className="mx-3 w-full flex-3 max-w-[70%]">
                  <p className="text-md font-medium text-gray-900 ">
                    {programmingHandle.name}
                  </p>
                  <p className="text-md text-gray-500 mt-1 text-ellipsis overflow-hidden w-full">
                    {programmingHandle.handle}
                  </p>
                </div>
                {/* <div className="flex-1" /> */}
                <img
                  className="h-4 w-4 flex-1"
                  src="/icons/openlink.svg"
                  alt=""
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={`w-full lg:w-2/3 rounded-md border-b border-gray-200 bg-white px-4 py-5 sm:px-6`}
      >
        <div className="p-6 pb-3 uppercase text-start text-xl">Bio</div>
        <div className="px-6 font-light">{userProfile?.bio}</div>
        <div className="flex items-center px-6 py-8">
          <div className="border border-gray text-sm text-center flex-1 h-0" />
        </div>
        <div>
          <p className="uppercase p-6 pt-3 text-xl">Basic Info</p>
          {Object.entries(basicInfo).map(
            (value: [string, string], index: number) => (
              <div className="flex px-6 py-2" key={value[0]}>
                <p className="capitalize mr-4 text-[#979797]">{value[0]}:</p>
                <p>{value[1]}</p>
              </div>
            )
          )}
        </div>
        <div className="flex items-center px-6 py-8">
          <div className="border border-gray text-sm text-center flex-1 h-0" />
        </div>

        <div>
          <p className="uppercase p-6 text-xl">Work and Education</p>
          {Object.entries(workInfo).map(
            (value: [string, string], index: number) => (
              <div
                className="flex flex-col md:flex-row px-6 py-2"
                key={value[0]}
              >
                <p className="capitalize mr-4 text-[#979797]">
                  {value[0]
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                  :
                </p>
                <p className="capitalize">{value[1]}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
