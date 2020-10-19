import Auth from "@aws-amplify/auth";
import { Amplify, UniversalStorage, Hub } from "@aws-amplify/core";
import {
  AuthState,
  AuthStateHandler,
  CognitoUserInterface,
} from "@aws-amplify/ui-components";
import { TODO_ANY } from "../types/common";

export async function checkContact(
  user: CognitoUserInterface,
  handleAuthStateChange: AuthStateHandler,
): Promise<void> {
  handleAuthStateChange(AuthState.SignedIn, user);
}

export function configureAmplify(context?: { req?: TODO_ANY }): void {
  Amplify.configure({
    aws_project_region: process.env.NEXT_PUBLIC_AWS_PROJECT_REGION,
    aws_cognito_identity_pool_id:
      process.env.NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID,
    aws_cognito_region: process.env.NEXT_PUBLIC_AWS_COGNITO_REGION,
    aws_user_pools_id: process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID,
    aws_user_pools_web_client_id:
      process.env.NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID,
    oauth: {},
    storage: new UniversalStorage(context),
    authenticationFlowType: "USER_PASSWORD_AUTH",
  });
}

// Hub Events and Channels
export const AUTH_CHANNEL = "auth";
export const UI_AUTH_CHANNEL = "UI Auth";
export const AUTH_STATE_CHANGE_EVENT = "AuthStateChange";

export const dispatchAuthStateChangeEvent = (
  nextAuthState: AuthState,
  data?: TODO_ANY,
): void => {
  Hub.dispatch(UI_AUTH_CHANNEL, {
    event: AUTH_STATE_CHANGE_EVENT,
    message: nextAuthState,
    data,
  });
};

export const initialAuthState = AuthState.SignIn;

export async function checkUser(): Promise<void> {
  try {
    const user = await Auth.currentAuthenticatedUser();
    dispatchAuthStateChangeEvent(AuthState.SignedIn, user);
  } catch (error) {
    dispatchAuthStateChangeEvent(initialAuthState);
  }
}
