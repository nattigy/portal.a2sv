import { type } from "os";

export enum UserRoleType {
  STUDENT = "Student",
  HOE = "HOE",
  HOA = "HOA",
}

export enum GraphqlUserRole {
  STUDENT = "STUDENT",
  HEAD_OF_EDUCATION = "HEAD_OF_EDUCATION",
  HEAD_OF_ACADEMY = "HEAD_OF_ACADEMY",
  ASSISTANT = "ASSISTANT",
}

type userProfileAddressType = {
  city: string;
  country: string;
};

export type UserProfile = {
  bio: string;
  birthDate: Date;
  countryCode: string;
  codeforces: string;
  createdAt: Date;
  currentEducationStatus: string;
  currentWorkStatus: string;
  educationDegree: string;
  educationField: string;
  educationPlace: string;
  educationYear: string;
  firstName: string;
  geekforgeeks: string;
  github: string;
  graduationYear: string;
  hackerrank: string;
  id: string;
  email: string;
  instagram: string;
  lastName: string;
  leetcode: string;
  linkedin: string;
  phone: string;
  photoUrl: string;
  resumeLink: string;
  telegram: string;
  tshirtSize: string;
  twitter: string;
  updatedAt: string;
  userId: string;
  userProfileAddress: userProfileAddressType;
  website: string;
};
