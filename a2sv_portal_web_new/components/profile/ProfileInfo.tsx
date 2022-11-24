import React, { ReactNode, useEffect, useState } from "react";
import BaseLayout from "../common/BaseLayout";
import router from "next/router";
import ProfileFilter from "./ProfileFilter";
import PersonalDetails from "./PersonalDetails";
import ProgrammingDetails from "./ProgrammingDetails";
import SocialMediaDetails from "./SocialMediaDetails";
import { Form, Formik } from "formik";
import * as yup from "yup";
import FormAffirmativeButton from "../common/FormAffirmativeButton";

type Props = {};
export interface ProfileFormValues {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  dob: string;
  cv: File;
  status: string;
  linkedin: string;
  photo: File;
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
  // firstname: yup.string().min(3, "Too Short!").max(40, "Too Long!"),
  // lastname: yup.string().min(3, "Too Short!").max(40, "Too Long!"),
  // email: yup
  //   .string()
  //   .required("Required")
  //   .email("email should have the format user@example.com"),
  // phone: yup.string().length(12),
  // linkedin: yup.string(),
  // dob: yup.date().required("Required"),
});

const ProfileInfo = (props: Props) => {
  const INITIAL_VALUES = {

  } as ProfileFormValues;
  
  const [tabIndex, setTabIndex] = useState(0);

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
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {(formik) => (
              <Form id="profile-form" >
                {tabIndex == 0 && <PersonalDetails formik={formik} />}
                {tabIndex == 1 && <SocialMediaDetails formik={formik} />}
                {tabIndex == 2 && <ProgrammingDetails formik={formik} />}
                {tabIndex == 2 && <FormAffirmativeButton text="Save Changes" isLoading={formik.isSubmitting}/>}
      
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </BaseLayout>
  );
};

export default ProfileInfo;
