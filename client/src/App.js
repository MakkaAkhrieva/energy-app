import React, { useEffect, useContext } from "react";
import { RouteRenderer } from "./core/routes/route-renderer.js";
import { BrowserRouter as Router } from "react-router-dom";
import { Context } from "./index.js";

function App() {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);
  return (
    <>
      <Router>
        <RouteRenderer />
      </Router>
    </>
  );
}

export default App;
