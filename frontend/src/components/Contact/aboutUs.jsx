import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Users,
  ChevronRight,
  GraduationCap,
  Globe,
  Award,
  ArrowLeft,
  Clock,
  Building
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <header className="bg-gradient-to-r from-navy-900 to-navy-800 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => window.history.back()}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-khaki-700">
                  About Us
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Mt Zion College
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Mission />
        <Stats />
        <Values />
        <Leadership />
      </div>
    </div>
  );
};

const Mission = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-[#1A2F4F] rounded-xl shadow-xl overflow-hidden border border-[#F0E68C]/20 p-8 mb-8"
  >
    <motion.div 
      className="flex justify-center mb-6"
      whileHover={{ scale: 1.1, rotate: 5 }}
    >
      <GraduationCap size={56} className="text-[#F0E68C]" />
    </motion.div>
    
    <h2 className="text-3xl font-bold text-[#0A1D3B] dark:text-[#F0E68C] mb-4 text-center">
      Our Mission
    </h2>
    
    <hr className="border-[#F0E68C]/30 mb-6" />
    
    <p className="text-gray-700 dark:text-gray-300 text-lg text-center leading-relaxed">
      At Mt Zion College, our mission is to provide a world-class education that empowers students 
      to become innovative thinkers, compassionate leaders, and responsible global citizens.
    </p>
  </motion.div>
);

const Stats = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
  >
    {[
      { icon: <Users size={32} />, value: "1000+", label: "Students" },
      { icon: <BookOpen size={32} />, value: "50+", label: "Programs" },
      { icon: <Clock size={32} />, value: "13", label: "Years of Excellence" },
    ].map((stat, index) => (
      <motion.div
        key={index}
        className="bg-white dark:bg-[#1A2F4F] rounded-xl shadow-lg p-6 border border-[#F0E68C]/20"
        whileHover={{ y: -5 }}
      >
        <div className="flex items-center justify-center mb-4">
          <div className="text-[#F0E68C]">{stat.icon}</div>
        </div>
        <h3 className="text-2xl font-bold text-[#0A1D3B] dark:text-[#F0E68C] text-center">
          {stat.value}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center">
          {stat.label}
        </p>
      </motion.div>
    ))}
  </motion.div>
);

const Values = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-[#1A2F4F] rounded-xl shadow-xl overflow-hidden border border-[#F0E68C]/20 p-8 mb-8"
  >
    <h2 className="text-3xl font-bold text-[#0A1D3B] dark:text-[#F0E68C] mb-6 text-center">
      Our Core Values
    </h2>
    
    <div className="grid md:grid-cols-3 gap-6">
      {[
        { icon: <Award />, title: "Excellence", description: "Striving for the highest standards in education" },
        { icon: <Globe />, title: "Global Perspective", description: "Preparing students for an interconnected world" },
        { icon: <Users />, title: "Community", description: "Fostering an inclusive learning environment" },
      ].map((value, index) => (
        <motion.div
          key={index}
          className="p-6 bg-[#F0E68C]/10 dark:bg-[#F0E68C]/5 rounded-lg"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex justify-center mb-4 text-[#F0E68C]">
            {React.cloneElement(value.icon, { size: 32 })}
          </div>
          <h3 className="text-xl font-bold text-[#0A1D3B] dark:text-[#F0E68C] text-center mb-2">
            {value.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            {value.description}
          </p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const Leadership = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-[#1A2F4F] rounded-xl shadow-xl overflow-hidden border border-[#F0E68C]/20 p-8"
  >
    <h2 className="text-3xl font-bold text-[#0A1D3B] dark:text-[#F0E68C] mb-6 text-center">
      Our Leadership
    </h2>
    
    <div className="grid md:grid-cols-3 gap-6">
      {[
        { name: "Dr. Tindo Moyo", title: "Head-Master", image: "images/teacher.png" },
        { name: "Mr. John Tendai", title: "Deputy Head", image: "images/teacher.png" },
        { name: "Mr Majoni", title: "Head of Academics", image: "images/t2.jpg" },
      ].map((leader, index) => (
        <motion.div
          key={index}
          className="bg-[#F0E68C]/10 dark:bg-[#F0E68C]/5 rounded-lg overflow-hidden"
          whileHover={{ y: -5 }}
        >
          <img 
            src={leader.image} 
            alt={leader.name} 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold text-[#0A1D3B] dark:text-[#F0E68C] mb-1">
              {leader.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {leader.title}
            </p>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="mt-8 text-center">
      <Link to="/contact">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-6 py-3 bg-[#F0E68C] text-[#0A1D3B] rounded-lg hover:bg-[#DFD98B] transition duration-300 font-medium"
        >
          Schedule a Visit <ChevronRight className="ml-2" size={20} />
        </motion.button>
      </Link>
    </div>
  </motion.div>
);

export default AboutUsPage;