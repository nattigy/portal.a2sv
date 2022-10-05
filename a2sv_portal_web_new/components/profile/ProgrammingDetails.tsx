import clsx from "clsx";
import { Formik, Form, Field } from "formik";
import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { MdAlternateEmail } from "react-icons/md";
import {
  SiInstagram,
  SiTwitter,
  SiTelegram,
  SiFacebook,
  SiLeetcode,
  SiGeeksforgeeks,
  SiHackerrank,
  SiCodeforces,
} from "react-icons/si";

type Props = {};

export interface ProgrammingFormValues {
  leetcode: string;
  hackerrank: string;
  codeforces: string;
  geeksforgeeks: string;
}

const ProgrammingDetails = (props: Props) => {
  const INITIAL_VALUES = {
    // status: QuestionStatus.NOT_SOLVED,
    // time_spent: 0,
    // total_attempts: 0,
    // wrong_submissions: 0
  } as ProgrammingFormValues;

  return (
    <div className="bg-white p-4">
      {/* Title and buttons */}
      <div className="flex justify-between p-2">
        <div>
          <h2 className="text-lg font-semibold">Programming Site Tags</h2>
          <h5 className="text-sm font-normal">
            Update your programming site tags here
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
            <div className="flex gap-x">
              <div className="flex w-5/12 items-center gap-x-2 p-2">
                <img src="/icons/leetcode.png" className="w-8" alt="" />
                <h1 className="text-sm">Leetcode Url</h1>
              </div>
              <div className="flex w-full relative ml-4">
                <MdAlternateEmail className="absolute left-2 top-1/3" />
                <Field
                  id="leetcode"
                  name="leetcode"
                  placeholder="Enter your Leetcode account"
                  type="text"
                  className={clsx(
                    "w-full text-xs placeholder-[#767676] rounded-md focus:outline-none py-3 px-8 my-2",
                    errors.leetcode && touched.leetcode
                      ? "border border-red-500"
                      : "border border-[#D2D2D2]"
                  )}
                />
                <FiExternalLink className="absolute top-1/3 right-2" />
              </div>
              <h1 className="text-xs font-light text-red-700">
                {(errors as any)["leetcode"]}
              </h1>
            </div>
            <hr className="mx-2" />

            <div className="flex">
              <div className="flex w-5/12 items-center gap-x-2 p-2">
                <img src="/icons/geeksforgeeks.png" className="w-8" alt="" />

                <h1 className="text-sm">GeeksforGeeks Url</h1>
              </div>
              <div className="flex w-full relative ml-4">
                <MdAlternateEmail className="absolute left-2 top-1/3" />
                <Field
                  id="geeksforgeeks"
                  name="geeksforgeeks"
                  placeholder="Enter your GeeksforGeeks account"
                  type="text"
                  className={clsx(
                    "w-full text-xs placeholder-[#767676] rounded-md focus:outline-none py-3 px-8 my-2",
                    errors.geeksforgeeks && touched.geeksforgeeks
                      ? "border border-red-500"
                      : "border border-[#D2D2D2]"
                  )}
                />
                <FiExternalLink className="absolute top-1/3 right-2" />
              </div>
              <h1 className="text-xs font-light text-red-700">
                {(errors as any)["geeksforgeeks"]}
              </h1>
            </div>
            <hr className="mx-2" />

            <div className="flex w-full">
              <div className="w-5/12 flex items-center gap-x-2 p-2">
                <img src="/icons/hackerrank.png" className="w-8" alt="" />
                <h1 className="text-sm">Hackerrank Url</h1>
              </div>
              <div className="flex w-full relative ml-4">
                <MdAlternateEmail className="absolute left-2 top-1/3" />
                <Field
                  id="hackerrank"
                  name="hackerrank"
                  placeholder="Enter your Hackerrank account"
                  type="text"
                  className={clsx(
                    "w-full text-xs placeholder-[#767676] rounded-md focus:outline-none py-3 px-8 my-2",
                    errors.hackerrank && touched.hackerrank
                      ? "border border-red-500"
                      : "border border-[#D2D2D2]"
                  )}
                />
                <FiExternalLink className="absolute top-1/3 right-2" />
              </div>
              <h1 className="text-xs font-light text-red-700">
                {(errors as any)["hackerrank"]}
              </h1>
            </div>
            <hr className="mx-2" />

            <div className="w-full flex">
              <div className="flex w-5/12 items-center gap-x-2 p-2">
                <img src="/icons/codeforces.png" className="w-8" alt="" />
                <h1 className="text-sm">Codeforces Url</h1>
              </div>
              <div className="flex w-full relative ml-4">
                <MdAlternateEmail className="absolute left-2 top-1/3" />
                <Field
                  id="codeforces"
                  name="codeforces"
                  placeholder="Enter your Codeforces account"
                  type="text"
                  className={clsx(
                    "w-full text-xs placeholder-[#767676] rounded-md focus:outline-none py-3 px-8 my-2",
                    errors.codeforces && touched.codeforces
                      ? "border border-red-500"
                      : "border border-[#D2D2D2]"
                  )}
                />
                <FiExternalLink className="absolute top-1/3 right-2" />
              </div>
              <h1 className="text-xs font-light text-red-700">
                {(errors as any)["codeforces"]}
              </h1>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProgrammingDetails;
