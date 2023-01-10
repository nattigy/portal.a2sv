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
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  // email: yup
  //   .string()
  //   .required("Required")
  //   .email("email should have the format user@example.com"),
  // phone: yup.string().length(12),
  // linkedin: yup.string(),
  // dob: yup.date().required("Required"),
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
    dob: userProfile?.birthDate || null,
    status: "",
    linkedin: userProfile?.linkedin || "linkedin/hanna",
    insta: userProfile?.instagram || "insta/hanna",
    twitter: userProfile?.twitter || "twitter/hanna",
    telegram: "TheConfusedOne",
    facebook: userProfile?.facebook || "facebook/hanna",
    leetcode: userProfile?.leetcode || "leetcode.com/hanna17st",
    hackerrank: userProfile?.hackerrank || "hackerrank/hanna",
    codeforces: userProfile?.codeforces || "codeforces/hanna",
    geeksforgeeks: userProfile?.geekforgeeks || "",
    resumeLink: userProfile?.resumeLink || "resume/hanna",
    email: "",
    educationPlace: userProfile?.educationPlace || "AAiT",
    currentWorkStatus: userProfile?.currentWorkStatus || "EMPLOYED",
    currentEducationStatus: userProfile?.currentEducationStatus || "GRADUATED",
    countryCode: userProfile?.countryCode || "Ethiopia",
    bio: userProfile?.bio || "Hello",
    userProfileAddress: {
      country: userProfile?.userProfileAddress?.country || "Ethiopia",
      city: userProfile?.userProfileAddress?.city || "Addis Ababa",
    },
    photo: null,
  };

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  const handleClick = () => {
    console.log("Click click ");
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
                    facebook: values.facebook,
                    twitter: values.twitter,
                    instagram: values.insta,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phone: values.phone,
                    birthDate: values.dob,
                    linkedin: values.linkedin,
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
                    resumeLink: values.resumeLink,
                    phone: values.phone,
                    leetcode: values.leetcode,
                    lastName: values.lastName,
                    hackerrank: values.hackerrank,
                    firstName: values.firstName,
                    educationPlace: values.educationPlace,
                    currentWorkStatus: values.currentWorkStatus,
                    currentEducationStatus: values.currentEducationStatus,
                    countryCode: values.countryCode,
                    codeforces: values.codeforces,
                    bio: values.bio,
                    userProfileAddress: {
                      country: values.userProfileAddress.country,
                      city: values.userProfileAddress.city,
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
              {JSON.stringify(formik.values)}
              {JSON.stringify(formik.errors)}
              {tabIndex == 0 && <PersonalDetails formik={formik} />}
              {tabIndex == 1 && <SocialMediaDetails formik={formik} />}
              {tabIndex == 2 && <ProgrammingDetails formik={formik} />}
              {updateError?.message && (
                <div className="bg-[#E4646451] py-1 rounded-md">
                  <span className="text-[#E46464] px-4 text-xs">
                    {updateError?.message}
                  </span>
                </div>
              )}
              {tabIndex == 2 && (
                <FormAffirmativeButton
                  text="Save Changes"
                  isLoading={formik.isSubmitting}
                />
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfileInfo;
