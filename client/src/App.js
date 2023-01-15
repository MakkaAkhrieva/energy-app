import React, { useContext, useEffect } from "react";
import Home from "./pages/Home/Home.js";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login.js";
import Registration from "./pages/Registration/Registration.js";
import Page404 from "./pages/404.js";
import { AdminDashboard } from "./components/AdminDashboard/AdminDashboard.js";
import { OnlyAuth } from "./components/OnlyAuth/OnlyAuth.js";
import { AuthRequired } from "./hoc/AuthRequired.js";
import { AdminRequired } from "./hoc/AdminRequired.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        <Route element={<AuthRequired />}>
          <Route path="/user" element={<OnlyAuth />} />
          <Route path="/page" element={<Page404 />} />
        </Route>
        <Route
          path="/admin"
          element={
            <AdminRequired>
              <AdminDashboard />
            </AdminRequired>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
