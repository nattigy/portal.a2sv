import clsx from "clsx";
import { Field, FormikProps } from "formik";
import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { MdAlternateEmail } from "react-icons/md";
import Button from "../common/Button";
import FormAffirmativeButton from "../common/FormAffirmativeButton";
import CustomLinkField from "./CustomLinkField";
import { ProfileFormValues } from "./ProfileInfo";

type Props = {
  formik: FormikProps<ProfileFormValues>;
  prevStep: (values: ProfileFormValues) => void;
};

const ProgrammingDetails = ({ formik, prevStep }: Props) => {
  const { values, isSubmitting, touched, errors } = formik;

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
        <div className=" flex-1 flex flex-row justify-end gap-x-4 pr-4">
          <Button
            disabled={Object.keys(formik.errors).some((key) =>
              ["github", "leetcode", "codeforces", "hackerrank"].includes(key)
            )}
            text="Back"
            onClick={() => prevStep(values)}
            classname="bg-gray-100 text-primary px-5 text-sm h-10 disabled:bg-gray-300/60"
          />
          <FormAffirmativeButton
            disabled={Object.keys(formik.errors).some((key) =>
              ["github", "leetcode", "codeforces", "hackerrank"].includes(key)
            )}
            text="Submit"
            isLoading={formik.isSubmitting}
            className="!px-5 !text-sm !py-0 !mt-0 !font-normal !h-10 disabled:bg-primary/60"
          />
        </div>
      </div>
      <hr className="ml-4" />
      <div className="flex flex-col gap-y-2 xl:w-1/2 lg:w-3/5 md:w-5/6 w-full pr-6">
        <CustomLinkField
          name="leetcode"
          placeholder="Leetcode"
          title="Leetcode URL"
          touched={touched.leetcode}
          error={errors.leetcode}
          required={true}
          imgPath="/icons/leetcode.png"
        />
        <hr className="mx-2" />
        <CustomLinkField
          name="geeksforgeeks"
          placeholder="GeeksforGeeks"
          title="GeeksforGeeks URL"
          touched={touched.geeksforgeeks}
          error={errors.geeksforgeeks}
          imgPath="/icons/geeksforgeeks.png"
        />
        <hr className="mx-2" />

        <CustomLinkField
          name="hackerrank"
          placeholder="Hackerrank"
          title="Hackerrank URL"
          touched={touched.hackerrank}
          error={errors.hackerrank}
          required={true}
          imgPath="/icons/hackerrank.png"
        />

        <hr className="mx-2" />
        <CustomLinkField
          name="codeforces"
          placeholder="Codeforces"
          title="Codeforces URL"
          touched={touched.codeforces}
          error={errors.codeforces}
          required={true}
          imgPath="/icons/codeforces.png"
        />

        <hr className="mx-2" />
        <CustomLinkField
          name="github"
          placeholder="Github"
          title="Github URL"
          touched={touched.github}
          error={errors.github}
          required={true}
          imgPath="/icons/github.png"
        />
      </div>
    </div>
  );
};

export default ProgrammingDetails;
