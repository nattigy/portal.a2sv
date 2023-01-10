import { Form, Formik, FormikProps } from "formik";
import React, { useRef, useState } from "react";
import FileForm from "./FileForm";
import * as yup from "yup";
import clsx from "clsx";
import PhoneInputField from "./PhoneInputField";
import DOBInputField from "./DOBInputField";
import { ProfileFormValues } from "./ProfileInfo";
import FormField from "../common/FormField";
import CustomFormField from "./CustomFormField";

type Props = {
  formik: FormikProps<ProfileFormValues>;
};

const PersonalDetails = ({ formik }: Props) => {
  return (
    <div className="bg-white p-4">
      <div className="flex justify-between p-2">
        <div>
          <h2 className="text-lg font-semibold">Personal Info</h2>
          <h5 className="text-sm font-normal">
            Update your personal details and photo here
          </h5>
        </div>
        {/* <div className="flex gap-4">
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
        </div> */}
      </div>
      <hr className="ml-4" />
      <div className="flex flex-col gap-y-2 w-1/2">
        <div className="w-full flex justify-between items-center p-2">
          <h1 className="text-sm font-semibold">Full Name</h1>

          <div className="flex w-2/3 justify-between gap-x-3">
            <CustomFormField
              id="firstName"
              name={`firstName`}
              placeholder="Enter First Name"
              type="text"
              formik={formik}
            />
            <CustomFormField
              id="lastName"
              name={`lastName`}
              placeholder="Enter Last Name"
              type="text"
              formik={formik}
            />
          </div>
        </div>

        <hr className="mx-2" />
        <div className="w-full flex justify-between items-center p-2">
          <h1 className="text-sm font-semibold">Email Address</h1>

          <div className="w-2/3">
            <CustomFormField
              id="email"
              name="email"
              placeholder="Enter Email Address"
              type="text"
              formik={formik}
            />
          </div>
        </div>

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
        <div className="w-full flex justify-between items-center p-2">
          <h1 className="text-sm font-semibold">Linkedin URL</h1>

          <div className="w-2/3">
            <CustomFormField
              id="linkedin"
              name="linkedin"
              placeholder="Enter Linkedin Profile"
              type="text"
              formik={formik}
            />
          </div>
        </div>
        <hr className="mx-2" />
        <FileForm
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
        <div className="w-full flex justify-between items-center p-2">
          <h1 className="text-sm font-semibold">Work Status</h1>
          <div className="w-2/3">
            <CustomFormField
              id="status"
              name="status"
              placeholder=""
              type="select"
              formik={formik}
              // options={props.inputProps.options}
            />
          </div>
        </div>
        <hr className="mx-2" />
        <div className="w-full flex justify-between items-center p-2">
          <h1 className="text-sm font-semibold">Resume Link</h1>
        <div className="w-2/3">
            <CustomFormField
              id="resumeLink"
              name="resumeLink"
              placeholder="Enter Resume Link"
              type="text"
              formik={formik}
            />
          </div>
          </div>

      </div>
    </div>
  );
};

export default PersonalDetails;
