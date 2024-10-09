import React from 'react';
import { motion } from 'framer-motion';
import { Book, Users, Award, Globe, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 text-white">
      <Header />
      <Mission />
      <History />
      <Values />
      <Leadership />
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
        About Mt Zion College
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl md:text-2xl text-blue-300"
      >
        Nurturing Minds, Shaping Futures
      </motion.p>
    </div>
  </header>
);

const Mission = () => (
  <section className="py-20 px-4">
    <div className="container mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-300">Our Mission</h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl text-center max-w-3xl mx-auto"
      >
        At Mt Zion College, our mission is to provide a world-class education that empowers students to become innovative thinkers, compassionate leaders, and responsible global citizens.
      </motion.p>
    </div>
  </section>
);

const History = () => (
  <section className="py-20 px-4 bg-navy-800">
    <div className="container mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-300">Our History</h2>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-navy-700 p-8 rounded-xl shadow-lg"
      >
        <p className="text-lg mb-4">
          Founded in 1980, Mt Zion College has a rich history of academic excellence and community engagement. What started as a small school with just 50 students has grown into a network of campuses across Zimbabwe, each dedicated to nurturing the potential of every student.
        </p>
        <p className="text-lg">
          Over the years, we've continuously evolved our curriculum and facilities to meet the changing needs of our students and the world they'll inherit. Today, we're proud to be at the forefront of educational innovation in Zimbabwe.
        </p>
      </motion.div>
    </div>
  </section>
);

const Values = () => (
  <section className="py-20 px-4">
    <div className="container mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center text-blue-300">Our Core Values</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: <Book />, title: "Academic Excellence", description: "We strive for the highest standards of academic achievement." },
          { icon: <Users />, title: "Community", description: "We foster a supportive and inclusive learning environment." },
          { icon: <Globe />, title: "Global Perspective", description: "We prepare students to thrive in an interconnected world." },
        ].map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-navy-800 p-6 rounded-xl shadow-lg text-center"
          >
            <div className="inline-block p-3 bg-blue-500 rounded-full mb-4">
              {React.cloneElement(value.icon, { size: 24, className: "text-white" })}
            </div>
            <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
            <p className="text-gray-300">{value.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Leadership = () => (
  <section className="py-20 px-4 bg-navy-800">
    <div className="container mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center text-blue-300">Our Leadership</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { name: "Dr. Sarah Moyo", title: "Principal", image: "/api/placeholder/300/300" },
          { name: "Mr. John Ndlovu", title: "Vice Principal", image: "/api/placeholder/300/300" },
          { name: "Mrs. Grace Mutasa", title: "Head of Academics", image: "/api/placeholder/300/300" },
        ].map((leader, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-navy-700 rounded-xl shadow-lg overflow-hidden"
          >
            <img src={leader.image} alt={leader.name} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-1">{leader.name}</h3>
              <p className="text-blue-300">{leader.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const CallToAction = () => (
  <section className="py-20 px-4">
    <div className="container mx-auto text-center">
      <h2 className="text-4xl font-bold mb-8 text-blue-300">Join Our Community</h2>
      <p className="text-xl mb-12 max-w-2xl mx-auto">
        Experience the Mt Zion difference. Schedule a visit to one of our campuses and see firsthand how we're shaping the leaders of tomorrow.
      </p>
      <Link to="/contact">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg inline-flex items-center"
        >
          Schedule a Visit <ChevronRight className="ml-2" size={20} />
        </motion.button>
      </Link>
    </div>
  </section>
);

export default AboutUsPage;