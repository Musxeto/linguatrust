import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home"; // Client homepage
import SignUpTabs from "../components/Auth/SignUpTabs"; // Sign-up component
import LoginPage from "../components/Auth/LoginModal"; // Login component
import PrivateRoute from "./PrivateRoute"; // Route protection
import ClientHome from "../components/ClientHome"; // Client home page with records
import TranslatorHome from "../components/TranslatorHome"; // Translator orders page
import OrderFormModal from "../components/OrderFormModal"; // Modal for new order

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/client-home"
          element={
            <PrivateRoute>
              <ClientHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/translator-home"
          element={
            <PrivateRoute>
              <TranslatorHome />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpTabs />} />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
