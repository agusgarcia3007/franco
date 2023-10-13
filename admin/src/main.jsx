import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { EmployeeProvider } from "./context/Employees.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EmployeeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EmployeeProvider>
  </React.StrictMode>
);
