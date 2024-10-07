import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Calendar, Phone, Mail, Award, Book, Users, ChevronDown, GraduationCap, Globe, Star, Zap, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 min-h-screen text-white overflow-hidden">
      <Hero scrollY={scrollY} opacity={opacity} />
      <Announcements />
      <Features scrollY={scrollY} />
      <Testimonials />
      <UpcomingEvents />
      <ContactInfo />
    </div>
  );
};

const Hero = ({ scrollY, opacity }) => {
  const yPosAnim = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="relative h-50 flex items-center justify-center overflow-hidden rounded-b-3xl bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 my-12">
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ opacity }}
      >
        <AbstractBackground />
      </motion.div>
      
      <motion.div 
        className="relative z-10 text-center"
        style={{ y: yPosAnim }}
      >
        <motion.h1 
          className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200"
        >
          MT ZION COLLEGE
        </motion.h1>
        <motion.p 
          className="text-2xl md:text-4xl mb-12 text-blue-300"
        >
          Bringing Exellence To Children
        </motion.p>
        <Link to="/apply">
          <motion.button
            whileHover={{ scale: 1.2, boxShadow: "0px 0px 15px rgba(144, 202, 249, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition duration-300 text-lg box-shadow hover:shadow-lg mb-12"
          >
            Begin Your Journey
            <ChevronRight className="ml-2" size={24} />
          </motion.button>
        </Link>
      </motion.div>
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ opacity }}
      >

      </motion.div>
    </div>
  );
};

const AbstractBackground = () => {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="bg-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#1e40af" />
        </radialGradient>
        <clipPath id="circle-clip">
          <circle cx="50" cy="50" r="45" />
        </clipPath>
      </defs>
      
      <rect x="0" y="0" width="100" height="100" fill="url(#bg-gradient)" />
      

      <g clipPath="url(#circle-clip)">
        <motion.path
          d="M20,50 Q50,20 80,50 T20,50"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.path
          d="M30,70 Q50,40 70,70 T30,70"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke="#2563eb"
          strokeWidth="0.5"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      </g>
      

      {[...Array(20)].map((_, i) => (
        <motion.circle
          key={i}
          cx={Math.random() * 100}
          cy={Math.random() * 100}
          r={Math.random() * 0.5 + 0.1}
          fill="#bfdbfe"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}
    </svg>
  );
};

const Announcements = () => (
  <div className="py-20 px-4 md:px-0">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center text-blue-300">LATEST NEWS</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-10 p-8 rounded-3xl shadow-2xl backdrop-blur-lg"
      >
        <h3 className="text-3xl font-semibold text-blue-400 mb-4">Grade 1 Registration Open for 2025</h3>
        <p className="text-xl text-gray-300 mb-6">
          Secure your child's future at Mt Zion College. Limited spots available for our  Grade 1 Enrollment.
        </p>
        <motion.a 
          className="inline-flex items-center text-navy-900 bg-blue-400 rounded-full px-8 py-3 text-lg font-semibold transition duration-300 hover:bg-blue-300" 
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(144, 202, 249, 0.5)" }} 
          whileTap={{ scale: 0.95 }} 
          style={{ cursor: "pointer" }}
          href="/branches"
        >
          Learn more <ChevronRight className="ml-2" size={20} />
        </motion.a>
      </motion.div>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.05, boxShadow: "0px 4px 20px rgba(144, 202, 249, 0.2)" }}
    className="bg-navy-800 p-8 rounded-2xl shadow-lg transition duration-300 border border-blue-800"
  >
    <div className="flex justify-center mb-6">
      <div className="p-3 bg-blue-500 bg-opacity-20 rounded-full">
        {React.cloneElement(icon, { size: 36, className: "text-blue-400" })}
      </div>
    </div>
    <h3 className="text-2xl font-semibold text-light-blue-300 mb-4 text-center">{title}</h3>
    <p className="text-gray-300 text-center">{description}</p>
  </motion.div>
);

