import { AdminDashboard } from "../../components/AdminDashboard/AdminDashboard.js";
import { OnlyAuth } from "../../components/OnlyAuth/OnlyAuth.js";
import Page404 from "../../pages/404.js";
import Home from "../../pages/Home/Home.js";
import Login from "../../pages/Login/Login.js";
import Registration from "../../pages/Registration/Registration.js";
import { appRoutes } from "./routes.js";
import { userRoles } from "./constant.js";
import Profile from "../../components/Profile/Profile.js";

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
    isProtected: true,
    expectedRole: userRoles.user,
    children: [
      {
        path: appRoutes.USER_PAGE,
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: appRoutes.ADMIN,
    element: <AdminDashboard />,
    isProtected: true,
    expectedRole: userRoles.admin,
  },
  {
    path: appRoutes.UNKNOWN,
    element: <Page404 />,
  },
  {
    path: appRoutes.USER_PROFILE,
    element: <Profile />,
    isProtected: true,
    expectedRole: userRoles.user,
  },
];
