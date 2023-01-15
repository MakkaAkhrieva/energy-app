import { AdminDashboard } from "../../src/components/AdminDashboard/AdminDashboard";
import { OnlyAuth } from "../../src/components/OnlyAuth/OnlyAuth";
import Page404 from "../../src/pages/404";
import Home from "../../src/pages/Home/Home";
import Login from "../../src/pages/Login/Login";
import Registration from "../../src/pages/Registration/Registration";
import { appRoutes } from "./routes";

export const routesConfig = [
  {
    path: appRoutes.HOME,
    element: <Home />,
  },
  {
    path: appRoutes.LOGIN,
    element: <Login />,
  },
  {
    path: appRoutes.REGISTRATION,
    element: <Registration />,
  },
  {
    path: appRoutes.USER,
    element: <OnlyAuth />,
  },
  {
    path: appRoutes.PAGE,
    element: <Page404 />,
  },
  {
    path: appRoutes.ADMIN,
    element: <AdminDashboard />,
  },
  {
    path: appRoutes.UNKNOWN,
    element: <Page404 />,
  },
];
