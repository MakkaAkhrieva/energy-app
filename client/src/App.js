import React from "react";
import Home from "./pages/Home/Home.js";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login.js";
import Registration from "./pages/Registration/Registration.js";
import Page404 from "./pages/404.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
