import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../themeContext';
import LoginButton from '../Authentication/Login/loginButton';
import LogoutButton from '../Authentication/Logout/logoutButton';
import SignUpButton from '../Authentication/Signup/signup';
import Avatar from '@mui/material/Avatar';
import { blue, deepOrange } from '@mui/material/colors';
import { useSelector } from 'react-redux';
 
 const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/branches", label: "Our Branches" },
    { to: "/student-life", label: "Student Life" },
    { to: "/gallery", label: "Events" },
    { to: "/about-us", label: "About Us" },
    { to: "/contact", label: "Contact" }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${scrolled ? 'bg-navy-900 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-khaki-300">MT ZION</h1>
          </NavLink>
          
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out
                  ${isActive 
                    ? 'bg-navy-700 text-khaki-300' 
                    : 'text-gray-300 hover:bg-navy-800 hover:text-khaki-200'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-khaki-300 hover:text-khaki-200"
            >
              {theme === 'default' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-khaki-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-navy-900">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium
                ${isActive
                  ? 'bg-navy-700 text-khaki-300'
                  : 'text-gray-300 hover:bg-navy-800 hover:text-khaki-200'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;