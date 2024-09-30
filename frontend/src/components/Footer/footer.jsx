import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h3>
            <p className="text-gray-600 dark:text-gray-300">123 College St, City, State 12345</p>
            <p className="text-gray-600 dark:text-gray-300">Phone: +263-78-593-3900</p>
            <p className="text-gray-600 dark:text-gray-300">Email: mtzioncollegeofficial@gmail.com</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-light-blue-600 dark:text-light-blue-400 hover:underline">About Us</a></li>
              <li><a href="#" className="text-light-blue-600 dark:text-light-blue-400 hover:underline">Academic Programs</a></li>
              <li><a href="#" className="text-light-blue-600 dark:text-light-blue-400 hover:underline">Admissions</a></li>
              <li><a href="#" className="text-light-blue-600 dark:text-light-blue-400 hover:underline">Student Life</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-light-blue-600 dark:hover:text-light-blue-400">
                <Facebook />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-light-blue-600 dark:hover:text-light-blue-400">
                <Twitter />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-light-blue-600 dark:hover:text-light-blue-400">
                <Instagram />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">&copy; 2024 Mt Zion College. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;