import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ToastContainer />
    <App />
  </React.StrictMode>
);
