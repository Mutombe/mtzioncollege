import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Cloud, Droplets, Flower, Sprout, Loader } from 'lucide-react';

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);

  const stages = [
    { icon: Sun, text: "Nurturing minds with knowledge", color: "text-[#BDB76B]" },
    { icon: Cloud, text: "Fostering creativity and innovation", color: "text-[#BDB76B]" },
    { icon: Droplets, text: "Cultivating a thirst for learning", color: "text-[#BDB76B]" },
    { icon: Sprout, text: "Growing future leaders", color: "text-[#BDB76B]" },
    { icon: Flower, text: "Blossoming into excellence", color: "text-[#BDB76B]" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        const newProgress = (oldProgress + 1) % 101;
        setCurrentStage(Math.floor((newProgress % 100) / 20));
        return newProgress;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const TreeBranch = ({ rotate, delay }) => (
    <motion.div
      className="absolute w-1 h-16 bg-[#2a3b5e] origin-bottom"
      style={{ rotate }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ delay, duration: 1.5, ease: "easeOut" }}
    >
      <motion.div
        className="absolute top-0 left-1/2 w-4 h-4 rounded-full bg-[#BDB76B]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.5, duration: 0.5, ease: "easeOut" }}
      />
    </motion.div>
  );

  return (
    <div className="bg-[#1a2744] flex flex-col items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="rounded-xl bg-gradient-to-br from-[#2a3b5e] to-[#1a2744] p-8 max-w-md w-full relative overflow-hidden shadow-xl"
      >
        <div className="absolute inset-0 backdrop-blur-sm z-0"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-center text-[#BDB76B] mb-6">
            Loading...
          </h1>
          
          <div className="relative pt-1 mb-8">
            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-[#1a2744]/50">
              <motion.div 
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#BDB76B] rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="relative h-32 flex items-center justify-center">
            <motion.div
              className="absolute bottom-0 left-1/2 w-4 h-12 bg-[#2a3b5e] rounded-full"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <TreeBranch rotate={-45} delay={0.5} />
            <TreeBranch rotate={-15} delay={0.7} />
            <TreeBranch rotate={15} delay={0.9} />
            <TreeBranch rotate={45} delay={1.1} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-6 text-center"
            >
              {stages[currentStage] && React.createElement(stages[currentStage].icon, { 
                className: `mx-auto ${stages[currentStage].color} mb-2`, 
                size: 32 
              })}
              <p className="text-gray-300">{stages[currentStage]?.text || ''}</p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="absolute top-2 right-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader className="text-[#BDB76B]" size={24} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingPage;