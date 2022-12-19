export type Season = {
  name: string;
  id: string;
  seasonType: SeasonType;
  startDate: Date;
  endDate: Date;
  groupId: string;
  isActive: boolean;
  duration :string;
  updatedAt:Date;
  createdAt:Date;
};

export enum SeasonType {
  EDUCATION = "EDUCATION",
  CAMP = "CAMP",
  PROJECT = "PROJECT",
}
