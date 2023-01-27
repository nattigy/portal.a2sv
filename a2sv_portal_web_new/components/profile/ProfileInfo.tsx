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
import SecurityDetails from "./SecurityDetails";
import { isValidPhoneNumber } from "react-phone-number-input";

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

const handleValidate = (value?: string) => {
  const isValid = isValidPhoneNumber(value || "");
  return isValid;
};

yup.addMethod(yup.string, "validPhone", function (errorMessage) {
  return this.test(`valid-phone-number`, errorMessage, function (value) {
    const { path, createError } = this;

    return (
      (value && handleValidate(value)) ||
      createError({ path, message: errorMessage })
    );
  });
});

const FORM_VALIDATION = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup
    .string()
    .required("Required")
    .email("Email should have the format user@example.com"),
  phone: (yup.string() as any).required("Required").validPhone("Invalid Phone Number"),
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
    email: authUser.email,
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
                    firstName: values.firstName,
                    lastName: values.lastName,
                    countryCode: "00",
                    phone: values.phone,
                    birthDate: values.dob,
                    currentWorkStatus: values.currentWorkStatus,
                    resumeLink: values.resumeLink,
                    userProfileAddress: {
                      city: values.userProfileAddress.country,
                      country: values.userProfileAddress.country,
                    },
                    currentEducationStatus: values.currentEducationStatus,
                    educationPlace: values.educationPlace,
                    bio: values.bio,

                    instagram: values.insta,
                    twitter: values.twitter,
                    telegram: values.telegram,
                    linkedin: values.linkedin,
                    leetcode: values.leetcode,
                    geekforgeeks: values.geeksforgeeks,
                    hackerrank: values.hackerrank,
                    codeforces: values.codeforces,
                    github: values.github,
                  },
                },
                refetchQueries: "active",
                notifyOnNetworkStatusChange: true,
              });
            } else {
              await createUserProfile({
                variables: {
                  createUserProfileInput: {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    countryCode: "00",
                    phone: values.phone,
                    birthDate: values.dob,
                    currentWorkStatus: values.currentWorkStatus,
                    resumeLink: values.resumeLink,
                    userProfileAddress: {
                      city: values.userProfileAddress.country,
                      country: values.userProfileAddress.country,
                    },
                    currentEducationStatus: values.currentEducationStatus,
                    educationPlace: values.educationPlace,
                    bio: values.bio,

                    instagram: values.insta,
                    twitter: values.twitter,
                    telegram: values.telegram,
                    linkedin: values.linkedin,
                    leetcode: values.leetcode,
                    geekforgeeks: values.geeksforgeeks,
                    hackerrank: values.hackerrank,
                    codeforces: values.codeforces,
                    github: values.github,
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
                    <div className="bg-[#E4646451] py-1 px-4 rounded-md xl:w-1/2 lg:w-3/5 md:w-5/6 w-full my-6">
                      <span className="text-[#E46464] text-xs">
                        There are errors on the form. Please fix them before
                        continuing.
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
        {tabIndex == 3 && <SecurityDetails />}
      </div>
    </div>
  );
};

export default ProfileInfo;
