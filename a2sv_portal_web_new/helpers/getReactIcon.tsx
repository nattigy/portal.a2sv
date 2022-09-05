import React, { ReactNode } from "react";
import {
  FaHackerrank,
} from "react-icons/fa";
import { SiLeetcode, SiCodeforces, SiAcademia } from "react-icons/si";

export const getIcon: any = (name: string) => {
  switch (name) {
    case "LEETCODE":
      return <SiLeetcode />;
    case "HACKERRANK":
      return <FaHackerrank />;
    case "CODEFORCES":
      return <SiCodeforces />;
    default:
      return <SiAcademia />;
  }
};
