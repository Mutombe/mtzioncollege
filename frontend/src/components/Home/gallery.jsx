import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { 
  Calendar,
  X,
  ArrowLeft,
  Image as ImageIcon,
  Camera,
  Clock
} from 'lucide-react';

const memories = [
  { id: 1, title: "Summer Leaver's Party", date: '2023-07-15', image: '/images/mtzion3.jpg', description: "Unforgettable Form Four Leaver's Party with all School Members" },
  { id: 2, title: 'Graduation Day', date: '2023-05-20', image: '/images/mtzion2.jpg', description: 'ECD Graduation' },
  { id: 3, title: 'Africa Day', date: '2023-09-01', image: '/images/africa.png', description: 'Celebrating the African diaspora' },
  { id: 4, title: 'Fun Day', date: '2023-06-12', image: '/images/mtzion4.jpg', description: 'The most beautiful day at Mt Zion' },
  { id: 5, title: 'New Year Party', date: '2024-01-01', image: '/images/mtzion2.jpg', description: 'Welcoming the new year with celebration' },
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

  return (
    <div className="min-h-screen pt-20">
      <header className="bg-gradient-to-r from-navy-900 to-navy-800 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => window.history.back()}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-khaki-700">
                  Memory Gallery
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Our School Moments
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white dark:bg-[#1A2F4F] border border-[#F0E68C]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0E68C] text-[#0A1D3B] dark:text-[#F0E68C]"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F0E68C]" size={20} />
          </motion.div>
          
          {filterDate && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setFilterDate('')}
              className="flex items-center px-6 py-2 bg-[#F0E68C] text-[#0A1D3B] rounded-lg hover:bg-[#DFD98B] transition-all duration-300"
            >
              <X size={20} className="mr-2" />
              Clear Filter
            </motion.button>
          )}
        </div>

        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredMemories.map(memory => (
              <MemoryCard key={memory.id} memory={memory} setSelectedMemory={setSelectedMemory} />
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedMemory && (
            <MemoryModal memory={selectedMemory} onClose={() => setSelectedMemory(null)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const MemoryCard = ({ memory, setSelectedMemory }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    whileHover={{ y: -5 }}
    onClick={() => setSelectedMemory(memory)}
    className="bg-white dark:bg-[#1A2F4F] rounded-xl shadow-xl overflow-hidden cursor-pointer border border-[#F0E68C]/20"
  >
    <div className="relative h-48">
      <img src={memory.image} alt={memory.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
    
    <div className="p-6">
      <h3 className="text-xl font-bold text-[#0A1D3B] dark:text-[#F0E68C] mb-2">
        {memory.title}
      </h3>
      
      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
        <Clock size={16} className="mr-2 text-[#F0E68C]" />
        <span className="text-sm">
          {format(parseISO(memory.date), 'MMMM d, yyyy')}
        </span>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
        {memory.description}
      </p>
    </div>
  </motion.div>
);

const MemoryModal = ({ memory, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    onClick={onClose}
  >
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      className="bg-white dark:bg-[#1A2F4F] rounded-xl shadow-2xl overflow-hidden max-w-2xl w-full border border-[#F0E68C]/20"
      onClick={e => e.stopPropagation()}
    >
      <div className="relative">
        <img src={memory.image} alt={memory.title} className="w-full h-72 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      
      <div className="p-6">
        <h2 className="text-3xl font-bold text-[#0A1D3B] dark:text-[#F0E68C] mb-3">
          {memory.title}
        </h2>
        
        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
          <Clock size={18} className="mr-2 text-[#F0E68C]" />
          <span>{format(parseISO(memory.date), 'MMMM d, yyyy')}</span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {memory.description}
        </p>
      </div>
      
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-[#F0E68C] text-[#0A1D3B] rounded-full p-2 hover:bg-[#DFD98B] transition-colors"
      >
        <X size={24} />
      </button>
    </motion.div>
  </motion.div>
);

export default MemoryGallery;