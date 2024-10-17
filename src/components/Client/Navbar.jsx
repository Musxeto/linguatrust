// Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link if you're using React Router
import { FaUserCircle } from "react-icons/fa"; // Import the user icon
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 mb-5 bg-customPink text-white">
      <h1 className="text-lg">ComsaTranslator</h1>
      <div className="hidden md:flex items-center"> {/* Show on medium screens and up */}
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="focus:outline-none"
        >
          <FaUserCircle className="h-8 w-8" />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white text-black p-2 rounded shadow-lg">
            <button onClick={onLogout} className="w-full text-left">
              Logout
            </button>
          </div>
        )}
      </div>
      <button 
        className="md:hidden focus:outline-none" // Show only on small screens
        onClick={() => setMobileMenuOpen((prev) => !prev)}
      >
        <FaUserCircle className="h-8 w-8" />
      </button>
      {mobileMenuOpen && (
        <div className="absolute top-16 right-4 bg-white text-black p-2 rounded shadow-lg md:hidden">
          <button onClick={onLogout} className="w-full text-left">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
