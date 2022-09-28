import { Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import ProfileForm from "./ProfileForm";
import * as yup from "yup";
import clsx from "clsx";
import PhoneInputField from "./PhoneInputField";
import DOBInputField from "./DOBInputField";

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
}

const FORM_VALIDATION = yup.object().shape({
  firstname: yup.string().min(3, "Too Short!").max(40, "Too Long!"),
  lastname: yup.string().min(3, "Too Short!").max(40, "Too Long!"),
  email: yup
    .string()
    .required("Required")
    .email("email should have the format user@example.com"),
  phone: yup.string().length(12),
  linkedin: yup.string(),
  dob: yup.date().required("Required"),
});

const PersonalDetails = (props: Props) => {
  const INITIAL_VALUES = {
    // status: QuestionStatus.NOT_SOLVED,
    // time_spent: 0,
    // total_attempts: 0,
    // wrong_submissions: 0
  } as ProfileFormValues;

  return (
    <div className="bg-white p-4">
      {/* Title and buttons */}
      <div className="flex justify-between p-2">
        <div>
          <h2 className="text-lg font-semibold">Personal Info</h2>
          <h5 className="text-sm font-normal">
            Update your personal details and photo here
          </h5>
        </div>
        <div className="flex gap-4">
          <button className="w-24 p-1 border rounded-lg text-sm border-[#BCBCBC]">
            Cancel
          </button>
          <button
            type="submit"
            form="profile-form"
            className="w-24 p-1 border rounded-lg bg-[#5956E9] text-white text-sm border-red-200"
          >
            Save
          </button>
        </div>
      </div>
      <hr className="ml-4" />
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => (
          <div>
            <Form id="profile-form" className="flex flex-col gap-y-2 w-1/2">
              <ProfileForm
                inputProps={{
                  id: "name",
                  name: "name",
                  placeholder: "Name",
                  type: "text",
                  formik: formik,
                }}
                type="name"
                label="Name"
              />
              <hr className="mx-2" />
              <ProfileForm
                inputProps={{
                  id: "email",
                  name: "email",
                  placeholder: "Enter Email Address",
                  type: "text",
                  formik: formik,
                }}
                type="email"
                label="Email Address"
              />
              <hr className="mx-2" />
              <PhoneInputField
                className="w-full text-xs placeholder-[#767676] rounded-md appearance-none focus:outline-none px-4 py-1 border border-[#D2D2D2]"
                country="ET"
                name="phone"
                placeholder="Enter Phone Number"
                label="Phone Number"
                formik={formik}
                onChange={(e: any) => formik.setFieldValue("phone", e)}
              />
              <hr className="mx-2" />
              <DOBInputField
                className="w-full text-xs placeholder-[#767676] rounded-md focus:outline-none py-3 px-4 my-2"
                formik={formik}
                name="dob"
                label="DOB"
                placeholder="Enter Date of Birth"
                onChange={(e: any) => formik.setFieldValue("dob", e)}
              />
              <hr className="mx-2" />
              <ProfileForm
                inputProps={{
                  id: "linkedin",
                  name: "linkedin",
                  placeholder: "Enter Linkedin Profile",
                  type: "text",
                  formik: formik,
                }}
                type="linkedin"
                label="Linkedin URL"
              />
              <hr className="mx-2" />
              <ProfileForm
                inputProps={{
                  id: "photo",
                  name: "photo",
                  placeholder: "Your Photo",
                  type: "file",
                  formik: formik,
                }}
                type="photo"
                label="Your Photo"
              />
              <hr className="mx-2" />
              <ProfileForm
                inputProps={{
                  id: "status",
                  name: "status",
                  placeholder: "",
                  type: "select",
                  formik: formik,
                  options: ["Employed", "Unemployed"],
                }}
                type="select"
                label="Work Status"
              />
              <hr className="mx-2" />
              <ProfileForm
                inputProps={{
                  id: "cv",
                  name: "cv",
                  placeholder: "",
                  type: "file",
                  formik: formik,
                }}
                type="file"
                label="CV"
              />
            </Form>
          </div>
        )}
      </Formik>
      {/* Name */}
      {/* <div>
        <ProfileForm label="Name" type="name" />
      </div> */}
      {/* Email */}
      {/* Phone */}
      {/* Linkedin  */}
      {/* Photo  */}
      {/* Work Status  */}
      {/* CV  */}
    </div>
  );
};

export default PersonalDetails;