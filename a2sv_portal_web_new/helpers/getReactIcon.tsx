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


export const generateRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const getRandomNumber = (min:number, max: number) => {
  const rndInt = Math.floor(Math.random() * max) + min
  return rndInt
}