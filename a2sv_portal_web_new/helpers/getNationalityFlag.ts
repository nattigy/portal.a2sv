import React, { ReactNode } from "react";

export const getNationality: any = (name: string) => {
  switch (name) {
    case "Ethiopia":
      return "/icons/ethiopia-flag.png";
    case "Ghana":
      return "/icons/ghana-flag.png";
    case "Turkey":
      return "/icons/turkey-flag.png";
    default:
      return "";
  }
};
