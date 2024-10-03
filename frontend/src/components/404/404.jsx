import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, Book, GraduationCap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Here you would typically perform a search action
    console.log('Searching for:', searchTerm);
  };

  const suggestions = [
    { icon: Home, text: "Home", link: "/" },
    { icon: Book, text: "Programs", link: "/programs" },
    { icon: GraduationCap, text: "Admissions", link: "/admissions" },
    { icon: Users, text: "About Us", link: "/about" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-900 to-navy-700 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="mb-6"
          >
            <GraduationCap size={80} className="text-light-blue-500" />
          </motion.div>
          <h1 className="text-4xl font-bold text-navy-600 dark:text-light-blue-400 mb-4">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <form onSubmit={handleSearch} className="w-full mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Mt Zion College..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-full border-2 border-light-blue-300 focus:border-light-blue-500 focus:outline-none transition duration-300 dark:bg-gray-700 dark:text-white"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-light-blue-500 text-white rounded-full p-2 hover:bg-light-blue-600 transition duration-300"
              >
                <Search size={20} />
              </motion.button>
            </div>
          </form>
          <div className="grid grid-cols-2 gap-4 w-full">
            {suggestions.map((item, index) => (
              <Link key={index} to={item.link}>
                <motion.div
                  whileHover={{ scale: 1.05, backgroundColor: "#3B82F6" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center space-x-2 bg-navy-500 text-white p-3 rounded-md hover:bg-navy-600 transition duration-300"
                >
                  <item.icon size={18} />
                  <span>{item.text}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;