import clsx from "clsx";
import { Formik, Form, Field, FormikProps } from "formik";
import { isError } from "lodash";
import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { MdAlternateEmail } from "react-icons/md";
import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiTelegram,
  SiTwitter,
} from "react-icons/si";
import Button from "../common/Button";
import CustomLinkField from "./CustomLinkField";
import { ProfileFormValues } from "./ProfileInfo";

type Props = {
  formik: FormikProps<ProfileFormValues>;
  nextStep: (values: ProfileFormValues) => void;
  prevStep: (values: ProfileFormValues) => void;
};

const SocialMediaDetails = ({
  formik,
  prevStep,
  nextStep,
}: Props) => {
  const { values, errors, touched } = formik;

  return (
    <div className="bg-white p-4">
      {/* Title and buttons */}
      <div className="flex justify-between p-2">
        <div>
          <h2 className="text-lg font-semibold">Social Media Tags</h2>
          <h5 className="text-sm font-normal">
            Update your social media tags here
          </h5>
        </div>
        <div className=" flex-1 flex flex-row justify-end gap-x-4 pr-4">
          <Button
            disabled={Object.keys(formik.errors).some((key) =>
              ["linkedin", "telegram", "insta", "twitter"].includes(key)
            )}
            text="Back"
            onClick={() => prevStep(values)}
            classname="bg-gray-100 text-primary px-5 text-sm h-10 disabled:bg-gray-300/60"
          />
          <Button
            text="Next"
            disabled={Object.keys(formik.errors).some((key) =>
              ["linkedin", "telegram", "insta", "twitter"].includes(key)
            )}
            onClick={() => nextStep(values)}
            classname=" text-white bg-primary px-5 text-sm h-10 font-normal disabled:bg-primary/60"
          />
        </div>
      </div>
      <hr className="ml-4" />
      <div className="flex flex-col gap-y-2 xl:w-1/2 lg:w-3/5 md:w-5/6 w-full pr-6">
        <CustomLinkField
          name="insta"
          placeholder="Instagram"
          title="Instagram URL"
          touched={touched.insta}
          error={errors.insta}
          required={true}
          icon={<SiInstagram size={24} color="blue" />}
        />
        <hr className="mx-2" />
        <CustomLinkField
          name="twitter"
          placeholder="Twitter"
          title="Twitter URL"
          touched={touched.twitter}
          error={errors.twitter}
          required={true}
          icon={<SiTwitter size={24} color="blue" />}
        />

        <hr className="mx-2" />

        <CustomLinkField
          name="telegram"
          placeholder="Telegram"
          title="Telegram URL"
          touched={touched.telegram}
          error={errors.telegram}
          required={true}
          icon={<SiTelegram size={24} color="blue" />}
        />

        <hr className="mx-2" />
        <CustomLinkField
          name="linkedin"
          placeholder="Linkedin"
          title="Linkedin URL"
          touched={touched.linkedin}
          error={errors.linkedin}
          required={true}
          icon={<SiLinkedin size={24} color="blue" />}
        />
        <hr className="mx-2" />
      </div>
    </div>
  );
};

export default SocialMediaDetails;
