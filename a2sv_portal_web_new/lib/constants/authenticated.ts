import { makeVar } from "@apollo/client";

const authenticatedVar = makeVar(true);
export const authenticatedUser = makeVar({});

export default authenticatedVar;
