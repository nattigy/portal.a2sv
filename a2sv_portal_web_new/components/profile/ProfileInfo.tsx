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
import { UserStatusType } from "../../types/profile";

type Props = {
  userProfile: UserProfile;
};
export interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: any;
  dob: Date;
  linkedin: string;
  photoUrl: string | null;
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
  country: string;
  city: string;
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

const PersonalDetailsSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup
    .string()
    .required("Required")
    .email("Email should have the format user@example.com"),
  phone: (yup.string() as any)
    .required("Required")
    .validPhone("Invalid Phone Number"),
  dob: yup
    .date().typeError('Please enter a valid date')
    .required("Required")
    .min(new Date("1900-01-01"), "Birthdate must be after 1900")
    .max(new Date(), "Birthdate cannot be in the future"),
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
  city: yup.string().required("Required"),
  country: yup.string().required("Required"),
});

const SocialMediaSchema = yup.object().shape({
  linkedin: yup.string().required("Required"),
  insta: yup.string().required("Required"),
  twitter: yup.string().required("Required"),
  telegram: yup.string().required("Required"),
});

const ProgrammingHandleSchema = yup.object().shape({
  github: yup.string().required("Required"),
  leetcode: yup.string().required("Required"),
  hackerrank: yup.string().required("Required"),
  codeforces: yup.string().required("Required"),
});

const FORM_VALIDATION = yup.object().shape({});

const ProfileInfo = ({ userProfile }: Props) => {
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;
  const router = useRouter();
  const isProfileComplete = authUser.status === UserStatusType.ACTIVE;
  const [step, setStep] = useState(1);

  const [createUserProfile, { loading, error }] =
    useMutation(CREATE_USER_PROFILE);

  const [updateUserProfile, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_USER_PROFILE);

  const INITIAL_VALUES: ProfileFormValues = {
    firstName: userProfile?.firstName || "",
    lastName: userProfile?.lastName || "",
    city: userProfile?.city || "",
    country: userProfile?.country || "",
    phone: userProfile?.phone || "",
    dob: userProfile?.birthDate || "",
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
    photoUrl: "asfasfa",
  };

  const [tabIndex, setTabIndex] = useState(0);

  const handleValidation = (values: any, step: number) => {
    let schema = null;

    if (step === 1) {
      schema = PersonalDetailsSchema;
    } else if (step === 2) {
      schema = SocialMediaSchema;
    } else if (step === 3) {
      schema = ProgrammingHandleSchema;
    }

    try {
      schema?.validateSync(values, { abortEarly: false });
      return {};
    } catch (error: any) {
      const errors: Record<string, string> = {};

      error.inner.forEach((err: yup.ValidationError) => {
        errors[err.path as string] = err.message;
      });

      return errors;
    }
  };

  const nextStep = (values: ProfileFormValues) => {
    const errors = handleValidation(values, step);

    if (Object.keys(errors).length === 0) {
      setStep(step + 1);
      setTabIndex(step);
    }
  };

  const prevStep = (values: ProfileFormValues) => {
    const errors = handleValidation(values, step);

    if (Object.keys(errors).length === 0) {
      setStep(step - 1);
      setTabIndex(step - 2);
    }
  };

  const handleTabChange = (index: number, values: ProfileFormValues) => {
    const errors = handleValidation(values, tabIndex + 1);

    if (Object.keys(errors).length === 0) {
      setTabIndex(index);
      setStep(index + 1);
    }
  };

  return (
    <div className="flex flex-col relative py-2 pr-4">
      <h1 className="text-2xl font-bold mb-4">Personal Profile</h1>

      <div className="mb-28">
        <Formik
          initialValues={INITIAL_VALUES}
          validate={(values: ProfileFormValues) =>
            handleValidation(values, step)
          }
          validationSchema={yup.object().shape({
            ...PersonalDetailsSchema.fields,
            ...SocialMediaSchema.fields,
            ...ProgrammingHandleSchema.fields,
          })}
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
                    city: values.city,
                    country: values.country,
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
                    photoUrl: values.photoUrl,
                    email: values.email,
                  },
                },
                refetchQueries: "active",
                onCompleted: async () => router.push("/profile"),
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
                    city: values.city,
                    country: values.country,
                    currentEducationStatus: values.currentEducationStatus,
                    educationPlace: values.educationPlace,
                    bio: values.bio,
                    photoUrl: "sfasfasfas",
                    instagram: values.insta,
                    twitter: values.twitter,
                    telegram: values.telegram,
                    linkedin: values.linkedin,
                    leetcode: values.leetcode,
                    geekforgeeks: values.geeksforgeeks,
                    hackerrank: values.hackerrank,
                    codeforces: values.codeforces,
                    github: values.github,
                    email: values.email,
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
            <>
              {authUser.status === UserStatusType.ACTIVE && (
                <ProfileFilter
                  formik={formik}
                  handleTabChange={handleTabChange}
                  activeIndex={tabIndex}
                />
              )}
              <Form>
                {step === 1 && (
                  <div>
                    <PersonalDetails formik={formik} nextStep={nextStep} />
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <SocialMediaDetails
                      formik={formik}
                      nextStep={nextStep}
                      prevStep={prevStep}
                    />
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <ProgrammingDetails formik={formik} prevStep={prevStep} />
                  </div>
                )}
                {updateError?.message && (
                  <div className="bg-[#E4646451] py-1 rounded-md">
                    <span className="text-[#E46464] px-4 text-xs">
                      {updateError?.message}
                    </span>
                  </div>
                )}
              </Form>
            </>
          )}
        </Formik>
        {tabIndex == 3 && <SecurityDetails />}
      </div>
    </div>
  );
};

export default ProfileInfo;
