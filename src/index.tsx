import React from "react";
import ReactDOM from "react-dom/client";
import Providers from "./Providers";
import Router from "./Router";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Providers>
      <Router />
    </Providers>
  </React.StrictMode>,
);

// eslint-disable-next-line
// reportWebVitals(console.log);
