import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

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

export default UpcomingEvents;