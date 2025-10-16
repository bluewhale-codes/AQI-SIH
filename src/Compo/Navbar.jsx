import React, { useState } from "react";
import {Link} from "react-router-dom"
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black shadow-md px-4 sm:px-6 py-3 flex justify-between items-center relative">
      {/* Logo */}
      <div className="flex items-center space-x-2 cursor-pointer">
        <img
          src="https://res.cloudinary.com/dycjjaxsk/image/upload/v1760591831/ChatGPT_Image_Oct_16_2025_10_46_25_AM_1_bhc0mk.png"
          alt="Meri Hawa"
          className="h-8 sm:h-10 md:h-12 w-auto"
        />
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
        <Link to="/training" className="hover:text-blue-600 transition">
          Citizen
        </Link>
        <Link to="/dashboard" className="hover:text-blue-600 transition">
          Government Oranization
        </Link>
        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
          Login
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Sign Up
        </button>
        <Link to="/profile" className="flex items-center space-x-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="h-8 w-8 rounded-full border-2 border-blue-600 object-cover"
          />
          <span>Profile</span>
        </Link>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none p-1"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span 
          className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-1.5' : ''
          }`}
        ></span>
        <span 
          className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        ></span>
        <span 
          className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`}
        ></span>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Menu Content */}
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 md:hidden">
            <div className="flex flex-col px-4 py-6 space-y-6">
              
              {/* Profile Section - Top of mobile menu */}
              <Link 
                to="/profile" 
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <img
                  src="https://i.pravatar.cc/40"
                  alt="Profile"
                  className="h-10 w-10 rounded-full border-2 border-blue-600 object-cover"
                />
                <div>
                  <span className="font-semibold text-gray-900"><Link to="/profile">Profile</Link></span>
                  <p className="text-sm text-gray-500">View your account</p>
                </div>
              </Link>
              
              {/* Navigation Links */}
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/training" 
                  className="text-lg font-medium text-gray-700 hover:text-blue-600 transition py-2 border-b border-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/dashboard" 
                  className="text-lg font-medium text-gray-700 hover:text-blue-600 transition py-2 border-b border-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col space-y-3 pt-4">
                <button 
                  className="w-full px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </button>
                <button 
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
