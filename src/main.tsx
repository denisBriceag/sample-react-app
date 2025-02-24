import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app.tsx";
import { StrictMode } from "react";
import "./i18n.config.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
