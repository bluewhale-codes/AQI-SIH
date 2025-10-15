import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { AiOutlineCloud } from 'react-icons/ai';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
            <AiOutlineCloud className="text-white text-3xl" />
            <span className="text-white text-2xl font-bold">Meri Hawa</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/home" 
              className="text-white hover:bg-blue-600 px-3 py-2 rounded-md transition duration-300"
            >
              Home
            </Link>

            {/* Dashboard Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-white hover:bg-blue-600 px-3 py-2 rounded-md flex items-center space-x-1 transition duration-300"
              >
                <span>Dashboard</span>
                <FiChevronDown className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {dropdownOpen && (
                <div className="absolute top-full mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden">
                  <Link
                    to="/dashboard/citizen"
                    className="block px-4 py-3 text-gray-800 hover:bg-blue-100 transition duration-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Citizen Dashboard
                  </Link>
                  <Link
                    to="/dashboard/policy-maker"
                    className="block px-4 py-3 text-gray-800 hover:bg-blue-100 transition duration-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Policy Maker Dashboard
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-600">
          <Link
            to="/home"
            className="block text-white hover:bg-blue-500 px-3 py-2 rounded-md"
            onClick={toggleMenu}
          >
            Home
          </Link>
          
          <div>
            <button
              onClick={toggleDropdown}
              className="w-full text-left text-white hover:bg-blue-500 px-3 py-2 rounded-md flex items-center justify-between"
            >
              <span>Dashboard</span>
              <FiChevronDown className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {dropdownOpen && (
              <div className="ml-4 mt-1 space-y-1">
                <Link
                  to="/dashboard/citizen"
                  className="block text-white hover:bg-blue-500 px-3 py-2 rounded-md"
                  onClick={toggleMenu}
                >
                  Citizen Dashboard
                </Link>
                <Link
                  to="/dashboard/policy-maker"
                  className="block text-white hover:bg-blue-500 px-3 py-2 rounded-md"
                  onClick={toggleMenu}
                >
                  Policy Maker Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
