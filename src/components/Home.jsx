import React from 'react';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
const Home = () => {
    const currentUser = useAuth();
    console.log(currentUser)
  const handleLogout = async () => {
    try {
      await auth.signOut(); 
      toast.success("Logged out successfully!"); 
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-400 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
