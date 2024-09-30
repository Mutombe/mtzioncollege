import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Calendar, Phone, Mail, ArrowRight, Award, Book, Users } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="space-y-16 pt-16">
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
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative text-center py-20 px-4 bg-gradient-to-r from-navy-900 to-navy-700 text-black rounded-lg overflow-hidden"
  >
    <div className="absolute inset-0 bg-opacity-50 bg-navy-900">
      <img src="images/mtzion.png" alt="Mt Zion College Students" className="object-cover w-full h-full opacity-30" />
    </div>
    <div className="relative z-10">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Mt Zion College</h1>
      <p className="text-xl md:text-2xl mb-8">Bringing excellence to children since 2017</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-light-blue-500 hover:bg-light-blue-600 text-white font-bold py-3 px-6 rounded-full inline-flex items-center"
      >
        Apply Now
        <ChevronRight className="ml-2" />
      </motion.button>
    </div>
  </motion.div>
);

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  >
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
);

const Announcements = () => (
  <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-4">Important Announcements</h2>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow"
    >
      <h3 className="text-xl font-semibold text-light-blue-600 dark:text-light-blue-400">Grade 1 Registration for 2025</h3>
      <p className="text-gray-700 dark:text-gray-300 mt-2">
        Registration for Grade 1 will be open by the 1st week of November 2024. We also have openings for students in other grades. Feel free to apply!
      </p>
      <a href="#" className="inline-flex items-center mt-3 text-navy-600 dark:text-navy-400 hover:underline">
        Learn more <ArrowRight className="ml-1" size={16} />
      </a>
    </motion.div>
  </div>
);

const Features = () => (
  <div className="grid md:grid-cols-3 gap-8">
    <FeatureCard
      icon={<Award className="w-12 h-12 text-light-blue-500" />}
      title="Excellence"
      description="We strive for academic excellence in all our programs."
    />
    <FeatureCard
      icon={<Book className="w-12 h-12 text-light-blue-500" />}
      title="Comprehensive Curriculum"
      description="Our curriculum is designed to challenge and inspire students."
    />
    <FeatureCard
      icon={<Users className="w-12 h-12 text-light-blue-500" />}
      title="Supportive Community"
      description="Join a vibrant community of learners and educators."
    />
  </div>
);

const UpcomingEvents = () => (
  <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-4">Upcoming Events</h2>
    <div className="space-y-4">
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
    whileHover={{ scale: 1.02 }}
    className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow flex items-start"
  >
    <Calendar className="text-light-blue-500 mr-4 flex-shrink-0" />
    <div>
      <h3 className="text-lg font-semibold text-navy-900 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{date}</p>
      <p className="mt-2 text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  </motion.div>
);

const ContactInfo = () => (
  <div className="bg-navy-900 text-black p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
    <div className="flex flex-col space-y-3">
      <a href="tel:+263785933900" className="flex items-center hover:text-light-blue-400">
        <Phone className="mr-2" /> +263-78-593-3900
      </a>
      <a href="mailto:mtzioncollegeofficial@gmail.com" className="flex items-center hover:text-light-blue-400">
        <Mail className="mr-2" /> mtzioncollegeofficial@gmail.com
      </a>
    </div>
  </div>
);

export default HomePage;