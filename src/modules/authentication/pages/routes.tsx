import { RouteObject } from "react-router-dom";

import SignIn from "./sign-in";
import AuthenticationLayout from "../layout";
import SignInMethods from "./sign-in-methods";

export const AUTHENTICATION_ROUTES: RouteObject[] = [
  {
    path: "/auth",
    element: <AuthenticationLayout />,
    children: [
      { path: "sign-in", Component: SignIn },
      { path: "sign-in-methods", Component: SignInMethods },
    ],
  },
];
