import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

const branches = [
  {
    id: 1,
    name: 'Main Campus',
    location: 'Harare, Zimbabwe',
    students: 1200,
    grades: 'Grade 1-6',
    description: 'Our flagship campus with state-of-the-art facilities and a rich history of academic excellence.',
    image: '/api/placeholder/800/400',
  },
  {
    id: 2,
    name: 'North Campus',
    location: 'Bulawayo, Zimbabwe',
    students: 800,
    grades: 'Grade 1-6',
    description: 'A modern campus known for its innovative STEM programs and spacious sports facilities.',
    image: '/api/placeholder/800/400',
  },
  {
    id: 3,
    name: 'West Campus',
    location: 'Gweru, Zimbabwe',
    students: 600,
    grades: 'Grade 1-4',
    description: 'Our newest campus, focusing on early childhood education with a nature-inspired learning environment.',
    image: '/api/placeholder/800/400',
  },
];

const BranchesPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-navy-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Our Branches</h1>
          <p className="text-xl text-light-blue-300">Discover Mt Zion College campuses across Zimbabwe</p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branches.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>
      </main>
    </div>
  );
};

const BranchCard = ({ branch }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={branch.image} alt={branch.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{branch.name}</h2>
        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
          <MapPin size={18} className="mr-2" />
          <span>{branch.location}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-4">
          <div className="flex items-center">
            <Users size={18} className="mr-2" />
            <span>{branch.students} students</span>
          </div>
          <div className="flex items-center">
            <BookOpen size={18} className="mr-2" />
            <span>{branch.grades}</span>
          </div>
        </div>
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0 }}
          className="overflow-hidden"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-4">{branch.description}</p>
        </motion.div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-full py-2 bg-light-blue-500 text-white rounded-md hover:bg-light-blue-600 transition-colors duration-300"
        >
          {isExpanded ? (
            <>
              <span className="mr-2">Show Less</span>
              <ChevronUp size={18} />
            </>
          ) : (
            <>
              <span className="mr-2">Learn More</span>
              <ChevronDown size={18} />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default BranchesPage;