import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ClientRoute = ({ children }) => {
  const { userData } = useAuth() || {};

  if (userData.role==="client") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ClientRoute;
