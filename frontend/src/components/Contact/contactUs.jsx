import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  Clock,
  Check
} from 'lucide-react';

const ContactPage = () => {
  const navigate = useNavigate();
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormStatus('success');
    
    // Reset after showing success message
    setTimeout(() => {
      setFormStatus('idle');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-navy-900 to-navy-800 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-khaki-700">
                  Contact Us
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Get in touch with us
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-[#1A2F4F] rounded-xl p-8 shadow-xl border border-[#F0E68C]/20">
              <h2 className="text-3xl font-bold text-[#0A1D3B] dark:text-[#F0E68C] mb-6">
                How to Reach Us
              </h2>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 10 }}
                >
                  <div className="p-3 bg-[#F0E68C]/10 rounded-lg">
                    <Mail className="w-6 h-6 text-[#F0E68C]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A1D3B] dark:text-[#F0E68C]">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">mtzioncollegeofficial@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 10 }}
                >
                  <div className="p-3 bg-[#F0E68C]/10 rounded-lg">
                    <Phone className="w-6 h-6 text-[#F0E68C]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A1D3B] dark:text-[#F0E68C]">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-300">+263 78 593 3900</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 10 }}
                >
                  <div className="p-3 bg-[#F0E68C]/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-[#F0E68C]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A1D3B] dark:text-[#F0E68C]">Address</h3>
                    <p className="text-gray-600 dark:text-gray-300">1 Sycamore Street<br />Lochinvar, Harare</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 10 }}
                >
                  <div className="p-3 bg-[#F0E68C]/10 rounded-lg">
                    <Clock className="w-6 h-6 text-[#F0E68C]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A1D3B] dark:text-[#F0E68C]">Office Hours</h3>
                    <p className="text-gray-600 dark:text-gray-300">Monday - Friday: 8:00 AM - 5:00 PM<br />Saturday: 9:00 AM - 1:00 PM</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-[#1A2F4F] rounded-xl p-8 shadow-xl border border-[#F0E68C]/20">
              <h2 className="text-3xl font-bold text-[#0A1D3B] dark:text-[#F0E68C] mb-6">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F0E68C] outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F0E68C] outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F0E68C] outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F0E68C] outline-none transition-colors resize-none"
                    required
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={formStatus !== 'idle'}
                  className="w-full px-6 py-3 bg-[#F0E68C] text-[#0A1D3B] rounded-lg hover:bg-[#DFD98B] transition duration-300 flex items-center justify-center font-medium disabled:opacity-50"
                >
                  {formStatus === 'idle' && (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                  {formStatus === 'sending' && (
                    <>
                      <MessageSquare size={18} className="mr-2 animate-bounce" />
                      Sending...
                    </>
                  )}
                  {formStatus === 'success' && (
                    <>
                      <Check size={18} className="mr-2" />
                      Sent Successfully
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;