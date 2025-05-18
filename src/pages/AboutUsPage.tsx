import React from 'react';
import { motion } from 'framer-motion';
import AboutUs from '../components/AboutUs';

const AboutUsPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-24"
    >
      <AboutUs />
    </motion.div>
  );
};

export default AboutUsPage; 