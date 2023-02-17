import App from "./App.js";
import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import Store from "./store/index.js";
import "./index.css";

const store = new Store();

export const Context = createContext({
  store: store,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      store: store,
    }}
  >
    <App />
  </Context.Provider>
);
