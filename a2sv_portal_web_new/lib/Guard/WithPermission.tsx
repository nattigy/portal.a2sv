import { useReactiveVar } from "@apollo/client";
import { GraphqlUserRole } from "../../types/user";
import { authenticatedUser, AuthUser } from "../constants/authenticated";

type Props = {
    children: JSX.Element;
    allowedRoles:GraphqlUserRole[]
};
  
const WithPermission = ({ children,allowedRoles }: Props) => {
    const authUser = useReactiveVar(authenticatedUser) as AuthUser;
    return allowedRoles.includes(authUser.role) ? children:<></>;
  };
export default WithPermission;