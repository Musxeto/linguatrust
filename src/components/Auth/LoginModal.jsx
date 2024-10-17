// src/components/Auth/LoginPage.jsx
import React, { useState } from "react";
import { auth } from "../../firebase"; 
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back!");
      navigate("/")
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-semibold mb-4">Welcome Back</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-4 p-2 border rounded w-full"
        />
        <button type="submit" className="w-full bg-pink-500 text-white p-2 rounded">
          Sign In
        </button>
        <p className="mt-4">
          Don't have an account? <a href="/signup" className="text-pink-500">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
