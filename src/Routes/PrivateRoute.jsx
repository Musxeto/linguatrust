import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children, requiredRole }) => {
  const { currentUser, userData } = useAuth() || {};

  if (currentUser) {
    if (userData && userData.role) {
      if (!requiredRole || (Array.isArray(requiredRole) && requiredRole.length === 0)) {
        return children; 
      }
      if (Array.isArray(requiredRole)) {
        if (requiredRole.includes(userData.role)) {
          return children; 
        }
      } else if (userData.role === requiredRole) {
        return children; 
      }
      return <Navigate to="/login" />;
    } else {
      return <Navigate to="/login" />; 
    }
  } else {
    return <Navigate to="/login" />; 
  }
};

export default PrivateRoute;
