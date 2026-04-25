import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {

  const isLoggedIn = localStorage.getItem("user"); // simple check

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;