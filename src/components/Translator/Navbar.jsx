import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Import icons for menu and close

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    <nav className="bg-customPink p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white font-bold">Translator Dashboard</h1>
        
        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-white focus:outline-none">
            <AiOutlineMenu size={24} /> {/* Hamburger icon */}
          </button>
        </div>

        {/* Links for Desktop */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <Link to="/translator/home" className="text-white">
            Home
          </Link>
          <Link to="/translator/browse" className="text-white">
            Browse Orders
          </Link>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="focus:outline-none"
            >
              <FaUserCircle className="h-8 w-8 text-white" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black p-2 rounded shadow-lg">
                <button onClick={onLogout} className="w-full text-left">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar for Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setSidebarOpen(false)} />
      )}
      <div className={`fixed top-0 left-0 h-full w-64 bg-customPink z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
        <div className="flex justify-between items-center p-4">
          <h2 className="text-white">Menu</h2>
          <button onClick={() => setSidebarOpen(false)} className="text-white">
            <AiOutlineClose size={24} /> {/* Close icon */}
          </button>
        </div>
        <div className="flex flex-col p-4">
          <Link to="/translator/home" className="text-white py-2" onClick={() => setSidebarOpen(false)}>
            Home
          </Link>
          <Link to="/translator/browse" className="text-white py-2" onClick={() => setSidebarOpen(false)}>
            Browse Orders
          </Link>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center text-white py-2 focus:outline-none"
            >
              <FaUserCircle className="h-8 w-8" />
              <span className="ml-2">Profile</span>
            </button>
            {dropdownOpen && (
              <div className="bg-white text-black p-2 rounded shadow-lg">
                <button onClick={onLogout} className="w-full text-left">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
