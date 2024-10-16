import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const HomeRoute = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  if(currentUser.role === "client"){
    return <Navigate to="/home" />
  }
  if (currentUser.role==="translator") {
    return <Navigate to="/dashboard" />;
  }
  return <Navigate to="/home" />
};

export default HomeRoute;