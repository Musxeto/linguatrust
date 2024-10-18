import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpTabs from "../components/Auth/SignUpTabs"; 
import LoginPage from "../components/Auth/LoginModal"; 
import PrivateRoute from "./PrivateRoute";
import ClientHome from "../components/Client/ClientHome"; 
import TranslatorHome from "../components/Translator/TranslatorHome"; 
import HomeRoute from "./HomeRoute";
import UploadDocument from "../components/Client/UploadDocument";
import BrowseOrders from "../components/Translator/BrowseOrders";
import TranslatorChat from "../components/Translator/TranslatorChat";
import ClientChat from "../components/Client/ClientChat";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/home" element={<HomeRoute />} />
        <Route
          path="/client-home"
          element={
            <PrivateRoute requiredRole={"client"}>
              <ClientHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute requiredRole={"client"}>
              <UploadDocument />
            </PrivateRoute>
          }
        />
        <Route
          path="/translator/home"
          element={
            <PrivateRoute requiredRole={"translator"}>
              <TranslatorHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/translator/browse"
          element={
            <PrivateRoute requiredRole={"translator"}>
              <BrowseOrders />
            </PrivateRoute>
          }
        />
        <Route
          path="/client/order/:id/chat"
          element={
            <PrivateRoute requiredRole={"client"}>
              <ClientChat />
            </PrivateRoute>
          }
        />
        <Route
          path="/translator/order/:id/chat"
          element={
            <PrivateRoute requiredRole={"translator"}>
              <TranslatorChat />
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
