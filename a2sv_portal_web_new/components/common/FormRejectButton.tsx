import React from "react";

type Props = {
  onClick: any;
  text: string;
};

const FormRejectButton = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className="min-w-min px-6 py-3 mt-4 text-sm font-semibold bg-primary bg-opacity-10 text-gray-600 rounded-lg"
    >
      {props.text}
    </button>
  );
};

export default FormRejectButton;
