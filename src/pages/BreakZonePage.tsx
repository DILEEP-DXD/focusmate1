import React from 'react';
import BreakZone from '../components/BreakZone';
import { motion } from 'framer-motion';

const BreakZonePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 gradient-text"
      >
        Break & Stress Relief
      </motion.h1>

      {/* Page Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-6 rounded-lg bg-[var(--background-end-rgb)] border border-[var(--border-color-rgb)]"
      >
        <h2 className="text-xl font-semibold mb-4 gradient-text">Page Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg bg-[var(--primary-accent-rgb)]/10">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <span className="text-2xl">⏰</span> Break Timer
            </h3>
            <p className="text-sm text-[var(--text-color)]/80">
              Customize and track your break duration with a flexible timer. Get notified when your break is complete and manage your time effectively.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[var(--primary-accent-rgb)]/10">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <span className="text-2xl">🧘</span> Break Activities
            </h3>
            <p className="text-sm text-[var(--text-color)]/80">
              Choose from various activities including breathing exercises, stretches, and mindfulness practices. Each activity comes with detailed guides and benefits.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[var(--primary-accent-rgb)]/10">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <span className="text-2xl">😊</span> Mood Tracker
            </h3>
            <p className="text-sm text-[var(--text-color)]/80">
              Track your mood patterns, intensity, and activities. Get insights into how different activities affect your well-being and productivity.
            </p>
          </div>
        </div>
      </motion.div>

      <BreakZone />
    </div>
  );
};

export default BreakZonePage; 