import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Book, Calendar, Users, Music, Palette, 
  Dumbbell, Globe, ChevronRight, ArrowLeft,
  GraduationCap, ChevronDown, ChevronUp
} from "lucide-react";
import { Link } from "react-router-dom";

const StudentLifePage = () => {
  return (
    <div className="min-h-screen pt-20">
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
                  Student Life
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Experience Mt Zion
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <ActivitySection />
        <FacilitiesSection />
        <EventsSection />
        <StoriesSection />
      </div>
    </div>
  );
};

const ActivitySection = () => {
  const activities = [
    {
      icon: <Music className="text-[#F0E68C]" size={32} />,
      title: "Arts & Culture",
      description: "Express yourself through music, drama, and visual arts.",
      stats: { participants: 150, programs: 8 }
    },
    {
      icon: <Dumbbell className="text-[#F0E68C]" size={32} />,
      title: "Sports",
      description: "Compete in a variety of sports and stay physically active.",
      stats: { participants: 200, programs: 12 }
    },
    {
      icon: <Users className="text-[#F0E68C]" size={32} />,
      title: "Clubs & Societies",
      description: "Join like-minded peers in academic and interest-based groups.",
      stats: { participants: 180, programs: 15 }
    }
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-[#0A1D3B] dark:text-[#F0E68C] mb-8">
        Extracurricular Activities
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-[#1A2F4F] rounded-xl shadow-xl overflow-hidden border border-[#F0E68C]/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="p-6">
              <motion.div 
                className="flex justify-center mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {activity.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-[#0A1D3B] dark:text-[#F0E68C] mb-4 text-center">
                {activity.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                {activity.description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-[#F0E68C]/10 rounded-lg">
                  <p className="text-[#0A1D3B] dark:text-[#F0E68C] font-bold">
                    {activity.stats.participants}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Participants
                  </p>
                </div>
                <div className="text-center p-3 bg-[#F0E68C]/10 rounded-lg">
                  <p className="text-[#0A1D3B] dark:text-[#F0E68C] font-bold">
                    {activity.stats.programs}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Programs
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const FacilitiesSection = () => {
  const facilities = [
    { title: "Modern Libraries", image: "/images/libra.jpg", capacity: 50 },
    { title: "Science Labs", image: "/images/lab.jpg", capacity: 60 },
    { title: "Sports Complex", image: "/images/sports.jfif", capacity: 400 },
    { title: "Art Studios", image: "images/art.jpg", capacity: 10 },
    { title: "Computer Labs", image: "images/clab.jpg", capacity: 20 },
    { title: "Student Lounges", image: "images/lounge.jpg", capacity: 40 },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-[#0A1D3B] dark:text-[#F0E68C] mb-8">
        Our Facilities
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {facilities.map((facility, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-[#1A2F4F] rounded-xl shadow-xl overflow-hidden border border-[#F0E68C]/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img 
              src={facility.image} 
              alt={facility.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#0A1D3B] dark:text-[#F0E68C] mb-4">
                {facility.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  Capacity
                </span>
                <span className="text-[#0A1D3B] dark:text-[#F0E68C] font-bold">
                  {facility.capacity} students
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const EventsSection = () => {
  const [expandedEvent, setExpandedEvent] = useState(null);
  
  const events = [
    {
      title: "Annual Science Fair",
      date: "October 15, 2024",
      description: "Showcase your innovative projects and compete for top honors.",
      location: "Main Hall",
      participants: "All Grades"
    },
    {
      title: "Cultural Festival",
      date: "November 5, 2024",
      description: "Celebrate the diverse cultures represented in our student body.",
      location: "School Grounds",
      participants: "All Students"
    }
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-[#0A1D3B] dark:text-[#F0E68C] mb-8">
        Upcoming Events
      </h2>
      {events.map((event, index) => (
        <motion.div
          key={index}
          className="bg-white dark:bg-[#1A2F4F] rounded-xl shadow-xl overflow-hidden border border-[#F0E68C]/20 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-[#0A1D3B] dark:text-[#F0E68C]">
                  {event.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {event.date}
                </p>
              </div>
              <button
                onClick={() => setExpandedEvent(expandedEvent === index ? null : index)}
                className="text-[#F0E68C]"
              >
                {expandedEvent === index ? (
                  <ChevronUp size={24} />
                ) : (
                  <ChevronDown size={24} />
                )}
              </button>
            </div>
            
            <AnimatePresence>
              {expandedEvent === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {event.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#F0E68C]/10 p-3 rounded-lg">
                      <p className="text-[#0A1D3B] dark:text-[#F0E68C] font-bold">
                        Location
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {event.location}
                      </p>
                    </div>
                    <div className="bg-[#F0E68C]/10 p-3 rounded-lg">
                      <p className="text-[#0A1D3B] dark:text-[#F0E68C] font-bold">
                        Participants
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {event.participants}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </section>
  );
};

const StoriesSection = () => {
  const stories = [
    {
      name: "Tendai Moyo",
      quote: "Mt Zion has given me the confidence to pursue my dreams in science.",
      image: "/images/student1.jpg",
      activity: "Science Club"
    },
    {
      name: "Chipo Ngwenya",
      quote: "The diverse community at Mt Zion has broadened my worldview.",
      image: "/images/student2.jpg",
      activity: "Cultural Society"
    }
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold text-[#0A1D3B] dark:text-[#F0E68C] mb-8">
        Student Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map((story, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-[#1A2F4F] rounded-xl shadow-xl overflow-hidden border border-[#F0E68C]/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="p-6 flex items-center">
              <img
                src={story.image}
                alt={story.name}
                className="w-20 h-20 rounded-full object-cover mr-4"
              />
              <div>
                <p className="text-gray-600 dark:text-gray-300 italic mb-2">
                  "{story.quote}"
                </p>
                <p className="text-[#0A1D3B] dark:text-[#F0E68C] font-bold">
                  {story.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {story.activity}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StudentLifePage;