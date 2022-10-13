import clsx from "clsx";
import React, { useState } from "react";

export type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  text: string;
  icon?: any;
  classname?: string;
};

const Button = (props: ButtonProps) => {
  return (
    <div
      className={clsx(
        "flex items-center h-8 bg-primary text-white w-fit p-2 px-4 text-xs rounded-md",
        props.classname
      )}
    >
      {props.icon}
      <button onClick={props.onClick}>{props.text}</button>
    </div>
  );
};

export default Button;
