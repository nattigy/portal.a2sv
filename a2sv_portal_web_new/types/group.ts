export type Group = {
  id: number;
  name: string;
  country: string;
  school: string;
  createdAt: string;
  head?: { id: string; email: string };
  users?: any[];
  totalStudentsCount: number;
};
