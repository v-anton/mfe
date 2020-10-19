import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import dynamic from "next/dynamic";
import Layout from "./components/layout";
import AngularFrame from "./components/angular-frame";
import { UserSettings } from "./components/pages/user-settings";
import packageJson from "../package.json";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// await __webpack_init_sharing__("default");
// console.warn("first", __webpack_share_scopes__.default);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
__webpack_share_scopes__.default = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // ...__webpack_share_scopes__.default,
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

const Authenticator = dynamic(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line global-require
    const a = await import("hsv4_extranet_login/authenticator");
    console.warn(a);
    return a;
    // console.warn(res);
    // if (process.env.NODE_ENV === "production") {
    //   return res.default;
    // }
    // return res;
  },
);

const App: React.FC = () => {
  return (
    <div>
      <Authenticator>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Navigate to="hotel/00W5abcfe6dab339" />
            </Route>
            <Route
              path="hotel/*"
              element={
                <Routes>
                  <Route
                    path=":hotelId/*"
                    element={
                      <Layout>
                        <Routes>
                          <Route path="/" element={<AngularFrame />} />
                          <Route
                            path="my-property"
                            element={<AngularFrame />}
                          />
                          <Route path="rooms" element={<AngularFrame />} />
                          <Route path="rateplans" element={<AngularFrame />} />
                          {/* <Route path="packages" element={<PackagesPage />} /> */}
                          <Route path="products" element={<AngularFrame />} />
                          <Route path="services/*" element={<AngularFrame />} />
                          <Route path="offers" element={<AngularFrame />} />
                          <Route
                            path="connectivity"
                            element={<AngularFrame />}
                          />
                          <Route path="overview" element={<AngularFrame />} />
                          <Route
                            path="availabilities"
                            element={<AngularFrame />}
                          />
                          <Route
                            path="booking-rules/*"
                            element={
                              <Routes>
                                <Route
                                  path="hotel"
                                  element={<AngularFrame />}
                                />
                                <Route
                                  path="rooms"
                                  element={<AngularFrame />}
                                />
                                <Route
                                  path="rates"
                                  element={<AngularFrame />}
                                />
                                <Route
                                  path="products"
                                  element={<AngularFrame />}
                                />
                              </Routes>
                            }
                          />
                          <Route path="prices" element={<AngularFrame />} />
                          <Route
                            path="reservations/*"
                            element={
                              <Routes>
                                <Route path="new" element={<AngularFrame />} />
                                <Route
                                  path="search"
                                  element={<AngularFrame />}
                                />
                              </Routes>
                            }
                          />
                          <Route path="history" element={<AngularFrame />} />
                          <Route path="settings" element={<AngularFrame />} />
                          <Route path="support" element={<AngularFrame />} />
                          <Route path="user/settings">
                            <UserSettings />
                          </Route>
                        </Routes>
                      </Layout>
                    }
                  />
                </Routes>
              }
            />
          </Routes>
        </BrowserRouter>
      </Authenticator>
    </div>
  );
};

export default App;
