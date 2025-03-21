import { createRoot } from "react-dom/client";
import "./style/index.css";
import { RouterProvider } from "react-router-dom";
import React from "react";
import { router } from "./routes/routes";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
