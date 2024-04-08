import { RouteObject } from "react-router-dom";

import Home from "./home";
import MainLayout from "../layout/main-layout";

export const MAIN_ROUTES: RouteObject[] = [
  {
    path: "",
    element: <MainLayout />,
    children: [{ path: "home", Component: Home }],
  },
];
