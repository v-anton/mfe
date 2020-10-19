import "../styles/index.css";
import "../utils/amplify-autoconfig";
import {
  AppContextType,
  AppInitialProps,
  AppPropsType,
  NextComponentType,
} from "next/dist/next-server/lib/utils";
import { ApolloProvider } from "@apollo/client";
import { createIntl, createIntlCache, RawIntlProvider } from "react-intl";
import * as Sentry from "@sentry/node";
import { RewriteFrames } from "@sentry/integrations";
import getConfig from "next/config";
import Cookies from "universal-cookie";
import { useApollo } from "../utils/apollo-client";
import { TODO_ANY } from "../types/common";

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  const config = getConfig();
  const distDir = `${config.serverRuntimeConfig.rootDir}/.next`;
  Sentry.init({
    enabled: process.env.NODE_ENV === "production",
    integrations: [
      new RewriteFrames({
        iteratee: (frame) => {
          if (frame) {
            // eslint-disable-next-line no-param-reassign
            frame.filename = frame.filename?.replace(distDir, "app:///_next");
          }
          return frame;
        },
      }),
    ],
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

// This is optional but highly recommended
// since it prevents memory leak
const cache = createIntlCache();

const MyApp: NextComponentType<
  AppContextType,
  AppInitialProps,
  AppPropsType & {
    locale: string;
    messages: Record<string, string>;
    err: TODO_ANY;
  }
> = ({ Component, pageProps, locale, messages, err }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  const intl = createIntl(
    {
      locale,
      messages,
    },
    cache,
  );

  return (
    <RawIntlProvider value={intl}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} err={err} />
      </ApolloProvider>
    </RawIntlProvider>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  // const appProps = await App.getInitialProps(appContext as never);
  const cookies = new Cookies(appContext.ctx.req?.headers.cookie);

  const locale = cookies.get("locale") ?? "en";
  const messages = (await import(`../../translations/${locale}.json`)).default;

  return { locale, messages: messages.default, pageProps: {} };
};

export default MyApp;
