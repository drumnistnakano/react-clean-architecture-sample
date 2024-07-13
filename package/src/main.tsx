import React from "react";
import App from "./App.tsx";
import "./index.css";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
