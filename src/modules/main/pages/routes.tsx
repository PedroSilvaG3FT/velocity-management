import { RouteObject } from "react-router-dom";

import User from "./user";
import Home from "./home";
import Group from "./group";
import Billing from "./billing";
import Profile from "./profile";
import Settings from "./settings";
import Playground from "./playground";
import MainLayout from "../layout/main-layout";

export const MAIN_ROUTES: RouteObject[] = [
  {
    path: "",
    element: <MainLayout />,
    children: [
      { path: "", Component: Home },
      { path: "user", Component: User },
      { path: "group", Component: Group },
      { path: "billing", Component: Billing },
      { path: "profile", Component: Profile },
      { path: "settings", Component: Settings },
      { path: "playground", Component: Playground },
    ],
  },
];
