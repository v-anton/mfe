import React, { useEffect, useState } from "react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { Hub, UniversalStorage } from "@aws-amplify/core";
import {
  AUTH_CHANNEL,
  checkContact,
  checkUser,
  dispatchAuthStateChangeEvent,
  initialAuthState,
} from "../utils/amplify-helpers";
import { Login } from "./pages/login";
import { ForgotPassword } from "./pages/forgot-password";
import { TODO_ANY } from "../types/common";

const Authenticator: React.FC = ({ children }) => {
  const [authState, setauthState] = useState(initialAuthState);
  useEffect(() => {
    const unsubscribe = onAuthUIStateChange((nextAuthState, data) => {
      if (nextAuthState === AuthState.SignedIn) {
        const cookies = new UniversalStorage().cookies;
        const existingSession = cookies.get("hsv4");
        cookies.set(
          "hsv5",
          (data as TODO_ANY).signInUserSession.idToken.jwtToken,
          {
            domain:
              process.env.NODE_ENV === "production"
                ? ".hotel-spider.ch"
                : undefined,
            path: "/",
            secure: true,
            httpOnly: true,
            sameSite: "none",
          },
        );
        if (!existingSession) {
          cookies.set(
            "hsv4",
            (data as TODO_ANY).signInUserSession?.idToken?.payload?.hsv4,
            {
              domain:
                process.env.NODE_ENV === "production"
                  ? ".hotel-spider.ch"
                  : undefined,
              path: "/",
              secure: true,
              httpOnly: true,
              sameSite: "none",
            },
          );
        }
      }
      setauthState(nextAuthState);
    });
    Hub.listen(AUTH_CHANNEL, ({ payload }) => {
      switch (payload.event) {
        case "cognitoHostedUI":
        case "signIn":
          checkContact(payload.data, dispatchAuthStateChangeEvent);
          break;
        case "cognitoHostedUI_failure":
        case "parsingUrl_failure":
        case "signOut":
        case "customGreetingSignOut":
          return dispatchAuthStateChangeEvent(initialAuthState);
        default:
          return null;
      }

      return null;
    });
    checkUser();
    return unsubscribe;
  }, []);
  if (authState === AuthState.SignIn) {
    return <Login />;
  }
  if (authState === AuthState.ForgotPassword) {
    return <ForgotPassword />;
  }
  return <>{children}</>;
};

export default Authenticator;
