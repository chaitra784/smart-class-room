import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");

  // ❌ NOT logged in → go to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✔ logged in → allow access
  return children;
}

export default ProtectedRoute;