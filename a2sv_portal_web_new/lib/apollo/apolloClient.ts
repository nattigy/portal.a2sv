import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import type { GetServerSidePropsContext } from "next";
import type { NormalizedCacheObject } from "@apollo/client";
import { useMemo } from "react";
import { onError } from "@apollo/client/link/error";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import configs from "../constants/configs";
import { setContext } from "@apollo/client/link/context";
import authenticatedVar, {
  authenticatedUser,
} from "../constants/authenticated";

interface PageProps {
  props?: Record<string, any>;
}

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const logoutLink = onError(({ graphQLErrors }) => {
  if (
    graphQLErrors?.length &&
    (graphQLErrors[0].extensions.response as any)?.statusCode == 401
  ) {
    authenticatedVar(false);
    authenticatedUser({});
  }
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const createApolloClient = (ctx?: GetServerSidePropsContext) => {
  const httpLink = new HttpLink({
    uri: configs.NEXT_PUBLIC_API_URL,
    credentials: "same-origin",
  });

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    cache: new InMemoryCache(),
    link: from([logoutLink, errorLink, httpLink]),
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
