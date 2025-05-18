import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface StudyStats {
  totalStudyTime: number;
  completedQuizzes: number;
  averageScore: number;
  flashcardsReviewed: number;
  weakAreas: string[];
}

interface BreakStats {
  totalBreakTime: number;
  completedActivities: number;
  moodDistribution: { [key: string]: number };
  mostUsedActivities: { [key: string]: number };
}

const DashboardPage: React.FC = () => {
  const [studyStats, setStudyStats] = useState<StudyStats>({
    totalStudyTime: 0,
    completedQuizzes: 0,
    averageScore: 0,
    flashcardsReviewed: 0,
    weakAreas: [],
  });

  const [breakStats, setBreakStats] = useState<BreakStats>({
    totalBreakTime: 0,
    completedActivities: 0,
    moodDistribution: {},
    mostUsedActivities: {},
  });

  useEffect(() => {
    // Simulated data fetching
    // In a real app, this would fetch from your backend
    setStudyStats({
      totalStudyTime: 12.5, // hours
      completedQuizzes: 15,
      averageScore: 85,
      flashcardsReviewed: 120,
      weakAreas: ['Mathematics', 'Physics', 'Chemistry'],
    });

    setBreakStats({
      totalBreakTime: 5.2, // hours
      completedActivities: 25,
      moodDistribution: {
        '😊': 12,
        '😐': 8,
        '😢': 5,
      },
      mostUsedActivities: {
        'Deep Breathing': 8,
        'Quick Stretch': 6,
        'Power Nap': 4,
      },
    });
  }, []);

  // Chart data
  const studyTimeData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Study Hours',
        data: [2.5, 3.0, 1.5, 2.0, 1.0, 1.5, 1.0],
        borderColor: 'rgb(99, 179, 237)',
        backgroundColor: 'rgba(99, 179, 237, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const quizScoresData = {
    labels: ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4', 'Quiz 5'],
    datasets: [
      {
        label: 'Scores',
        data: [85, 90, 75, 95, 80],
        backgroundColor: 'rgba(99, 179, 237, 0.8)',
      },
    ],
  };

  const moodData = {
    labels: Object.keys(breakStats.moodDistribution),
    datasets: [
      {
        data: Object.values(breakStats.moodDistribution),
        backgroundColor: [
          'rgba(99, 179, 237, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(255, 99, 132, 0.8)',
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 gradient-text"
      >
        Your Learning Dashboard
      </motion.h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neon-glow p-6 rounded-lg"
        >
          <h3 className="text-lg font-semibold mb-2">Total Study Time</h3>
          <p className="text-3xl font-bold text-[var(--primary-accent-rgb)]">
            {studyStats.totalStudyTime}h
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="neon-glow p-6 rounded-lg"
        >
          <h3 className="text-lg font-semibold mb-2">Completed Quizzes</h3>
          <p className="text-3xl font-bold text-[var(--primary-accent-rgb)]">
            {studyStats.completedQuizzes}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="neon-glow p-6 rounded-lg"
        >
          <h3 className="text-lg font-semibold mb-2">Average Score</h3>
          <p className="text-3xl font-bold text-[var(--primary-accent-rgb)]">
            {studyStats.averageScore}%
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="neon-glow p-6 rounded-lg"
        >
          <h3 className="text-lg font-semibold mb-2">Break Activities</h3>
          <p className="text-3xl font-bold text-[var(--primary-accent-rgb)]">
            {breakStats.completedActivities}
          </p>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="neon-glow p-6 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Weekly Study Hours</h3>
          <Line data={studyTimeData} options={{ responsive: true }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="neon-glow p-6 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Quiz Performance</h3>
          <Bar data={quizScoresData} options={{ responsive: true }} />
        </motion.div>
      </div>

      {/* Mood and Activities Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neon-glow p-6 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Mood Distribution</h3>
          <div className="h-64">
            <Doughnut data={moodData} options={{ responsive: true }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neon-glow p-6 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Most Used Activities</h3>
          <div className="space-y-4">
            {Object.entries(breakStats.mostUsedActivities).map(([activity, count]) => (
              <div key={activity} className="flex items-center justify-between">
                <span className="text-[var(--text-color)]/80">{activity}</span>
                <div className="w-48 bg-[var(--background-end-rgb)] rounded-full h-2.5">
                  <div
                    className="bg-[var(--primary-accent-rgb)] h-2.5 rounded-full"
                    style={{ width: `${(count / Math.max(...Object.values(breakStats.mostUsedActivities))) * 100}%` }}
                  ></div>
                </div>
                <span className="text-[var(--primary-accent-rgb)] font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Weak Areas Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="neon-glow p-6 rounded-lg mt-8"
      >
        <h3 className="text-xl font-semibold mb-4">Areas Needing Attention</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {studyStats.weakAreas.map((area) => (
            <div
              key={area}
              className="p-4 bg-[var(--background-end-rgb)] rounded-lg text-center"
            >
              <span className="text-[var(--text-color)]/80">{area}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage; 