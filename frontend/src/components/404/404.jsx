import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, BookOpen, Phone } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-bold text-navy-900 dark:text-white">404</h1>
          <h2 className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-100">Page Not Found</h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Oops! The page you're looking for doesn't exist.
          </p>
        </motion.div>
        <div className="mt-8 space-y-4">
          <SuggestionLink to="/" icon={<Home />} text="Return Home" />
          <SuggestionLink to="/search" icon={<Search />} text="Search Our Site" />
          <SuggestionLink to="/academics" icon={<BookOpen />} text="Explore Programs" />
          <SuggestionLink to="/contact" icon={<Phone />} text="Contact Us" />
        </div>
      </div>
    </div>
  );
};

const SuggestionLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-light-blue-600 hover:bg-light-blue-700 md:py-3 md:text-lg md:px-6 transition duration-150 ease-in-out"
  >
    {icon}
    <span className="ml-2">{text}</span>
  </Link>
);

export default NotFoundPage;