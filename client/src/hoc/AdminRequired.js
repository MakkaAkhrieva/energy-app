import React from "react";
import { Navigate } from "react-router-dom";

export const AdminRequired = ({ role, children }) => {
  const isRole = localStorage.getItem("role");
  if (isRole !== "admin") {
    return <Navigate to={"/"} />;
  }
  /* return children ? children : <Outlet />; */
  return children;
};
