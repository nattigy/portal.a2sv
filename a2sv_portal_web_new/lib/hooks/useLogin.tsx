import { gql, useMutation, useQuery } from "@apollo/client";
import { initializeApollo, useApollo } from "../apollo/apolloClient";
import authenticatedVar from "../constants/authenticated";
// import authenticatedVar from "../constants/authenticated";
import configs from "../constants/configs";

interface SignInInput {
  SignInData: {
    email: string;
    password: string;
  };
}

interface User {
  _id: string;
  email: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

const useLogin = (pageProps?: any) => {
  const apolloClient = initializeApollo(pageProps);
  const login = async (body: LoginRequest) => {
    await fetch(`${configs.API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "applications/json",
      },
      body: JSON.stringify(body),
    });

    apolloClient.refetchQueries({ include: "active" });
    authenticatedVar(true);
  };
  return { login };
};

export default useLogin;
