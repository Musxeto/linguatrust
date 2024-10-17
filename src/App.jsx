import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllRoutes from "./Routes/AllRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import './App.css'
function App() {
  return (
    <AuthProvider>
      <div>
        <ToastContainer />
        <AllRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
