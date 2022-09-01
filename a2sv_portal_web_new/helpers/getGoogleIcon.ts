import React, { ReactNode } from "react";
import {
  FaHackerrank,
} from "react-icons/fa";
import { SiLeetcode, SiCodeforces, SiAcademia } from "react-icons/si";

export const getGoogleIcon:any = (name: string) => {
    name = name.toString().trim().toLowerCase();
  switch (name) {
    case "docs":
      return "/icons/google-docs.svg";
    case "sheets":
      return "/icons/google-sheets.svg";
    case "slides":
      return "/icons/google-slides.svg";
    default:
      return "/icons/google-docs.svg";
  }
};