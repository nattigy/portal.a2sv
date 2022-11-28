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
  bio:string,
  birthDate:Date,
  codeforces:string,
  createdAt:Date,
  educationDegree:string,
  educationField:string,
  educationPlace:string,
  educationYear:string,
  facebook:string,
  firstName:string,
  geekforgeeks:string,
  github:string,
  graduationYear:string,
  hackerrank:string,
  id:string,
  instagram:string,
  lastName:string,
  leetcode:string,
  linkedin:string,
  phone:string,
  photoUrl:string,
  resumeLink:string,
  tshirtSize:string,
  twitter:string,
  updatedAt:string,
  userId:string,
  website:string,


}