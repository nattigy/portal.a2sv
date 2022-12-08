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
import { UPDATE_USER_PROFILE } from "../../lib/apollo/Mutations/usersMutations";

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
}

const FORM_VALIDATION = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
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
  const [updateUserProfile, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_USER_PROFILE);

  const INITIAL_VALUES: ProfileFormValues = {
    firstName: userProfile?.firstName || "",
    lastName: userProfile?.lastName || "",
    phone: userProfile?.phone || "",
    dob: userProfile?.birthDate || null,
    status: "",
    linkedin: userProfile?.linkedin || "",
    insta: userProfile?.instagram || "",
    twitter: userProfile?.twitter || "",
    telegram: "",
    facebook: userProfile?.facebook || "",
    leetcode: userProfile?.leetcode || "",
    hackerrank: userProfile?.hackerrank || "",
    codeforces: userProfile?.codeforces || "",
    geeksforgeeks: userProfile?.geekforgeeks || "",
    email: "",
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
          }}
        >
          {(formik) => (
            <Form>
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

