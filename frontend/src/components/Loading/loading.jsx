import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Cloud, Droplets, Flower, Sprout, Loader } from 'lucide-react';

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);

  const stages = [
    { icon: Sun, text: "Nurturing minds with knowledge", color: "text-yellow-500" },
    { icon: Cloud, text: "Fostering creativity and innovation", color: "text-blue-400" },
    { icon: Droplets, text: "Cultivating a thirst for learning", color: "text-blue-500" },
    { icon: Sprout, text: "Growing future leaders", color: "text-green-500" },
    { icon: Flower, text: "Blossoming into excellence", color: "text-pink-500" }
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
      className="absolute w-1 h-16 bg-brown-600 origin-bottom"
      style={{ rotate }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ delay, duration: 1.5, ease: "easeOut" }}
    >
      <motion.div
        className="absolute top-0 left-1/2 w-4 h-4 rounded-full bg-green-500"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.5, duration: 0.5, ease: "easeOut" }}
      />
    </motion.div>
  );

  return (
    <div className=" flex flex-col items-center justify-center mt-8 pt-16 pb-0">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="rounded-xl  p-8 max-w-md w-full relative overflow-hidden"
      >
        <div className="absolute inset-0  backdrop-blur-sm z-0"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
            Loading...
          </h1>
          
          <div className="relative pt-1 mb-8">
            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-blue-200 ">
              <motion.div 
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-400  rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="relative h-4">
            <motion.div
              className="absolute bottom-0 left-1/2 w-4 h-12 bg-brown-600 rounded-full"
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
              {stages[currentStage] && React.createElement(stages[currentStage].icon, { className: `mx-auto ${stages[currentStage].color} mb-2`, size: 32 })}
              <p className="text-gray-600">{stages[currentStage]?.text || ''}</p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="absolute top-2 right-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader className="text-blue-400" size={24} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingPage;