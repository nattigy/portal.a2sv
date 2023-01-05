import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import NetworkErrorToaster from "../components/modals/NetworkErrorToaster";
import { useApollo } from "../lib/apollo/apolloClient";
import Guard from "../lib/Guard";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps);

  return (
    <ApolloProvider client={client}>
      <NetworkErrorToaster />
      <Guard client={client} excludedRoutes={["/auth", "/auth/forgot", "/auth/reset", "/auth/verify"]}>
        <Component {...pageProps} />
      </Guard>
    </ApolloProvider>
  );
}