const Features = ({ scrollY }) => (
  <div className="py-20 px-4 md:px-0 relative">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-16 text-center text-blue-300">WHY CHOOSE MT ZION ?</h2>
      <div className="grid md:grid-cols-3 gap-12">
        <FeatureCard
          icon={<GraduationCap />}
          title="Academic Excellence"
          description="Our rigorous curriculum and dedicated faculty ensure top-tier education."
          delay={0.2}
        />
        <FeatureCard
          icon={<Globe />}
          title="Global Perspective"
          description="Prepare for a interconnected world with our international programs."
          delay={0.4}
        />
        <FeatureCard
          icon={<Heart />}
          title="Nurturing Environment"
          description="We foster personal growth in a supportive and inclusive community."
          delay={0.6}
        />
      </div>
    </div>
    <motion.div 
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        background: `radial-gradient(circle at 50% ${50 + scrollY * 0.1}%, rgba(144, 202, 249, 0.1) 0%, rgba(144, 202, 249, 0) 60%)`,
      }}
    />
  </div>
);

const Testimonials = () => {
  const testimonials = [
    { id: 1, text: "Mt Zion College transformed my child's approach to learning. The teachers here are exceptional!", author: "Sarah M., Parent" },
    { id: 2, text: "The global perspective I gained at Mt Zion prepared me for success in university and beyond.", author: "James L., Alumni" },
    { id: 3, text: "A nurturing environment that brings out the best in every student. Truly a one-of-a-kind institution.", author: "Tapiwa K., Education Specialist" },
  ];

  return (
    <div className="py-20 px-4 md:px-0 bg-navy-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-blue-300">WHAT OUR COMMUNITY SAYS</h2>
        <div className="space-y-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-navy-700 p-6 rounded-xl shadow-lg"
            >
              <p className="text-lg text-gray-300 mb-4">"{testimonial.text}"</p>
              <p className="text-blue-400 font-semibold">{testimonial.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const UpcomingEvents = () => (
  <div className="py-20 px-4 md:px-0">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center text-blue-300">UPCOMING EVENTS</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <EventCard
          date="Oct 15, 2024"
          title="Open House"
          description="Experience the Mt Zion difference. Tour our state-of-the-art facilities and meet our exceptional faculty."
        />
        <EventCard
          date="Nov 1, 2024"
          title="Innovation Fair"
          description="Witness the creativity and ingenuity of our students as they showcase their latest projects and inventions."
        />
      </div>
    </div>
  </div>
);

const EventCard = ({ date, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.03, boxShadow: "0px 4px 20px rgba(144, 202, 249, 0.2)" }}
    className="bg-navy-800 p-6 rounded-xl shadow-lg flex items-start transition duration-300 border border-blue-800"
  >
    <Calendar className="text-blue-400 mr-4 flex-shrink-0" size={36} />
    <div>
      <h3 className="text-xl font-semibold text-blue-300 mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-3">{date}</p>
      <p className="text-gray-300">{description}</p>
    </div>
  </motion.div>
);

const ContactInfo = () => (
  <div className="py-20 px-4 md:px-0 bg-navy-800">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-12 text-blue-300">CONNECT WITH US</h2>
      <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-12">
        <motion.a 
          href="tel:+263785933900" 
          className="flex items-center justify-center text-blue-400 text-xl transition duration-300 hover:text-blue-300"
          whileHover={{ scale: 1.05 }}
        >
          <Phone className="mr-3" size={24} /> +263-78-593-3900
        </motion.a>
        <motion.a 
          href="mailto:mtzioncollegeofficial@gmail.com" 
          className="flex items-center justify-center text-blue-400 text-xl transition duration-300 hover:text-blue-300"
          whileHover={{ scale: 1.05 }}
        >
          <Mail className="mr-3" size={24} /> mtzioncollegeofficial@gmail.com
        </motion.a>
      </div>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(144, 202, 249, 0.5)" }}
        whileTap={{ scale: 0.95 }}
        className="mt-12 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition duration-300 text-lg"
      >
        Schedule a Visit
        <ChevronRight className="ml-2" size={24} />
      </motion.button>
    </div>
  </div>
);

export default HomePage;