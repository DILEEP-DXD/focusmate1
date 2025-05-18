import React from 'react';
import { motion } from 'framer-motion';
import StudyTools from '../components/StudyTools';

const StudyToolsPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-6xl py-12 px-4 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-12 text-center gradient-text">
          Study Tools
        </h2>
        <StudyTools />
      </motion.div>
    </div>
  );
};

export default StudyToolsPage; 