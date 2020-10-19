import packageJson from "../../package.json";

export function loadComponent(scope: string, module: string) {
  return async () => {
    // Initializes the shared scope. Fills it with known provided modules from this build and all remotes
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await __webpack_init_sharing__("default");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    __webpack_share_scopes__.default = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...__webpack_share_scopes__.default,
      react: {
        [packageJson.dependencies.react]: {
          // eslint-disable-next-line global-require
          get: () => Promise.resolve().then(() => () => require("react")),
        },
      },
      "react-dom": {
        [packageJson.dependencies["react-dom"]]: {
          // eslint-disable-next-line global-require
          get: () => Promise.resolve().then(() => () => require("react-dom")),
        },
      },
      "react-intl": {
        [packageJson.dependencies["react-intl"]]: {
          // eslint-disable-next-line global-require
          get: () => Promise.resolve().then(() => () => require("react-intl")),
        },
      },
      "@apollo/client": {
        [packageJson.dependencies["@apollo/client"]]: {
          get: () =>
            // eslint-disable-next-line global-require
            Promise.resolve().then(() => () => require("@apollo/client")),
        },
      },
      "@aws-amplify/core": {
        [packageJson.dependencies["@aws-amplify/core"]]: {
          get: () =>
            // eslint-disable-next-line global-require
            Promise.resolve().then(() => () => require("@aws-amplify/core")),
        },
      },
      "@aws-amplify/auth": {
        [packageJson.dependencies["@aws-amplify/auth"]]: {
          get: () =>
            // eslint-disable-next-line global-require
            Promise.resolve().then(() => () => require("@aws-amplify/auth")),
        },
      },
      "@aws-amplify/ui-components": {
        [packageJson.dependencies["@aws-amplify/ui-components"]]: {
          get: () =>
            Promise.resolve().then(() => () =>
              // eslint-disable-next-line global-require
              require("@aws-amplify/ui-components"),
            ),
        },
      },
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const container = globalThis[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await container.init(__webpack_share_scopes__.default);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const factory = await globalThis[scope].get(module);
    const Module = factory();
    return Module;
  };
}
