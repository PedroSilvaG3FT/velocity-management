import { RouterProvider } from "react-router-dom";
import { WrapperProvider } from "./contexts/wrapper.context";

import { createBrowserRouter } from "react-router-dom";
import RouteGuardWrapper from "./modules/@shared/guards/route.guard";
import { AUTHENTICATION_ROUTES } from "./modules/authentication/pages/routes";
import { MAIN_ROUTES } from "./modules/main/pages/routes";
import AppLoading from "./modules/@shared/components/loading";

export const AppRoutes = createBrowserRouter([
  { path: "*", element: <RouteGuardWrapper /> },
  {
    path: "/",
    element: <RouteGuardWrapper />,
    children: [...MAIN_ROUTES, ...AUTHENTICATION_ROUTES],
  },
]);

function App() {
  return (
    <WrapperProvider>
      <AppLoading />
      <RouterProvider router={AppRoutes} />
    </WrapperProvider>
  );
}

export default App;
