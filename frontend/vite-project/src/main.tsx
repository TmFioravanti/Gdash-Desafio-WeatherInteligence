import React, { type JSX } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import { LoginPage } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
