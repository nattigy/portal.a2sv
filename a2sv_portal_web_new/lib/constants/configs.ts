const API_URL =
  process.env.API_URL ||
  "https://portal-backend-369707.oa.r.appspot.com/graphql";

// const NEXT_PUBLIC_API_URL =
//   `${process.env.NEXT_PUBLIC_API_URL}` ||
//   "https://a2sv-portal.herokuapp.com/graphql";

const NEXT_PUBLIC_API_URL =
  process.env.API_URL ||
  "https://portal-backend-369707.oa.r.appspot.com/graphql";

const APOLLO_STATE_PROPERTY_NAME =
  process.env.APOLLO_STATE_PROPERTY_NAME || "__APOLLO_STATE__";
const COOKIES_TOKEN_NAME = "AUTHENTICATION";

const configs = {
  API_URL,
  NEXT_PUBLIC_API_URL,
  APOLLO_STATE_PROPERTY_NAME,
  COOKIES_TOKEN_NAME,
};
export default configs;
