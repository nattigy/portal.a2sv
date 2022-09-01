import React, { ReactNode } from "react";
import {
  FaHackerrank,
} from "react-icons/fa";
import { SiLeetcode, SiCodeforces, SiAcademia } from "react-icons/si";

export const getIcon:any = (name: string) => {
  switch (name) {
    case "Leetcode":
      return <SiLeetcode />;
    case "Hackerrank":
      return <FaHackerrank />;
    case "Codeforces":
      return <SiCodeforces />;
    default:
      return <SiAcademia />;
  }
};
