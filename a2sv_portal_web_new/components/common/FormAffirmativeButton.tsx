import clsx from "clsx";
import React from "react";

type Props = {
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
};

const FormAffirmativeButton = (props: Props) => {
  return (
    <button
      disabled={props.disabled}
      type="submit"
      className={clsx(
        "flex justify-center items-center min-w-min px-6 py-3 mt-4 text-sm font-semibold text-white bg-primary rounded-lg",
        props.className,
        props.disabled && "cursor-not-allowed bg-primary/50"
      )}
    >
      {props.isLoading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {props.text}
    </button>
  );
};

export default FormAffirmativeButton;
