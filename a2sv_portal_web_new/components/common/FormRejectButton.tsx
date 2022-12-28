import clsx from "clsx";
import React from "react";

type Props = {
  onClick: any;
  text: string;
  className?: string;
};

const FormRejectButton = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className={clsx(
        "min-w-min px-6 py-3 mt-4 text-sm font-semibold bg-primary bg-opacity-10 text-gray-600 rounded-lg",
        props.className
      )}
    >
      {props.text}
    </button>
  );
};

export default FormRejectButton;
