import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (currentUser !== null && currentUser !== undefined) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default LoginRoute;