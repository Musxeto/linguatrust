import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children, requiredRole }) => {
  const { currentUser, userData } = useAuth() || {};

  // Check if the user is authenticated
  if (currentUser) {
    // Check if userData and role exist
    if (userData && userData.role) {
      // If requiredRole is null or an empty array, allow access
      if (!requiredRole || (Array.isArray(requiredRole) && requiredRole.length === 0)) {
        return children; // No specific role requirement, render the child component
      }

      // Check if the user's role matches any of the required roles
      if (Array.isArray(requiredRole)) {
        if (requiredRole.includes(userData.role)) {
          return children; // User has an allowed role, render the child component
        }
      } else if (userData.role === requiredRole) {
        return children; // User's role matches the single required role
      }

      // Redirect if the role does not match
      return <Navigate to="/login" />;
    } else {
      return <Navigate to="/login" />; // Redirect if userData or role is not available
    }
  } else {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }
};

export default PrivateRoute;
