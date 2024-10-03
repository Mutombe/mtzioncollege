import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCcw, Home, HelpCircle } from 'lucide-react';

const ErrorPage = ({ error }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="my-16 py-12 bg-gradient-to-b from-navy-900 to-navy-700 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-lg my- mx- bg-white dark:bg-gray-800 rounded-xl shadow-2xl"
        style={{ perspective: '1000px' }}
      >
        <motion.div
          className="w-full h-full"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front of the card */}
          <div className={`absolute ${isFlipped ? 'hidden absolute' : ''} bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 backface-hidden`}>
            <div className="flex flex-col items-center text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <AlertTriangle size={64} className="text-yellow-500 mb-4" />
              </motion.div>
              <h1 className="text-3xl font-bold text-navy-600 dark:text-light-blue-400 mb-4">Oops! Something went wrong</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">We're sorry for the inconvenience. Our team has been notified and is working on a fix.</p>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-light-blue-500 text-white rounded-md hover:bg-light-blue-600 transition duration-300 flex items-center"
                >
                  <RefreshCcw size={18} className="mr-2 text-blue-400" /> Refresh Page
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/'}
                  className="px-4 py-2 bg-navy-500 text-white rounded-md hover:bg-navy-600 transition duration-300 flex items-center"
                >
                  <Home size={18} className="mr-2 text-blue-400" /> Go Home
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={flipCard}
                className="mt-4 text-light-blue-500 hover:text-light-blue-600 transition duration-300 flex items-center"
              >
                <HelpCircle size={18} className="mr-2 text-blue-400" /> More Info
              </motion.button>
            </div>
          </div>

          <div className={`absolute ${!isFlipped ? 'hidden' : ''} bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 backface-hidden`} style={{ transform: 'rotateY(180deg)' }}>
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold text-navy-600 dark:text-light-blue-400 mb-4">Error Details</h2>
              <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md text-sm text-gray-800 dark:text-blue-400 mb-4 overflow-auto max-h-40">
              {error ? JSON.stringify(error, null, 2) : "No error details available"}
              </pre>
              <p className="text-gray-600 dark:text-gray-300 mb-6 ">If the problem persists, please contact our support team.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={flipCard}
                className="px-4 py-2 bg-navy-500 text-blue-400 rounded-md hover:bg-navy-600 transition duration-300 "
              >
                Back to Error Message
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;