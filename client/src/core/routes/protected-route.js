import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({ expectedRole, children }) => {
  const isAuth = localStorage.getItem("token");
  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }
  const role = localStorage.getItem("role");
  if (expectedRole === role) {
    return children;
  }
  return <Navigate to={"/"} />;
};
