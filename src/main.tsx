import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// 1. Importez le HelmetProvider
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* 2. Enveloppez App avec HelmetProvider */}
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);