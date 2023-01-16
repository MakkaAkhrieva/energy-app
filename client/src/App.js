import React from "react";
import { RouteRenderer } from "./core/routes/route-renderer.js";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <RouteRenderer />
      </Router>
    </>
  );
}

export default App;
