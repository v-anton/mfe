/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */

// Use the hidden-source-map option when you don't want the source maps to be
// publicly available on the servers, only to the error reporting
const path = require("path");
const withSourceMaps = require("@zeit/next-source-maps")({
  devtool: "hidden-source-map",
});
const withPlugins = require("next-compose-plugins");
const packageJson = require("./package.json");

// Use the SentryWebpack plugin to upload the source maps during build step
const SentryWebpackPlugin = require("@sentry/webpack-plugin");
const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
  VERCEL_GITHUB_COMMIT_SHA,
  VERCEL_GITLAB_COMMIT_SHA,
  VERCEL_BITBUCKET_COMMIT_SHA,
} = process.env;

const COMMIT_SHA =
  VERCEL_GITHUB_COMMIT_SHA ||
  VERCEL_GITLAB_COMMIT_SHA ||
  VERCEL_BITBUCKET_COMMIT_SHA;

process.env.SENTRY_DSN = SENTRY_DSN;
const basePath = "";

module.exports = withPlugins([withSourceMaps], {
  serverRuntimeConfig: {
    rootDir: __dirname,
  },
  webpack: (config, { isServer, webpack }) => {
    // eslint-disable-next-line no-param-reassign
    config.experiments = { topLevelAwait: true };
    // In `pages/_app.js`, Sentry is imported from @sentry/browser. While
    // @sentry/node will run in a Node.js environment. @sentry/node will use
    // Node.js-only APIs to catch even more unhandled exceptions.
    //
    // This works well when Next.js is SSRing your page on a server with
    // Node.js, but it is not what we want when your client-side bundle is being
    // executed by a browser.
    //
    // Luckily, Next.js will call this webpack function twice, once for the
    // server and once for the client. Read more:
    // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
    //
    // So ask Webpack to replace @sentry/node imports with @sentry/browser when
    // building the browser's bundle
    if (!isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser";
    }

    // When all the Sentry configuration env variables are available/configured
    // The Sentry webpack plugin gets pushed to the webpack plugins to build
    // and upload the source maps to sentry.
    // This is an alternative to manually uploading the source maps
    // Note: This is disabled in development mode.
    if (
      SENTRY_DSN &&
      SENTRY_ORG &&
      SENTRY_PROJECT &&
      SENTRY_AUTH_TOKEN &&
      COMMIT_SHA &&
      NODE_ENV === "production"
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: ".next",
          ignore: ["node_modules"],
          stripPrefix: ["webpack://_N_E/"],
          urlPrefix: `~${basePath}/_next`,
          release: COMMIT_SHA,
        }),
      );
    }
    if (!isServer) {
      config.output.library = packageJson.name;
      config.output.publicPath = "http://localhost:3000/_next/";
      config.plugins.push(
        new webpack.container.ModuleFederationPlugin({
          name: packageJson.name,
          library: {
            type: config.output.libraryTarget,
            name: packageJson.name,
          },
          filename: "static/runtime/remoteEntry.js",
          remotes: {
            hotelpackages_service_frontend: "hotelpackages_service_frontend",
            hsv4_extranet_login: "hsv4_extranet_login",
          },
          shared: [],
        }),
      );
    } else {
      config.resolve.alias["hsv4_extranet_login/authenticator"] = path.resolve(
        __dirname,
        "./src/components/noop",
      );
    }

    return config;
  },
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
  basePath,
  async rewrites() {
    return [
      // Do not rewrite API routes
      {
        source: "/api/:any*",
        destination: "/api/:any*",
      },
      // Rewrite everything else to use `pages/index`
      {
        source: "/:any*",
        destination: "/",
      },
    ];
  },
});
