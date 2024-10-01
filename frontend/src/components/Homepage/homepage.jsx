import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Calendar, Phone, Mail, ArrowRight, Award, Book, Users, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="space-y-24 pt-20">
      <Hero />
      <Announcements />
      <Features />
      <UpcomingEvents />
      <ContactInfo />
    </div>
  );
};

const Hero = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="relative h-screen flex items-center justify-center text-center bg-gradient-to-r from-navy-900 to-navy-700 text-white overflow-hidden"
  >
    <div className="absolute inset-0 bg-opacity-50 bg-navy-900 rounded-lg">
      <motion.img 
        src="/images/mtzion2.jpg" 
        alt="Mt Zion College Students" 
        className="object-cover w-full h-full opacity-30 rounded-lg"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, loop: Infinity, ease: "linear" }}
      />
    </div>
    <div className="relative z-10 max-w-4xl mx-auto px-4">
      <motion.h1 
        className="text-5xl md:text-7xl font-bold mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Welcome to Mt Zion College
      </motion.h1>
      <motion.p 
        className="text-xl md:text-3xl mb-12"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Bringing excellence to children since 2017
      </motion.p>
      <Link to="/apply">
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(255,255,255)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-light-blue-500 hover:bg-light-blue-600 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition duration-300 text-lg"
        >
          Apply Now
          <ChevronRight className="ml-2" size={24} />
        </motion.button>
      </Link>
    </div>
    <motion.div 
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <ChevronDown size={36} className="text-white opacity-75" />
    </motion.div>
  </motion.div>
);

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05, boxShadow: "0px 4px 20px rgba(0,0,0,0.1)" }}
    className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transition duration-300 border border-gray-200 dark:border-gray-700"
  >
    <div className="flex justify-center mb-6">
      <div className="p-3 bg-light-blue-100 dark:bg-light-blue-900 rounded-full">
        {React.cloneElement(icon, { size: 36, className: "text-light-blue-500 dark:text-light-blue-300" })}
      </div>
    </div>
    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 text-center">{description}</p>
  </motion.div>
);

const Announcements = () => (
  <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-10 rounded-xl shadow-xl">
    <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-8 text-center">Important Announcements</h2>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600"
    >
      <h3 className="text-2xl font-semibold text-light-blue-600 dark:text-light-blue-400 mb-4">Grade 1 Registration for 2025</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
        Registration for Grade 1 will be open by the 1st week of November 2024. We also have openings for students in other grades. Feel free to apply!
      </p>
      <motion.a 
        className="inline-flex items-center text-white bg-navy-600 dark:bg-navy-400 rounded-lg px-6 py-3 text-lg font-semibold transition duration-300 hover:bg-navy-700 dark:hover:bg-navy-500" 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }} 
        href="/admissions"
      >
        Learn more <ArrowRight className="ml-2" size={20} />
      </motion.a>
    </motion.div>
  </div>
);

const Features = () => (
  <div>
    <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-12 text-center">Why Choose Mt Zion College?</h2>
    <div className="grid md:grid-cols-3 gap-12">
      <FeatureCard
        icon={<Award />}
        title="Academic Excellence"
        description="We strive for the highest standards of academic achievement in all our programs."
      />
      <FeatureCard
        icon={<Book />}
        title="Comprehensive Curriculum"
        description="Our curriculum is carefully designed to challenge, inspire, and prepare students for future success."
      />
      <FeatureCard
        icon={<Users />}
        title="Supportive Community"
        description="Join a vibrant and inclusive community of learners, educators, and supportive staff."
      />
    </div>
  </div>
);

const UpcomingEvents = () => (
  <div className="bg-gradient-to-r from-navy-900 to-navy-700 p-10 rounded-xl shadow-xl text-white">
    <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h2>
    <div className="grid md:grid-cols-2 gap-8">
      <EventCard
        date="Oct 15, 2024"
        title="Open House"
        description="Join us for a tour of our facilities and meet our faculty."
      />
      <EventCard
        date="Nov 1, 2024"
        title="Grade 1 Registration Begins"
        description="Start your child's educational journey with Mt Zion College."
      />
    </div>
  </div>
);

const EventCard = ({ date, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.03, boxShadow: "0px 4px 20px rgba(0,0,0,0.2)" }}
    className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg backdrop-blur-sm flex items-start transition duration-300"
  >
    <Calendar className="text-light-blue-300 mr-4 flex-shrink-0" size={36} />
    <div>
      <h3 className="text-xl font-semibold text-light-blue-300 mb-2">{title}</h3>
      <p className="text-sm text-gray-300 mb-3">{date}</p>
      <p className="text-gray-100">{description}</p>
    </div>
  </motion.div>
);

const ContactInfo = () => (
  <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-10 rounded-xl shadow-xl">
    <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-8 text-center">Contact Us</h2>
    <div className="flex flex-col space-y-6 items-center">
      <motion.a 
        href="tel:+263785933900" 
        className="flex items-center text-navy-600 dark:text-light-blue-400 text-xl transition duration-300 hover:text-light-blue-600 dark:hover:text-light-blue-300"
        whileHover={{ scale: 1.05 }}
      >
        <Phone className="mr-3" size={24} /> +263-78-593-3900
      </motion.a>
      <motion.a 
        href="mailto:mtzioncollegeofficial@gmail.com" 
        className="flex items-center text-navy-600 dark:text-light-blue-400 text-xl transition duration-300 hover:text-light-blue-600 dark:hover:text-light-blue-300"
        whileHover={{ scale: 1.05 }}
      >
        <Mail className="mr-3" size={24} /> mtzioncollegeofficial@gmail.com
      </motion.a>
    </div>
  </div>
);

export default HomePage;