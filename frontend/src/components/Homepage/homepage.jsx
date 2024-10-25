import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronRight, Calendar, Phone, Mail, Award, Book, Users, ChevronDown, GraduationCap, Globe, Star, Zap, Heart, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className=" min-h-screen text-white overflow-hidden">
      <ParticlesBackground />
      <Hero scrollY={scrollY} opacity={opacity} />
      <ScrollIndicator />
      <Announcements />
      <Features scrollY={scrollY} />
      <PhotoGallery />          
      <FacilitiesShowcase />   
      <InteractiveTimeline />
      <CampusLifeGrid />      
      <StaffSpotlight /> 
      <InteractiveTimeline />
      <Testimonials />
      <AchievementsCounter />
      <UpcomingEvents />
      <FloatingActionButton />
    </div>
  );
};

const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: [0.8, 1.2, 1], opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="text-center"
    >
      <motion.h1 
        className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#BDB76B] to-[#F0E68C]"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        MT ZION COLLEGE
      </motion.h1>
    </motion.div>
  </div>
);

const ParticlesBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#BDB76B] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

const Hero = ({ scrollY, opacity }) => {
  const yPosAnim = useTransform(scrollY, [0, 500], [0, 150]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ opacity }}
      >
        <EnhancedBackground isHovered={isHovered} />
      </motion.div>
      
      <motion.div 
        className="relative z-10 text-center px-4"
        style={{ y: yPosAnim, scale }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="mb-8"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 rounded-full border-4 border-[#BDB76B] border-t-transparent animate-spin" />
            <div className="absolute inset-2 rounded-full border-4 border-[#D4C376] border-b-transparent animate-spin-slow" />
            <div className="absolute inset-4 rounded-full border-4 border-[#F0E68C] border-l-transparent animate-spin-slower" />
          </div>
        </motion.div>

        <motion.h1 
          className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#BDB76B] to-[#F0E68C]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.05 }}
        >
          MT ZION COLLEGE
        </motion.h1>
        
        <motion.p 
          className="text-2xl md:text-4xl mb-12 text-[#D4C376]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Bringing Excellence To Children
        </motion.p>

        <motion.div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Link to="/branches">
            <motion.button
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0px 0px 25px rgba(189, 183, 107, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#BDB76B] to-[#8B7355] text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition duration-300 text-lg relative overflow-hidden group"
            >
              <span className="relative z-10">Begin Your Journey</span>
              <ChevronRight className="ml-2 relative z-10" size={24} />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#8B7355] to-[#BDB76B]"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0px 0px 25px rgba(189, 183, 107, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-[#BDB76B] text-[#BDB76B] font-bold py-4 px-8 rounded-full inline-flex items-center transition duration-300 text-lg hover:bg-[#BDB76B] hover:text-[#1a2744]"
          >
            Virtual Tour
            <Globe className="ml-2" size={24} />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

const EnhancedBackground = ({ isHovered }) => {
  return (
    <div className="absolute inset-0">
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-[#BDB76B]/20 via-transparent to-transparent"
        animate={{
          scale: isHovered ? 1.2 : 1,
          opacity: isHovered ? 0.8 : 0.5,
        }}
        transition={{ duration: 0.5 }}
      />
      
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BDB76B" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#F0E68C" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        <motion.g
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 100,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...Array(20)].map((_, i) => (
            <line
              key={i}
              x1="0"
              y1={i * 50}
              x2="100%"
              y2={i * 50}
              stroke="url(#grid-gradient)"
              strokeWidth="0.5"
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <line
              key={i + 20}
              x1={i * 50}
              y1="0"
              x2={i * 50}
              y2="100%"
              stroke="url(#grid-gradient)"
              strokeWidth="0.5"
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
};

const ScrollIndicator = () => (
  <motion.div
    className="absolute bottom left-1/2 transform -translate-x-1/2 flex flex-col items-center text-[#BDB76B] cursor-pointer mr-5"
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <p className="mb-2 text-sm">Scroll to explore</p>
    <ArrowDown size={24} />
  </motion.div>
);


const InteractiveTimeline = () => {
  const events = [
    { year: '2010', title: 'Foundation', description: 'Mt Zion College was established' },
    { year: '2015', title: 'Expansion', description: 'Opened second branch' },
    { year: '2015', title: 'Innovation', description: 'Launched digital learning initiative' },
    { year: '2024', title: 'Excellence', description: 'Ranked among top institutions' },
  ];

  return (
    <div className="py-20 px-4 md:px-0">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center text-[#BDB76B]">OUR JOURNEY</h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#BDB76B]/20" />
          {events.map((event, index) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`flex items-center ${index % 2 === 0 ? 'justify-end' : ''} mb-12`}
            >
              <div className={`relative ${index % 2 === 0 ? 'mr-8' : 'ml-8'} bg-[#1e2d4d] p-6 rounded-xl border border-[#BDB76B]/20 w-96`}>
                <div className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#BDB76B] rounded-full
                  ${index % 2 === 0 ? 'right-[-2rem]' : 'left-[-2rem]'}" />
                <h3 className="text-2xl font-bold text-[#BDB76B] mb-2">{event.year}</h3>
                <h4 className="text-xl text-[#D4C376] mb-2">{event.title}</h4>
                <p className="text-gray-300">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AchievementsCounter = () => {
  const [inView, setInView] = useState(false);
  const achievements = [
    { count: 1000, label: 'Students', icon: Users },
    { count: 50, label: 'Expert Teachers', icon: GraduationCap },
    { count: 95, label: 'Pass Rate', icon: Star },
    { count: 25, label: 'Years of Excellence', icon: Award },
  ];

  return (
    <motion.div
      className="py-20 px-4 md:px-0 round-lg"
      onViewportEnter={() => setInView(true)}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <achievement.icon className="w-12 h-12 text-[#BDB76B] mx-auto mb-4" />
              <motion.span
                className="text-4xl font-bold text-[#D4C376] block mb-2"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
              >
                <Counter from={0} to={achievement.count} />
                {achievement.label === 'Pass Rate' && '%'}
              </motion.span>
              <span className="text-gray-300">{achievement.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Counter = ({ from, to }) => {
  const [count, setCount] = useState(from);
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = (to - from) / steps;
    let current = from;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [from, to]);
  
  return <>{count}</>;
};

const FloatingActionButton = () => (
  <motion.button
    className="fixed bottom-8 right-8 bg-[#BDB76B] text-[#1a2744] rounded-full p-4 shadow-lg z-50"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Mail size={24} />
  </motion.button>
);

export default HomePage;

const Announcements = () => (
  <div className="py-20 px-4 md:px-0">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center text-[#BDB76B]">LATEST NEWS</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-5 p-8 rounded-3xl shadow-2xl backdrop-blur-lg border border-[#BDB76B]/20"
      >
        <h3 className="text-3xl font-semibold text-[#D4C376] mb-4">Grade 1 Registration Open for 2025</h3>
        <p className="text-xl text-gray-300 mb-6">
          Secure your child's future at Mt Zion College. Limited spots available for our Grade 1 Enrollment.
        </p>
        <motion.a 
          className="inline-flex items-center text-[#1a2744] bg-[#BDB76B] rounded-full px-8 py-3 text-lg font-semibold transition duration-300 hover:bg-[#D4C376]" 
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(189, 183, 107, 0.5)" }} 
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
    whileHover={{ scale: 1.05, boxShadow: "0px 4px 20px rgba(189, 183, 107, 0.2)" }}
    className="bg-[#1e2d4d] p-8 rounded-2xl shadow-lg transition duration-300 border border-[#BDB76B]/20"
  >
    <div className="flex justify-center mb-6">
      <div className="p-3 bg-[#BDB76B] bg-opacity-20 rounded-full">
        {React.cloneElement(icon, { size: 36, className: "text-[#D4C376]" })}
      </div>
    </div>
    <h3 className="text-2xl font-semibold text-[#D4C376] mb-4 text-center">{title}</h3>
    <p className="text-gray-300 text-center">{description}</p>
  </motion.div>
);

const Features = ({ scrollY }) => (
  <div className="py-20 px-4 md:px-0 relative">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-16 text-center text-[#BDB76B]">WHY CHOOSE MT ZION ?</h2>
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
        background: `radial-gradient(circle at 50% ${50 + scrollY * 0.1}%, rgba(189, 183, 107, 0.1) 0%, rgba(189, 183, 107, 0) 60%)`,
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
    <div className="py-20 px-4 md:px-0 ">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-[#BDB76B]">WHAT OUR COMMUNITY SAYS</h2>
        <div className="space-y-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-[#1a2744] p-6 rounded-xl shadow-lg border border-[#BDB76B]/20"
            >
              <p className="text-lg text-gray-300 mb-4">"{testimonial.text}"</p>
              <p className="text-[#D4C376] font-semibold">{testimonial.author}</p>
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
      <h2 className="text-4xl font-bold mb-12 text-center text-[#BDB76B]">UPCOMING EVENTS</h2>
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
    whileHover={{ scale: 1.03, boxShadow: "0px 4px 20px rgba(189, 183, 107, 0.2)" }}
    className=" p-6 rounded-xl shadow-lg flex items-start transition duration-300 border border-[#BDB76B]/20"
  >
    <Calendar className="text-[#D4C376] mr-4 flex-shrink-0" size={36} />
    <div>
      <h3 className="text-xl font-semibold text-[#D4C376] mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-3">{date}</p>
      <p className="text-gray-300">{description}</p>
    </div>
  </motion.div>
);

const ContactInfo = () => (
  <div className="py-20 px-4 md:px-0">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-12 text-[#BDB76B]">CONNECT WITH US</h2>
      <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-12">
        <motion.a 
          href="tel:+263785933900" 
          className="flex items-center justify-center text-[#D4C376] text-xl transition duration-300 hover:text-[#BDB76B]"
          whileHover={{ scale: 1.05 }}
        >
          <Phone className="mr-3" size={24} /> +263-78-593-3900
        </motion.a>
        <motion.a 
          href="mailto:mtzioncollegeofficial@gmail.com" 
          className="flex items-center justify-center text-[#D4C376] text-xl transition duration-300 hover:text-[#BDB76B]"
          whileHover={{ scale: 1.05 }}
        >
          <Mail className="mr-3" size={24} /> mtzioncollegeofficial@gmail.com
        </motion.a>
      </div>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(189, 183, 107, 0.5)" }}
        whileTap={{ scale: 0.95 }}
        className="mt-12 bg-gradient-to-r from-[#BDB76B] to-[#8B7355] text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition duration-300 text-lg"
      >
        Schedule a Visit
        <ChevronRight className="ml-2" size={24} />
      </motion.button>
    </div>
  </div>
);


const PhotoGallery = () => {
  const galleries = [
    { 
      title: 'School Life',
      image: "images/libra.jpg",
      count: 4 
    },
    { 
      title: 'Academic Excellence',
      image: "images/mtzion2.jpg",
      count: 4 
    },
    { 
      title: 'Sports & Activities',
      image: "images/mtzion4.jpg",
      count: 4 
    },
    { 
      title: 'Events & Celebrations',
      image: "images/DSC_0104.jpg",
      count: 4 
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#BDB76B] mb-12">Our Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {galleries.map((gallery) => (
            <motion.div
              key={gallery.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl"
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={gallery.image}
                  alt={gallery.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <motion.div
                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ opacity: 1 }}
              >
                <button className="bg-[#BDB76B] text-[#1a2744] px-6 py-2 rounded-full font-semibold">
                  View {gallery.count} Photos
                </button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FacilitiesShowcase = () => {
  const facilities = [
    { 
      title: 'Modern Classrooms',
      description: 'State-of-the-art learning environments',
      image: "images/class.jpeg"
    },
    { 
      title: 'Science Labs',
      description: 'Fully equipped laboratories for practical learning',
      image: "images/lab.jpg"
    },
    { 
      title: 'Sports Complex',
      description: 'International standard sports facilities',
      image: "images/sports.jfif"
    },
    { 
      title: 'Library',
      description: 'Extensive collection of books and digital resources',
      image: "images/libra2.jpg"
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#BDB76B] mb-12">Our Facilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group rounded-xl overflow-hidden"
            >
              <div className="aspect-[16/9] rounded-xl overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold text-[#BDB76B] mb-2">{facility.title}</h3>
                <p className="text-gray-300">{facility.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CampusLifeGrid = () => {
  const activities = [
    { 
      title: 'Academic Excellence',
      category: 'Education',
      image: "images/books.jpg"
    },
    { 
      title: 'Sports Activities',
      category: 'Athletics',
      image: "images/ath.jpg"
    },
    { 
      title: 'Cultural Events',
      category: 'Culture',
      image: "images/DSC_0264.jpg"
    },
    { 
      title: 'Laboratory Sessions',
      category: 'Science',
      image: "images/lab.jpg"
    },
    { 
      title: 'Music Classes',
      category: 'Arts',
      image: "images/music.jpg"
    },
    { 
      title: 'Student Clubs',
      category: 'Activities',
      image: "images/chess.png"
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#BDB76B] mb-12">School Life</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="aspect-square rounded-xl overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="text-sm text-[#BDB76B] bg-[#1a2744]/50 px-3 py-1 rounded-full">
                    {activity.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">{activity.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StaffSpotlight = () => {
  const staff = [
    { 
      name: 'Mr Mangwenya',
      role: 'Head Master',
      experience: '20+ years',
      image: "images/user2.avif"
    },
    { 
      name: 'Mr Macheke',
      role: 'Head of Sciences',
      experience: '15+ years',
      image: "images/user2.avif"
    },
    { 
      name: 'Mrs Emily Williams',
      role: 'Head of Arts',
      experience: '18+ years',
      image: "images/user2.avif"
    },
    { 
      name: 'Mr Lunga',
      role: 'Head of Sports',
      experience: '12+ years',
      image: "images/user2.avif"
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#BDB76B] mb-12">Our Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {staff.map((member) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-[#BDB76B] mb-1">{member.name}</h3>
              <p className="text-gray-300">{member.role}</p>
              <p className="text-sm text-gray-400">{member.experience}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
