import React from 'react';
import { motion } from 'framer-motion';
import { Book,Calendar , Users, Music, Palette, Dumbbell, Globe, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentLifePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 text-white">
      <Header />
      <Overview />
      <Activities />
      <Facilities />
      <StudentStories />
      <Events />
      <CallToAction />
    </div>
  );
};

const Header = () => (
  <header className="bg-navy-900 text-white py-20 px-4">
    <div className="container mx-auto text-center">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl md:text-6xl font-bold mb-4"
      >
        Student Life at Mt Zion
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl md:text-2xl text-blue-300"
      >
        Where Learning Meets Living
      </motion.p>
    </div>
  </header>
);

const Overview = () => (
  <section className="py-20 px-4">
    <div className="container mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-300">Life at Mt Zion</h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl text-center max-w-3xl mx-auto"
      >
        At Mt Zion College, we believe that education extends far beyond the classroom. Our vibrant student life program is designed to nurture well-rounded individuals, fostering personal growth, leadership skills, and lifelong friendships.
      </motion.p>
    </div>
  </section>
);

const Activities = () => (
  <section className="py-20 px-4 bg-navy-800">
    <div className="container mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center text-blue-300">Extracurricular Activities</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: <Music />, title: "Arts & Culture", description: "Express yourself through music, drama, and visual arts." },
          { icon: <Dumbbell />, title: "Sports", description: "Compete in a variety of sports and stay physically active." },
          { icon: <Users />, title: "Clubs & Societies", description: "Join like-minded peers in academic and interest-based groups." },
        ].map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-navy-700 p-6 rounded-xl shadow-lg text-center"
          >
            <div className="inline-block p-3 bg-blue-500 rounded-full mb-4">
              {React.cloneElement(activity.icon, { size: 24, className: "text-white" })}
            </div>
            <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
            <p className="text-gray-300">{activity.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Facilities = () => (
  <section className="py-20 px-4">
    <div className="container mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center text-blue-300">Our Facilities</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: "Modern Libraries", image: "/images/libra.jpg" },
          { title: "Science Labs", image: "images/lab.jpg" },
          { title: "Sports Complexes", image: "images/sports.jfif" },
          { title: "Art Studios", image: "images/art.jpg" },
          { title: "Computer Labs", image: "images/clab.jpg" },
          { title: "Student Lounges", image: "images/lounge.jpg" },
        ].map((facility, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-navy-800 rounded-xl shadow-lg overflow-hidden"
          >
            <img src={facility.image} alt={facility.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-center">{facility.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const StudentStories = () => (
    <section className="py-20 px-4 bg-navy-800">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-blue-300">Student Stories</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { name: "Tendai Moyo", quote: "Mt Zion has given me the confidence to pursue my dreams in science.", image: "images/logo.png" },
            { name: "Chipo Ngwenya", quote: "The diverse community at Mt Zion has broadened my worldview.", image: "images/logo.png" },
          ].map((student, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-navy-700 p-6 rounded-xl shadow-lg flex items-center"
            >
              <img src={student.image} alt={student.name} className="w-24 h-24 rounded-full mr-6" />
              <div>
                <p className="text-lg italic mb-2">"{student.quote}"</p>
                <p className="text-blue-300 font-semibold">{student.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
  
  const Events = () => (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-blue-300">Upcoming Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Annual Science Fair", date: "October 15, 2024", description: "Showcase your innovative projects and compete for top honors." },
            { title: "Cultural Festival", date: "November 5, 2024", description: "Celebrate the diverse cultures represented in our student body." },
            { title: "Sports Day", date: "December 3, 2024", description: "Compete in various sports and show your school spirit." },
          ].map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-navy-800 p-6 rounded-xl shadow-lg"
            >
              <Calendar className="text-blue-400 mb-4" size={24} />
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-blue-300 mb-2">{event.date}</p>
              <p className="text-gray-300">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
  
  const CallToAction = () => (
    <section className="py-20 px-4 bg-navy-800">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 text-blue-300">Experience Mt Zion Life</h2>
        <p className="text-xl mb-12 max-w-2xl mx-auto">
          Ready to be part of our vibrant community? Schedule a campus tour and see firsthand what student life at Mt Zion College is all about.
        </p>
        <Link to="/contact">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg inline-flex items-center"
          >
            Schedule a Tour <ChevronRight className="ml-2" size={20} />
          </motion.button>
        </Link>
      </div>
    </section>
  );
  
  export default StudentLifePage;