import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { useApollo } from "../lib/apollo/apolloClient";
import Guard from "../lib/Guard";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps);

  return (
    <ApolloProvider client={client}>
      <Guard client={client} excludedRoutes={["/auth"]}>
        <Component {...pageProps} />
      </Guard>
    </ApolloProvider>
  );
}
