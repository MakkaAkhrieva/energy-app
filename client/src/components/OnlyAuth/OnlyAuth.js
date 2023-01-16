import React from "react";
import { Outlet } from "react-router";

export const OnlyAuth = () => {
  return (
    <>
      <h1 style={{ color: "black" }}> Only auth </h1>;
      <Outlet />
    </>
  );
};
