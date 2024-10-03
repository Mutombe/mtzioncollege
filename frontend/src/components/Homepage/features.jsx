import React from 'react';
import { motion } from 'framer-motion';
import { Award, Book, Users } from 'lucide-react';

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

export default Features;