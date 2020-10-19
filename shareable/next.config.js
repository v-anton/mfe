const packageJson = require("./package.json");

module.exports = {
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.output.library = packageJson.name;
      config.output.publicPath = "http://localhost:3002/_next/";
      config.plugins.push(
        new webpack.container.ModuleFederationPlugin({
          name: packageJson.name,
          library: {
            type: config.output.libraryTarget,
            name: packageJson.name,
          },
          filename: "static/runtime/remoteEntry.js",
          exposes: {
            "./authenticator": "./src/components/authenticator",
          },
          remotes: {
            hsv4_extranet: "hsv4_extranet",
          },
          shared: {
            ...packageJson.dependencies,
            react: {
              singleton: true,
            },
            ["react-dom"]: {
              singleton: true,
            },
            ["react-intl"]: {
              singleton: true,
            },
            "@aws-amplify/auth": {
              singleton: true,
            },
            "@aws-amplify/core": {
              singleton: true,
            },
            "@aws-amplify/ui-components": {
              singleton: true,
            },
          },
        }),
      );
    }

    return config;
  },
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
