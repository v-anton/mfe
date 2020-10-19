/* eslint-disable no-underscore-dangle */
import { useMemo } from "react";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const asyncAuthLink = setContext(() => {
  return {};
});

function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  const httpLink = new HttpLink({
    uri:
      // TEMP solustion
      "https://3g4ovziuercppm55khs76imsg4.appsync-api.ap-south-1.amazonaws.com/graphql",
    headers: {
      "x-api-key": "da2-rqns57wktndtfoq4yt3g6dthoi",
    },
  });
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: asyncAuthLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(
  initialState: Record<string, never> | null = null,
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(
  initialState: Record<string, never> | null,
): ApolloClient<NormalizedCacheObject> {
  return useMemo(() => initializeApollo(initialState), [initialState]);
}
