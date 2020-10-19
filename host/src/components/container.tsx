import { FC } from "react";
import "react-dom";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../utils/apollo-client";
// import Authenticator from "./authenticator";

const Container: FC = ({ children }) => {
  const apolloClient = useApollo(null);
  return (
    // <Authenticator>
    <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    // </Authenticator>
  );
};

export default Container;
