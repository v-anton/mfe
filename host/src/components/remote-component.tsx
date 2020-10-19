import { lazy, Suspense, FC } from "react";
import packageJson from "../../package.json";
import { TODO_ANY } from "../types/common";

const RemoteComponent: FC<{ scope: string; module: string }> = ({
  scope,
  module,
  ...props
}) => {
  // FIXME: typings
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!globalThis[scope]) {
    return null;
  }
  // FIXME: typings
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!globalThis[`initialized_${scope}`]) {
    // FIXME: typings
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    globalThis[scope].init({
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
    });
    // FIXME: typings
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    globalThis[`initialized_${scope}`] = true;
  }

  const Component = lazy(() =>
    // FIXME: typings
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    globalThis[scope].get(module).then((factory: TODO_ANY) => factory()),
  );

  return (
    <Suspense fallback={null}>
      <Component {...props} />
    </Suspense>
  );
};

export default RemoteComponent;
