import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-lg">E-Commerce</Link>
      <input
        type="text"
        placeholder="Search..."
        className="p-2 rounded-md"
      />
      <Link to="/cart" className="text-white">
        Cart
      </Link>
    </nav>
  );
};

export default Navbar;
