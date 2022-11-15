
export type Season = {
    name:string;
    id:string;
    seasonType:SeasonType;
    startDate:Date;
    endDate:Date;
    groupId:string
    isActive:boolean;
  };

  export enum SeasonType {
    EDUCATION="EDUCATION",
    CAMP="CAMP",
    PROJECT="PROJECT"
  }
  