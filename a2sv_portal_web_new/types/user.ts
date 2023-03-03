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

export type UserProfile = {
  bio: string;
  birthDate: Date;
  city: string;  
  codeforces: string;
  country: string;
  countryCode: string;
  createdAt: Date;
  currentEducationStatus: string;
  currentWorkStatus: string;
  educationDegree: string;
  educationField: string;
  educationPlace: string;
  educationYear: string;
  email: string;
  firstName: string;
  geekforgeeks: string;
  github: string;
  graduationYear: string;
  hackerrank: string;
  instagram: string;
  id: string;
  lastName: string;
  leetcode: string;
  linkedin: string;
  middleName: string;
  phone: string;
  photoUrl: string;
  resumeLink: string;
  telegram: string;
  tshirtSize: string;
  twitter: string;
  updatedAt: string;
  userId: string;
  website: string;
};
