import clsx from "clsx";
import React from "react";

type Props = {
  className?: string;
  name?: string;
  placeholder?: string;
  onChange?: (e: any) => void;
};

const ExpandableSearchInput = (props: Props) => {
  return (
    <div className={clsx("bg-[#F0F0F0] relative w-max rounded-lg", props.className)}>
      <input
        type="search"
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        className={clsx(
          "peer cursor-pointer relative z-10 h-10 w-full md:w-10 focus:w-full rounded-lg border bg-transparent pl-10 appearance-none outline-none focus:cursor-text focus:border-primary focus:pl-14 focus:pr-4 transition-all duration-150 ease-in-out text-sm"
        )}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className=" absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent focus:self-start stroke-gray-400 px-3 peer-focus:border-primary peer-focus:stroke-primary "
        fill="none"
        viewBox="0 0 24 24"
        stroke="#9F9F9F"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

export default ExpandableSearchInput;
