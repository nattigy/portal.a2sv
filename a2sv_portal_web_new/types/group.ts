export type Group = {    
    groupId: number;
    groupName: string;
    groupCountry: string;
    groupSchool: string;
    createdAt: string;
    head?: {id: string, email: string}
    students: any[];
    totalStudentsCount: number;
};

