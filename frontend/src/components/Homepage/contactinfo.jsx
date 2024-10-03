import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';

const ContactInfo = () => (
  <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-10 rounded-xl shadow-xl">
    <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-8 text-center">Contact Us</h2>
    <div className="flex flex-col space-y-6 items-center">
      <motion.a 
        href="tel:+263785933900" 
        className="flex items-center text-navy-600 dark:text-light-blue-400 text-xl transition duration-300 hover:text-light-blue-600 dark:hover:text-light-blue-300"
        whileHover={{ scale: 1.05 }}
        aria-label="Call us at +263-78-593-3900"
      >
        <Phone className="mr-3" size={24} /> +263-78-593-3900
      </motion.a>
      <motion.a 
        href="mailto:mtzioncollegeofficial@gmail.com" 
        className="flex items-center text-navy-600 dark:text-light-blue-400 text-xl transition duration-300 hover:text-light-blue-600 dark:hover:text-light-blue-300"
        whileHover={{ scale: 1.05 }}
        aria-label="Email us at mtzioncollegeofficial@gmail.com"
      >
        <Mail className="mr-3" size={24} /> mtzioncollegeofficial@gmail.com
      </motion.a>
    </div>
  </div>
);

export default ContactInfo;