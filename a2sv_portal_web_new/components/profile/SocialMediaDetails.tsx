import clsx from "clsx";
import { Formik, Form, Field } from "formik";
import { isError } from "lodash";
import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { MdAlternateEmail } from "react-icons/md";
import { SiFacebook, SiInstagram, SiTelegram, SiTwitter } from "react-icons/si";

type Props = {};

export interface SocialMediaFormValues {
  insta: string;
  twitter: string;
  telegram: string;
  facebook: string;
}

const SocialMediaDetails = (props: Props) => {
  const INITIAL_VALUES = {
    // status: QuestionStatus.NOT_SOLVED,
    // time_spent: 0,
    // total_attempts: 0,
    // wrong_submissions: 0
  } as SocialMediaFormValues;

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
        <div className="flex gap-4">
          <button className="w-24 p-2 border rounded-lg text-sm border-[#BCBCBC]">
            Cancel
          </button>
          <button
            type="submit"
            form="profile-form"
            className="w-24 p-2 border rounded-lg bg-[#5956E9] text-sm text-white border-red-200"
          >
            Save
          </button>
        </div>
      </div>
      <hr className="ml-4" />
      <Formik
        initialValues={INITIAL_VALUES}
        // validationSchema={FORM_VALIDATION}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form id="profile-form" className="p-2 flex flex-col gap-y-2 w-1/2">
            <div className="flex">
              <div className="flex w-2/5 items-center gap-x-2 p-2">
                <SiInstagram size={24} color="blue" />
                <h1 className="text-sm">Instagram Url</h1>
              </div>
              <div className="flex w-full relative ml-4">
                <MdAlternateEmail className="absolute left-2 top-1/3" />

                <Field
                  id="insta"
                  name="insta"
                  placeholder="Enter your Instagram account"
                  type="text"
                  className={clsx(
                    "w-full text-xs placeholder-[#767676] rounded-md focus:outline-none py-3 px-8 my-2",
                    errors.insta && touched.insta
                      ? "border border-red-500"
                      : "border border-[#D2D2D2]"
                  )}
                />
                <FiExternalLink className="absolute top-1/3 right-2" />
              </div>
              <h1 className="text-xs font-light text-red-700">
                {(errors as any)["insta"]}
              </h1>
            </div>
            <hr className="mx-2" />

            <div className="flex">
              <div className="flex w-2/5 items-center gap-x-2 p-2">
                <SiTwitter size={24} color="blue" />
                <h1 className="text-sm">Twitter Url</h1>
              </div>
              <div className="flex w-full relative ml-4">
                <MdAlternateEmail className="absolute left-2 top-1/3" />

                <Field
                  id="twitter"
                  name="twitter"
                  placeholder="Enter your Twitter account"
                  type="text"
                  className={clsx(
                    "w-full text-xs placeholder-[#767676] rounded-md focus:outline-none py-3 px-8 my-2",
                    errors.twitter && touched.twitter
                      ? "border border-red-500"
                      : "border border-[#D2D2D2]"
                  )}
                />
                <FiExternalLink className="absolute top-1/3 right-2" />
              </div>
              <h1 className="text-xs font-light text-red-700">
                {(errors as any)["twitter"]}
              </h1>
            </div>
            <hr className="mx-2" />

            <div className="flex w-full">
              <div className="w-2/5 flex items-center gap-x-2 p-2">
                <SiTelegram size={24} color="blue" />
                <h1 className="text-sm">Telegram Url</h1>
              </div>
              <div className="flex w-full relative ml-4">
                <MdAlternateEmail className="absolute left-2 top-1/3" />
                <Field
                  id="telegram"
                  name="telegram"
                  placeholder="Enter your Telegram account"
                  type="text"
                  className={clsx(
                    "w-full text-xs placeholder-[#767676] rounded-md focus:outline-none py-3 px-8 my-2",
                    errors.telegram && touched.telegram
                      ? "border border-red-500"
                      : "border border-[#D2D2D2]"
                  )}
                />
                <FiExternalLink className="absolute top-1/3 right-2" />
              </div>
              <h1 className="text-xs font-light text-red-700">
                {(errors as any)["telegram"]}
              </h1>
            </div>
            <hr className="mx-2" />

            <div className="w-full flex">
              <div className="flex w-2/5 items-center gap-x-2 p-2">
                <SiFacebook size={24} color="blue" />
                <h1 className="text-sm">Facebook Url</h1>
              </div>
              <div className="flex w-full relative ml-4">
                <MdAlternateEmail className="absolute left-2 top-1/3" />
                <Field
                  id="facebook"
                  name="facebook"
                  placeholder="Enter your Facebook account"
                  type="text"
                  className={clsx(
                    "w-full text-xs placeholder-[#767676] rounded-md focus:outline-none py-3 px-8 my-2",
                    errors.facebook && touched.facebook
                      ? "border border-red-500"
                      : "border border-[#D2D2D2]"
                  )}
                />
                <FiExternalLink className="absolute top-1/3 right-2" />
              </div>
              <h1 className="text-xs font-light text-red-700">
                {(errors as any)["facebook"]}
              </h1>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SocialMediaDetails;
