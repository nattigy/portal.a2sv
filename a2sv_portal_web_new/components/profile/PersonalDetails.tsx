import { Field, Form, Formik, FormikProps } from "formik";
import React, { useEffect, useRef, useState } from "react";
import FileForm from "./FileForm";
import clsx from "clsx";
import PhoneInputField from "./PhoneInputField";
import DOBInputField from "./DOBInputField";
import { ProfileFormValues } from "./ProfileInfo";
import FormField from "../common/FormField";
import CustomFormField from "./CustomFormField";
import Button from "../common/Button";
import FormDropdown from "../common/FormDropdown";
import { FaChevronDown } from "react-icons/fa";
import { getNationality } from "../../helpers/getNationalityFlag";
import { COUNTRIES } from "../../helpers/constants";

type Props = {
  formik: FormikProps<ProfileFormValues>;
  nextStep: (values: ProfileFormValues) => void;
};

const PersonalDetails = ({ formik, nextStep }: Props) => {
  return (
    <div className="bg-white p-4">
      <div className="flex justify-between p-2">
        <div>
          <h2 className="text-lg font-semibold">Personal Info</h2>
          <h5 className="text-sm font-normal">
            Update your personal details and photo here
          </h5>
        </div>
        <div className="flex-1 flex flex-row justify-end gap-x-4 pr-4">
          <Button
            disabled={Object.keys(formik.errors).some((key) =>
              [
                "firstName",
                "lastName",
                "email",
                "phone",
                "dob",
                "resumeLink",
                "educationPlace",
                "currentWorkStatus",
                "currentEducationStatus",
                "bio",
                "city",
                "country",
              ].includes(key)
            )}
            text="Next"
            onClick={() => nextStep(formik.values)}
            classname="bg-primary text-white px-5 text-sm disabled:bg-primary/60"
          />
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
      <div className="flex flex-col gap-y-2 xl:w-1/2 lg:w-3/5 md:w-5/6 w-full">
        <div className="w-full flex justify-between items-center p-2">
          <h1 className="text-sm font-semibold after:content-['*'] relative after:absolute after:-top-0 after:-right-2 after:text-red-700">
            Full Name
          </h1>

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
          <h1 className="text-sm font-semibold">
            Email Address<span className="text-red-700">*</span>
          </h1>

          <div className="w-2/3">
            <CustomFormField
              readOnly={true}
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
          className="w-full text-sm placeholder-[#767676] rounded-md appearance-none focus:outline-none px-4 py-1"
          name="phone"
          placeholder="Enter Phone Number"
          label="Phone Number"
          formik={formik}
          onChange={(e: any) => formik.setFieldValue("phone", e)}
          onFocus={(e: any) => formik.setFieldTouched("phone", e)}
        />
        <hr className="mx-2" />
        <DOBInputField
          className="w-full text-sm placeholder-[#767676] rounded-md focus:outline-none py-3 px-4 my-2"
          formik={formik}
          name="dob"
          label="DOB"
          placeholder="Enter Date of Birth"
          onChange={(e: any) => formik.setFieldValue("dob", e)}
        />
        <hr className="mx-2" />
        {/* <div className="w-full flex justify-between items-center p-2">
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
        <hr className="mx-2" /> */}
        {/* <FileForm
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
        <hr className="mx-2" /> */}
        <div className="w-full flex justify-between items-center p-2">
          <h1 className="text-sm font-semibold">
            Work Status<span className="text-red-700">*</span>
          </h1>
          <div className="w-2/3">
            <FormDropdown
              name="currentWorkStatus"
              options={[
                { name: "Employed", value: "EMPLOYED" },
                { name: "Unemployed", value: "UNEMPLOYED" },
              ]}
              icon={<FaChevronDown size={16} />}
              placeholder="Work Status"
              error={(formik.errors as any)["currentWorkStatus"]}
              touched={(formik.touched as any)["currentWorkStatus"]}
            />
          </div>
        </div>

        <hr className="mx-2" />
        <div className="w-full flex justify-between items-center p-2">
          <h1 className="text-sm font-semibold">
            Resume Link<span className="text-red-700">*</span>
          </h1>
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

        <hr className="mx-2" />
        <div className="w-full flex justify-between items-center p-2">
          <h1 className="text-sm font-semibold">
            Country<span className="text-red-700">*</span>
          </h1>
          <div className="w-2/3">
            <FormDropdown
              name="country"
              options={COUNTRIES.map((country) => ({
                name: country,
                value: country,
              }))}
              flag={getNationality(formik.values.country)}
              placeholder="Country"
              icon={<FaChevronDown size={16} />}
              error={
                (formik.errors as any)["country"]
                  ? (formik.errors as any)["country"]
                  : ""
              }
              touched={
                (formik.touched as any)["country"]
                  ? (formik.touched as any)["country"]
                  : ""
              }
            />
          </div>
        </div>
        <hr className="mx-2" />
        <div className="w-full flex justify-between items-center p-2">
          <h1 className="text-sm font-semibold">
            City<span className="text-red-700">*</span>
          </h1>
          <div className="w-2/3">
            <CustomFormField
              id="city"
              name="city"
              placeholder="Enter City"
              type="text"
              formik={formik}
            />
          </div>
        </div>

        <hr className="mx-2" />

        <div className="w-full flex justify-between items-center p-2">
          <h1 className="text-sm font-semibold">
            Education Status<span className="text-red-700">*</span>
          </h1>
          <div className="w-2/3">
            <div>
              <FormDropdown
                name="currentEducationStatus"
                options={[
                  { name: "Graduated", value: "GRADUATED" },
                  { name: "Continuing", value: "CONTINUING" },
                ]}
                placeholder="Enter Education Status"
                error={(formik.errors as any)["currentEducationStatus"]}
                touched={(formik.touched as any)["currentEducationStatus"]}
                icon={<FaChevronDown size={16} />}
              />
              {/* <h1 className="text-xs font-light text-red-700">
                {(formik.errors as any)["currentEducationStatus"]}
              </h1> */}
            </div>
          </div>
        </div>

        <hr className="mx-2" />
        <div className="w-full flex justify-between items-center p-2">
          <h1 className="text-sm font-semibold">
            Education Institiue<span className="text-red-700">*</span>
          </h1>
          <div className="w-2/3">
            <CustomFormField
              id="educationPlace"
              name="educationPlace"
              placeholder="Enter Education Institiue"
              type="text"
              formik={formik}
            />
          </div>
        </div>
        <hr className="mx-2" />
        <div className="w-full flex justify-between items-start p-2">
          <h1 className="text-sm font-semibold my-2">
            Your Bio<span className="text-red-700">*</span>
          </h1>
          <div className="w-2/3">
            <Field
              as="textarea"
              id="bio"
              name="bio"
              rows={10}
              placeholder="Enter Bio"
              className={clsx(
                "w-full text-sm resize-none border placeholder-[#767676] rounded-md focus:outline-none py-3 px-4",
                (formik.errors as any)["bio"]
                  ? "border-red-500"
                  : "border-[#D2D2D2]"
              )}
            ></Field>
            {formik.errors.bio && (
              <div className="bg-red-400/20 w-full mt-2 p-2 px-4 rounded-md">
                <p className="w-full text-xs text-red-400">
                  {formik.errors.bio}
                </p>
              </div>
            )}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
