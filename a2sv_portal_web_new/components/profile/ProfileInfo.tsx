import React, { useState } from "react";
import BaseLayout from "../common/BaseLayout";
import ProfileFilter from "./ProfileFilter";
import PersonalDetails from "./PersonalDetails";
import ProgrammingDetails from "./ProgrammingDetails";
import SocialMediaDetails from "./SocialMediaDetails";
import { Form, Formik } from "formik";
import * as yup from "yup";
import FormAffirmativeButton from "../common/FormAffirmativeButton";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import { useMutation, useReactiveVar } from "@apollo/client";
import { UserProfile } from "../../types/user";
import {
  CREATE_USER_PROFILE,
  UPDATE_USER_PROFILE,
} from "../../lib/apollo/Mutations/usersMutations";
import Router, { useRouter } from "next/router";

type Props = {
  userProfile: UserProfile;
};
export interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: any;
  dob: Date;
  status: string;
  linkedin: string;
  photo: File | null;
  insta: string;
  twitter: string;
  telegram: string;
  github: string;
  facebook: string;
  leetcode: string;
  hackerrank: string;
  codeforces: string;
  geeksforgeeks: string;
  resumeLink: string;
  educationPlace: string;
  currentWorkStatus: string;
  currentEducationStatus: string;
  countryCode: string;
  bio: string;
  userProfileAddress: {
    country: string;
    city: string;
  };
}

const FORM_VALIDATION = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup
    .string()
    .required("Required")
    .email("Email should have the format user@example.com"),
  phone: yup.string().required("Required"),
  linkedin: yup.string().required("Required"),
  dob: yup.date().required("Required").nullable().default(undefined),

  insta: yup.string().required("Required"),
  twitter: yup.string().required("Required"),
  telegram: yup.string().required("Required"),
  github: yup.string().required("Required"),
  leetcode: yup.string().required("Required"),
  hackerrank: yup.string().required("Required"),
  codeforces: yup.string().required("Required"),
  resumeLink: yup.string().required("Required"),
  educationPlace: yup.string().required("Required"),
  currentWorkStatus: yup.string().required("Required"),
  currentEducationStatus: yup.string().required("Required"),
  facebook: yup.string().required("Required"),
  bio: yup
    .string()
    .required("Required")
    .test(
      "len",
      "Must be at least 50 characters",
      (val) => (val?.length || 0) >= 50
    ),
});

const ProfileInfo = ({ userProfile }: Props) => {
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;
  const router = useRouter();
  const isProfileComplete = authUser.userProfile !== null;

  const [createUserProfile, { loading, error }] =
    useMutation(CREATE_USER_PROFILE);

  const [updateUserProfile, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_USER_PROFILE);

  const INITIAL_VALUES: ProfileFormValues = {
    firstName: userProfile?.firstName || "",
    lastName: userProfile?.lastName || "",
    phone: userProfile?.phone || "",
    dob: userProfile?.birthDate || "",
    status: "",
    linkedin: userProfile?.linkedin || "",
    insta: userProfile?.instagram || "",
    twitter: userProfile?.twitter || "",
    telegram: userProfile?.telegram || "",
    github: userProfile?.github || "",
    leetcode: userProfile?.leetcode || "",
    hackerrank: userProfile?.hackerrank || "",
    codeforces: userProfile?.codeforces || "",
    geeksforgeeks: userProfile?.geekforgeeks || "",
    resumeLink: userProfile?.resumeLink || "",
    facebook: userProfile?.facebook || "",
    email: userProfile?.email || "",
    educationPlace: userProfile?.educationPlace || "",
    currentWorkStatus: userProfile?.currentWorkStatus || "",
    currentEducationStatus: userProfile?.currentEducationStatus || "",
    countryCode: userProfile?.countryCode || "+251",
    bio: userProfile?.bio || "",
    userProfileAddress: {
      country: userProfile?.userProfileAddress?.country || "",
      city: userProfile?.userProfileAddress?.city || "Addis Ababa",
    },
    photo: null,
  };

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <div className="flex flex-col relative py-2 pr-4">
      <h1 className="text-2xl font-bold mb-4">Personal Profile</h1>
      <ProfileFilter handleTabChange={handleTabChange} activeIndex={tabIndex} />
      <div className="mb-28">
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={FORM_VALIDATION}
          onSubmit={async (values) => {
            if (isProfileComplete) {
              await updateUserProfile({
                variables: {
                  updateUserProfileInput: {
                    userId: authUser.id,
                    hackerrank: values.hackerrank,
                    geekforgeeks: values.geeksforgeeks,
                    codeforces: values.codeforces,
                    leetcode: values.leetcode,
                    github: values.github,
                    twitter: values.twitter,
                    instagram: values.insta,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phone: values.phone,
                    birthDate: values.dob,
                    linkedin: values.linkedin,
                    resumeLink: values.resumeLink,
                    facebook: values.facebook,
                    bio: values.bio,
                  },
                },
                refetchQueries: "active",
                notifyOnNetworkStatusChange: true,
              });
            } else {
              console.log(values);
              await createUserProfile({
                variables: {
                  createUserProfileInput: {
                    bio: values.bio,
                    codeforces: values.codeforces,
                    countryCode: "+251",
                    educationPlace: values.educationPlace,
                    firstName: values.firstName,
                    hackerrank: values.hackerrank,
                    instagram: values.insta,
                    lastName: values.lastName,
                    facebook: values.facebook,
                    leetcode: values.leetcode,
                    linkedin: values.linkedin,
                    phone: values.phone,
                    resumeLink: values.resumeLink,
                    currentEducationStatus: values.currentEducationStatus,
                    currentWorkStatus: values.currentWorkStatus,
                    userProfileAddress: {
                      city: values.userProfileAddress.country,
                      country: values.userProfileAddress.country,
                    },
                  },
                },
                refetchQueries: "active",
                onCompleted: async () => router.push("/profile"),
                notifyOnNetworkStatusChange: true,
              });
            }
          }}
        >
          {(formik) => (
            <Form>
              {tabIndex == 0 && (
                <PersonalDetails changeTabIndex={setTabIndex} formik={formik} />
              )}
              {tabIndex == 1 && (
                <SocialMediaDetails
                  changeTabIndex={setTabIndex}
                  formik={formik}
                />
              )}
              {tabIndex == 2 && (
                <>
                <ProgrammingDetails
                  changeTabIndex={setTabIndex}
                  formik={formik}
                />
                {!formik.isValid && (
                  <div className="bg-[#E4646451] py-1 rounded-md w-1/2 my-6">
                    <span className="text-[#E46464] px-4 text-xs">
                    There are errors on the form. Please fix them before continuing.
                    </span>
                  </div>
                )}
                </>
              )}
              {updateError?.message && (
                <div className="bg-[#E4646451] py-1 rounded-md">
                  <span className="text-[#E46464] px-4 text-xs">
                    {updateError?.message}
                  </span>
                </div>
              )}
        
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfileInfo;
