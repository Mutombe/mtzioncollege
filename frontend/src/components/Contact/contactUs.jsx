import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Calendar } from 'lucide-react';

const Alert = ({ title, description, className }) => (
  <div className={`p-4 rounded-md ${className}`}>
    <h4 className="font-semibold mb-2">{title}</h4>
    <p>{description}</p>
  </div>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-900 to-navy-700 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full"
      >
        <div className="flex flex-col md:flex-row">
          <div className="bg-blue-500 text-white p-8 md:w-2/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-blue-600 rounded-l-full opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">MT ZION COLLEGE</h2>
              <h3 className="text-xl font-semibold mb-4">Grade 1 Registration for 2025</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="mr-3" />
                  <span>Opens: 1st Week of November</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-3" />
                  <span>+263-78-593-3900</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-3" />
                  <span>mtzioncollegeofficial@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-3" />
                  <span>Harare, Zimbabwe</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 md:w-3/5">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Contact Us</h3>
            {isSubmitted ? (
              <Alert 
                title="Success!"
                description="Your message has been sent. We'll get back to you soon."
                className="bg-green-100 border border-green-500 text-green-700"
              />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Message <Send className="ml-2" size={18} />
                </motion.button>
              </form>
            )}
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              We also have openings for students in other grades. Feel free to apply!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;