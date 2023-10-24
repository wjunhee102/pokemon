import React from "react";
import ReactDOM from "react-dom/client";
import Providers from "./Providers";
import Router from "./Router";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Providers>
      <Router />
    </Providers>
  </React.StrictMode>,
);
