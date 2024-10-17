import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-customPink p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-white font-bold">Translator Dashboard</h1>
        <div>
          <Link to="/translator/home" className="text-white mx-4">Home</Link>
          <Link to="/translator/browse" className="text-white mx-4">Browse Orders</Link>
          <Link to="/logout" className="text-white mx-4">Logout</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
