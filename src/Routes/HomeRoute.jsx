import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const HomeRoute = () => {
  const { currentUser, userData } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  if(userData.role === "client"){
    return <Navigate to="/client-home" />
  }
  if (userData.role==="translator") {
    return <Navigate to="/translator/home" />;
  }
  return <Navigate to="/login" />
};

export default HomeRoute;