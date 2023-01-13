import React from "react";
import { Navigate } from "react-router-dom";

export const AuthRequired = ({ children }) => {
  const isAuth = localStorage.getItem("token");

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }
  /* return children ? children : <Outlet />; */
  return children;
};
