import React, { ReactNode } from "react";
import { FaHackerrank } from "react-icons/fa";
import { SiLeetcode, SiCodeforces, SiAcademia } from "react-icons/si";

export const getGoogleIcon: any = (name: string) => {
  name = name.toString().trim().toLowerCase();
  switch (name) {
    case "doc":
      return "/icons/google-docs.svg";
    case "sheet":
      return "/icons/google-sheets.svg";
    case "ppt":
      return "/icons/google-slides.svg";
    case "pdf":
      return "/icons/pdf-file-icon.svg";
    case "video":
      return "/icons/video-file-icon.svg";
   }
};
