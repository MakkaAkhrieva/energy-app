import { useRoutes } from "react-router-dom";
import { routesConfig } from "./router-config";
import { ProtectedRoute } from "./protected-route";

export const RouteRenderer = () => {
  const config = routesConfig.map((item) => {
    if (item.isProtected) {
      return {
        ...item,
        element: (
          <ProtectedRoute expectedRole={item.expectedRole}>
            {item.element}
          </ProtectedRoute>
        ),
      };
    }
    return item;
  });

  const routes = useRoutes(config);
  return routes;
};
