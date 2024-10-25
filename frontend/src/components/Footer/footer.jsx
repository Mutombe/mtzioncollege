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
    { icon: <Book size={16} />, text: "About Us", link: "/about-us" },
    { icon: <UserPlus size={16} />, text: "Admissions", link: "/branches" },
    { icon: <Users size={16} />, text: "Student Life", link: "/student-life" },
    { icon: <Calendar size={16} />, text: "Events", link: "/gallery" }
  ];

  const socialLinks = [
    { icon: <Facebook size={24} />, link: "https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F" },
    { icon: <Twitter size={24} />, link: "https://twitter.com" },
    { icon: <Instagram size={24} />, link: "https://www.instagram.com" },
    { icon: <Linkedin size={24} />, link: "https://www.linkedin.com" }
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
    <footer className=" text-white lg:px-8 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold mb-4 text-[#F0E68C]">Quick Links</h3>
            {quickLinks.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link 
                  to={item.link} 
                  className="flex items-center space-x-2 text-white hover:text-[#F0E68C] transition-colors duration-300"
                >
                  <span className="text-[#F0E68C]">{item.icon}</span>
                  <span className="text-sm">{item.text}</span>
                  <ExternalLink size={12} className="text-[#F0E68C]" />
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
            <h3 className="text-xl font-semibold mb-4 text-[#F0E68C]">Connect With Us</h3>
            <motion.div 
              variants={itemVariants} 
              className="flex space-x-6 justify-center"
            >
              {socialLinks.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#F0E68C] transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {item.icon}
                </motion.a>
              ))}
            </motion.div>
            <motion.p variants={itemVariants} className="text-sm text-[#F0E68C] mt-4 text-center">
              Follow us on social media for the latest updates and events!
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold mb-4 text-[#F0E68C]">Contact Us</h3>
            {contactInfo.map((item, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="flex items-center space-x-3 text-white hover:text-[#F0E68C] transition-colors duration-300"
              >
                <div className="bg-[#F0E68C] text-[#000080] p-2 rounded-full">
                  {item.icon}
                </div>
                <p className="text-sm">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="mt-8 border-t border-[#F0E68C] pt-8 text-center">
          <p className="text-sm text-[#F0E68C]">© 2024 Mt Zion College. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;