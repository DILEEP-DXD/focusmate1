import React from 'react';
import { motion } from 'framer-motion';

interface SectionLayoutProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({ id, title, children }) => {
  return (
    <section id={id} className="mb-40">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="section-title text-4xl font-extrabold gradient-text">{title}</h2>
          <div className="section-title-bar flex-1" />
        </div>
        {children}
      </motion.div>
    </section>
  );
};

export default SectionLayout; 