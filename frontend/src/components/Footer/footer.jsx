import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ExternalLink, Book, UserPlus, Users, Calendar, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const FooterSection = () => {
  const contactInfo = [
    { icon: <MapPin size={20} />, text: "1 Sycamore Avenue, Lochinvar Harare" },
    { icon: <Phone size={20} />, text: "+263-78-593-3900" },
    { icon: <Mail size={20} />, text: "mtzioncollegeofficial@gmail.com" }
  ];

  const quickLinks = [
    { icon: <Book size={16} />, text: "About Us", link: "/about" },
    { icon: <UserPlus size={16} />, text: "Admissions", link: "/admissions" },
    { icon: <Users size={16} />, text: "Student Life", link: "/student-life" },
    { icon: <Calendar size={16} />, text: "Events", link: "/events" }
  ];

  const socialLinks = [
    { icon: <Facebook size={24} />, link: "https://facebook.com" },
    { icon: <Twitter size={24} />, link: "https://twitter.com" },
    { icon: <Instagram size={24} />, link: "https://instagram.com" },
    { icon: <Linkedin size={24} />, link: "https://linkedin.com" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <footer className="my-52 py-40 text-white lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Quick Links</h3>
            {quickLinks.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link 
                  to={item.link} 
                  className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors duration-300 justify-center"
                >
                  {item.icon}
                  <span className="text-sm">{item.text}</span>
                  <ExternalLink size={12} className="ml-1" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Connect With Us</h3>
            <motion.div 
              variants={itemVariants} 
              className="flex space-x-4 justify-center"
            >
              {socialLinks.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {item.icon}
                </motion.a>
              ))}
            </motion.div>
            <motion.p variants={itemVariants} className="text-sm text-gray-400 mt-4">
              Follow us on social media for the latest updates and events!
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Contact Us</h3>
            {contactInfo.map((item, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors duration-300justify-center"
              >
                <div className="bg-blue-900 p-2 rounded-full justify-center">{item.icon}</div>
                <p className="text-sm">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">© 2023 Mt Zion College. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;