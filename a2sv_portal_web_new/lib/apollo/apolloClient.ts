import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
  WatchQueryOptions,
} from "@apollo/client";
import type { GetServerSidePropsContext } from "next";
import type { NormalizedCacheObject } from "@apollo/client";
import { useMemo } from "react";
import { onError } from "@apollo/client/link/error";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import configs from "../constants/configs";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from "@apollo/client/link/context";
import authenticatedVar, {
  authenticatedUser,
  hasNetworkError,
} from "../constants/authenticated";

interface PageProps {
  props?: Record<string, any>;
}

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const logoutLink = onError(
  ({ operation, graphQLErrors, networkError, forward }) => {
    if (
      graphQLErrors?.length &&
      (graphQLErrors[0].extensions.response as any)?.statusCode == 401
    ) {
      authenticatedVar(false);
      authenticatedUser({});
    }
    return forward(operation);
  }
);

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf: (error, _operation) => !!error,
  },
});

const httpLink = new HttpLink({
  uri: configs.NEXT_PUBLIC_API_URL,
  credentials: "same-origin",
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =
    typeof window !== "undefined"
      ? await localStorage.getItem("access-token")
      : "";
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const authMiddleware = new ApolloLink((operation, forward) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : "";
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }));

  return forward(operation);
});
const errorLink = onError(
  ({ operation, response, graphQLErrors, networkError, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
      // if ((graphQLErrors[0].extensions.response as any)?.statusCode === 401) {
      //   authenticatedVar(false);
      //   authenticatedUser({});
      // }
      // if ((graphQLErrors[0].extensions.response as any)?.statusCode === 500) {
      //   authenticatedVar(false);
      //   authenticatedUser({});
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      // hasNetworkError(true);
    } else {
      // hasNetworkError(false);
    }
    return forward(operation);
  }
);

const createApolloClient = (ctx?: GetServerSidePropsContext) => {
  const baseOptions: Partial<WatchQueryOptions<any, any>> | undefined = {
    errorPolicy: "all",
  };
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : "";
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${token}`,
    },
    link: from([authMiddleware, retryLink, logoutLink, errorLink, httpLink]),
    credentials: "same-origin",
    defaultOptions: {
      watchQuery: baseOptions,
    },
    name: "A2SV PORTAL",
    version: "0.1.0",
    // connectToDevTools: true,
  });
};
interface InitApollo {
  initialState?: any;
  ctx?: any;
}
export function initializeApollo({ ctx, initialState }: InitApollo) {
  const _apolloClient = apolloClient ?? createApolloClient(ctx || undefined);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: PageProps
) {
  if (pageProps?.props) {
    pageProps.props[configs.APOLLO_STATE_PROPERTY_NAME] =
      client.cache.extract();
  }
  return pageProps;
}

export function useApollo(pageProps: any) {
  const state = pageProps[configs.APOLLO_STATE_PROPERTY_NAME];
  const store = useMemo(
    () => initializeApollo({ initialState: state }),
    [state]
  );
  return store;
}
