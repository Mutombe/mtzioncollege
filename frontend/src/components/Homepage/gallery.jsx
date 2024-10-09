import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { Calendar, Image as ImageIcon, Filter, X } from 'lucide-react';

// Mock data for events/memories
const memories = [
  { id: 1, title: 'Summer Vacation', date: '2023-07-15', image: '/images/mtzion.png', description: 'Unforgettable beach trip with family' },
  { id: 2, title: 'Graduation Day', date: '2023-05-20', image: '/images/mtzion2.jpg', description: 'Finally got my degree!' },
  { id: 3, title: 'First Job', date: '2023-09-01', image: '/images/mtzion3.jpg', description: 'Starting my career journey' },
  { id: 4, title: 'Wedding Day', date: '2023-06-12', image: '/images/mtzion4.jpg', description: 'The most beautiful day of our lives' },
  { id: 5, title: 'New Year Party', date: '2024-01-01', image: '/images/mtzion.png', description: 'Welcoming the new year with friends' },
  // Add more memories as needed
];

const MemoryGallery = () => {
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [filterDate, setFilterDate] = useState('');
  const [filteredMemories, setFilteredMemories] = useState(memories);

  useEffect(() => {
    if (filterDate) {
      const filtered = memories.filter(memory => memory.date >= filterDate);
      setFilteredMemories(filtered);
    } else {
      setFilteredMemories(memories);
    }
  }, [filterDate]);

  const MemoryCard = ({ memory }) => (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => setSelectedMemory(memory)}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl"
    >
      <img src={memory.image} alt={memory.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{memory.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{format(parseISO(memory.date), 'MMMM d, yyyy')}</p>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{memory.description}</p>
      </div>
    </motion.div>
  );

  const MemoryModal = ({ memory }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={() => setSelectedMemory(null)}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden max-w-2xl w-full"
        onClick={e => e.stopPropagation()}
      >
        <img src={memory.image} alt={memory.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-2">{memory.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{format(parseISO(memory.date), 'MMMM d, yyyy')}</p>
          <p className="text-gray-600 dark:text-gray-300">{memory.description}</p>
        </div>
        <button
          onClick={() => setSelectedMemory(null)}
          className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-1 hover:bg-gray-700 transition-colors"
        >
          <X size={24} />
        </button>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Memory Gallery</h1>
        
        <div className="mb-8 flex justify-between items-center">
          <div className="relative">
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" size={20} />
          </div>
          {filterDate && (
            <button
              onClick={() => setFilterDate('')}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-red-400 transition-colors"
            >
              <X size={20} className="mr-2" />
              Clear Filter
            </button>
          )}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredMemories.map(memory => (
              <MemoryCard key={memory.id} memory={memory} />
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedMemory && <MemoryModal memory={selectedMemory} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MemoryGallery;