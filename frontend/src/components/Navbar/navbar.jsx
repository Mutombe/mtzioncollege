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
    { to: "/admin", label: "Dashboard" },
  ];

  const GradientHeading = () => {
    return (
      <h1 className="text-xl md:text-3xl font-bold hover:opacity-80 transition-all duration-200 border-2 border-blue-500 rounded-full py-2 px-2">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-blue-500" style={{
          backgroundImage: 'linear-gradient(to right, white 50%, #93C5FD 50%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block'
        }}>
          MT ZION COLLEGE
        </span>
      </h1>
    );
  };
  
  return (
    <nav className={`mt-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-navy-900' : 'bg-navy-900 shadow-none'
    } ${theme === 'default' ? 'dark:bg-gray-700' : 'bg-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex-shrink-0">
            <GradientHeading />
          </NavLink>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out
                  ${isActive 
                    ? 'bg-blue-500 text-white' 
                    : 'hover:bg-navy-800 hover:text-white'
                  }`
                }
              > 
                <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  {item.label}
                </motion.button>
              </NavLink>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-300 hover:text-blue-500 focus:outline-none transition-colors duration-200"
            >
              {theme === 'default' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {token ? (
              <NavLink to="/profile">
                <Avatar
                  sx={{ 
                    bgcolor: blue[500],
                    cursor: 'pointer',
                    '&:hover': { opacity: 0.8 }
                  }}
                  alt={user.username}
                  src={user.picture}
                >
                  {user.username ? user.username[0].toUpperCase() : 'U'}
                </Avatar>
              </NavLink>
            ) : (
                <>
                <LoginButton />
                <SignUpButton />
                </>    
            )}
            {token && <LogoutButton />}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-300 hover:text-blue-500 focus:outline-none transition-colors duration-200 mr-2"
            >
              {theme === 'default' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-navy-700 focus:outline-none transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      <motion.div
        className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-navy-900">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
                ${isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-300 hover:bg-navy-100 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          {token ? (
            <NavLink
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-navy-100 hover:text-white"
            >
              Profile
            </NavLink>
          ) : (
            <LoginButton />
          )}
          {token && <LogoutButton />}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;