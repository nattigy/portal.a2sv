import { makeVar } from "@apollo/client";
import { GraphqlUserRole } from "../../types/user";

const authenticatedVar = makeVar(true);
export type AuthUser = {
  group: {
    name: string;
    id: string;
  };
  createdAt: string;
  id: string;
  name: string;
  email: string;
  groupId: string;
  role: GraphqlUserRole;
  status: string;
  headToGroup: {
    id: string;
    name: string;
  };
};
export const authenticatedUser: AuthUser | any = makeVar({});

//  network error
export const hasNetworkError = makeVar(false);

export default authenticatedVar;
