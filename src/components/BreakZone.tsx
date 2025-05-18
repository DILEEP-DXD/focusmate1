import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MoodEntry {
  id: number;
  emoji: string;
  note: string;
  timestamp: string;
  activity?: string;
  intensity: number;
  tags: string[];
}

interface Activity {
  name: string;
  description: string;
  duration: string;
  icon: string;
  category: string;
  steps?: string[];
  benefits?: string[];
}

const BreathingAnimation: React.FC = () => {
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    const breathingCycle = async () => {
      // Inhale for 4 seconds
      setBreathingPhase('inhale');
      await new Promise(resolve => setTimeout(resolve, 4000));

      // Hold for 4 seconds
      setBreathingPhase('hold');
      await new Promise(resolve => setTimeout(resolve, 4000));

      // Exhale for 4 seconds
      setBreathingPhase('exhale');
      await new Promise(resolve => setTimeout(resolve, 4000));

      // Rest for 2 seconds
      setBreathingPhase('rest');
      await new Promise(resolve => setTimeout(resolve, 2000));

      setCycleCount(prev => prev + 1);
    };

    const interval = setInterval(breathingCycle, 14000);
    return () => clearInterval(interval);
  }, []);

  const getBreathingText = () => {
    switch (breathingPhase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'rest': return 'Rest';
      default: return '';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <motion.div
        className="relative w-48 h-48 flex items-center justify-center"
        animate={{
          scale: breathingPhase === 'inhale' ? 1.2 : 
                 breathingPhase === 'exhale' ? 0.8 : 1,
          opacity: breathingPhase === 'rest' ? 0.7 : 1
        }}
        transition={{
          duration: 4,
          ease: "easeInOut"
        }}
      >
        {/* Outer circle */}
        <motion.div
          className="absolute w-full h-full rounded-full border-4 border-[var(--primary-accent-rgb)]/30"
          animate={{
            scale: breathingPhase === 'inhale' ? 1.2 : 
                   breathingPhase === 'exhale' ? 0.8 : 1,
          }}
          transition={{
            duration: 4,
            ease: "easeInOut"
          }}
        />
        
        {/* Middle circle */}
        <motion.div
          className="absolute w-3/4 h-3/4 rounded-full border-4 border-[var(--primary-accent-rgb)]/50"
          animate={{
            scale: breathingPhase === 'inhale' ? 1.2 : 
                   breathingPhase === 'exhale' ? 0.8 : 1,
          }}
          transition={{
            duration: 4,
            ease: "easeInOut"
          }}
        />
        
        {/* Inner circle */}
        <motion.div
          className="absolute w-1/2 h-1/2 rounded-full border-4 border-[var(--primary-accent-rgb)]"
          animate={{
            scale: breathingPhase === 'inhale' ? 1.2 : 
                   breathingPhase === 'exhale' ? 0.8 : 1,
          }}
          transition={{
            duration: 4,
            ease: "easeInOut"
          }}
        />

        {/* Breathing text */}
        <motion.div
          className="absolute text-center"
          animate={{
            opacity: breathingPhase === 'rest' ? 0.5 : 1,
            y: breathingPhase === 'inhale' ? -10 : 
               breathingPhase === 'exhale' ? 10 : 0
          }}
          transition={{
            duration: 4,
            ease: "easeInOut"
          }}
        >
          <p className="text-xl font-semibold text-[var(--primary-accent-rgb)]">
            {getBreathingText()}
          </p>
          <p className="text-sm text-[var(--text-color)]/80">
            Cycle {cycleCount + 1}
          </p>
        </motion.div>
      </motion.div>

      {/* Breathing instructions */}
      <div className="mt-6 text-center">
        <p className="text-sm text-[var(--text-color)]/80">
          {breathingPhase === 'inhale' && 'Take a deep breath in through your nose'}
          {breathingPhase === 'hold' && 'Hold your breath'}
          {breathingPhase === 'exhale' && 'Slowly exhale through your mouth'}
          {breathingPhase === 'rest' && 'Take a moment to rest'}
        </p>
      </div>
    </div>
  );
};

const BreakZoneInfo: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold gradient-text">Break Zone</h2>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="btn-techy px-4 py-2 text-sm flex items-center gap-2"
        >
          <span>{showInfo ? 'Hide Info' : 'Show Info'}</span>
          <span className="text-lg">{showInfo ? '▼' : '▶'}</span>
        </button>
      </div>

      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="p-4 rounded-lg bg-[var(--background-end-rgb)] border border-[var(--border-color-rgb)]">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <span className="text-2xl">⏰</span> Break Timer
              </h3>
              <p className="text-sm text-[var(--text-color)]/80">
                Customize your break duration and track time with our flexible timer. 
                Get notified when your break is complete and manage your time effectively.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[var(--background-end-rgb)] border border-[var(--border-color-rgb)]">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <span className="text-2xl">🧘</span> Break Activities
              </h3>
              <p className="text-sm text-[var(--text-color)]/80">
                Choose from various activities including breathing exercises, stretches, 
                and mindfulness practices. Each activity comes with detailed guides and benefits.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[var(--background-end-rgb)] border border-[var(--border-color-rgb)]">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <span className="text-2xl">😊</span> Mood Tracker
              </h3>
              <p className="text-sm text-[var(--text-color)]/80">
                Track your mood patterns, intensity, and activities. Get insights into 
                how different activities affect your well-being and productivity.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MoodOption: React.FC<{
  emoji: string;
  label: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ emoji, label, color, isSelected, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`relative flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
      isSelected
        ? 'bg-[var(--primary-accent-rgb)]/20 ring-2 ring-[var(--primary-accent-rgb)]'
        : 'hover:bg-[var(--border-color-rgb)]/30'
    }`}
    style={{ borderColor: color }}
  >
    <motion.div
      animate={{
        scale: isSelected ? 1.2 : 1,
        rotate: isSelected ? [0, -10, 10, -10, 0] : 0
      }}
      transition={{ duration: 0.5 }}
      className="text-3xl mb-2"
    >
      {emoji}
    </motion.div>
    <span className="text-sm font-medium text-[var(--text-color)]/90">{label}</span>
    {isSelected && (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--primary-accent-rgb)] rounded-full flex items-center justify-center"
      >
        <span className="text-white text-xs">✓</span>
      </motion.div>
    )}
  </motion.button>
);

const BreakZone: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [currentMood, setCurrentMood] = useState('');
  const [moodNote, setMoodNote] = useState('');
  const [customMinutes, setCustomMinutes] = useState(5);
  const [showTimerSettings, setShowTimerSettings] = useState(false);
  const [showActivityDetails, setShowActivityDetails] = useState(false);
  const [customTimeInput, setCustomTimeInput] = useState('5');
  const [activityFilter, setActivityFilter] = useState<'all' | 'quick' | 'relaxing' | 'energizing'>('all');
  const [showActivityStats, setShowActivityStats] = useState(false);
  const [activityHistory, setActivityHistory] = useState<{name: string; timestamp: string}[]>([]);
  const [moodIntensity, setMoodIntensity] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showMoodStats, setShowMoodStats] = useState(false);
  const [moodFilter, setMoodFilter] = useState<string>('all');

  const moodTags = [
    'Productive', 'Tired', 'Focused', 'Distracted',
    'Energetic', 'Stressed', 'Calm', 'Anxious',
    'Motivated', 'Overwhelmed', 'Creative', 'Bored'
  ];

  const emojis = [
    { emoji: '😊', label: 'Happy', color: '#4CAF50' },
    { emoji: '😐', label: 'Neutral', color: '#9E9E9E' },
    { emoji: '😢', label: 'Sad', color: '#2196F3' },
    { emoji: '😡', label: 'Angry', color: '#F44336' },
    { emoji: '😴', label: 'Tired', color: '#795548' },
    { emoji: '😌', label: 'Relaxed', color: '#8BC34A' },
    { emoji: '🤔', label: 'Thoughtful', color: '#607D8B' },
    { emoji: '😤', label: 'Stressed', color: '#FF9800' }
  ];

  const activities: Activity[] = [
    {
      name: 'Deep Breathing',
      description: 'Take slow, deep breaths to reduce stress',
      duration: '5 min',
      icon: '🫁',
      category: 'relaxing',
      steps: [
        'Find a comfortable position',
        'Follow the breathing animation',
        'Breathe in through your nose for 4 counts',
        'Hold for 4 counts',
        'Exhale through your mouth for 4 counts',
        'Repeat for 5 minutes'
      ],
      benefits: [
        'Reduces stress and anxiety',
        'Lowers blood pressure',
        'Improves focus and concentration',
        'Promotes relaxation'
      ]
    },
    {
      name: 'Quick Stretch',
      description: 'Simple stretches to relieve tension',
      duration: '5 min',
      icon: '🧘',
      category: 'quick',
      steps: [
        'Neck rolls - 30 seconds each direction',
        'Shoulder shrugs - 10 repetitions',
        'Arm circles - 10 forward, 10 backward',
        'Hip circles - 30 seconds each direction',
        'Ankle rolls - 30 seconds each foot'
      ],
      benefits: [
        'Relieves muscle tension',
        'Improves circulation',
        'Reduces stiffness',
        'Enhances flexibility'
      ]
    },
    {
      name: 'Mindful Walk',
      description: 'Take a short walk to clear your mind',
      duration: '5 min',
      icon: '🚶',
      category: 'energizing',
      steps: [
        'Find a quiet place to walk',
        'Focus on your breathing',
        'Notice your surroundings',
        'Feel the ground beneath your feet',
        'Take in the fresh air'
      ],
      benefits: [
        'Clears the mind',
        'Boosts energy levels',
        'Improves mood',
        'Reduces mental fatigue'
      ]
    },
    {
      name: 'Power Nap',
      description: 'A short nap to boost energy',
      duration: '10 min',
      icon: '😴',
      category: 'relaxing',
      steps: [
        'Find a quiet, comfortable spot',
        'Set an alarm for 10 minutes',
        'Close your eyes and relax',
        'Focus on your breathing',
        'Let your mind rest'
      ],
      benefits: [
        'Boosts alertness',
        'Improves memory',
        'Reduces fatigue',
        'Enhances mood'
      ]
    },
    {
      name: 'Desk Yoga',
      description: 'Simple yoga poses you can do at your desk',
      duration: '7 min',
      icon: '🧘‍♀️',
      category: 'quick',
      steps: [
        'Seated cat-cow stretches',
        'Seated spinal twists',
        'Wrist and finger stretches',
        'Shoulder rolls and stretches',
        'Neck and upper back stretches'
      ],
      benefits: [
        'Relieves back pain',
        'Improves posture',
        'Reduces eye strain',
        'Increases energy'
      ]
    },
    {
      name: 'Mindful Meditation',
      description: 'Short meditation session for mental clarity',
      duration: '5 min',
      icon: '🧘‍♂️',
      category: 'relaxing',
      steps: [
        'Find a quiet space',
        'Sit comfortably',
        'Focus on your breath',
        'Observe your thoughts',
        'Return to breath when distracted'
      ],
      benefits: [
        'Reduces stress',
        'Improves focus',
        'Enhances emotional well-being',
        'Promotes mental clarity'
      ]
    }
  ];

  useEffect(() => {
    let interval: number;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play notification sound
      const audio = new Audio('/notification.mp3');
      audio.play().catch(() => {
        // Fallback to browser notification if audio fails
        if (Notification.permission === 'granted') {
          new Notification('Break Time Complete!', {
            body: 'Your break timer has finished.',
            icon: '/favicon.ico'
          });
        }
      });
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(customMinutes * 60);
  };

  const handleCustomTimeChange = (value: string) => {
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setCustomTimeInput(value);
      const minutes = parseInt(value) || 0;
      setCustomMinutes(minutes);
      setTimeLeft(minutes * 60);
    }
  };

  const startActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setShowActivityDetails(true);
    setActivityHistory(prev => [...prev, {
      name: activity.name,
      timestamp: new Date().toLocaleString()
    }]);
  };

  const completeActivity = () => {
    setShowActivityDetails(false);
    setSelectedActivity(null);
  };

  const addMoodEntry = () => {
    if (!currentMood) return;

      const newEntry: MoodEntry = {
        id: Date.now(),
        emoji: currentMood,
        note: moodNote,
        timestamp: new Date().toLocaleString(),
      activity: selectedActivity?.name,
      intensity: moodIntensity,
      tags: selectedTags
      };

    setMoodEntries(prev => [...prev, newEntry]);
      setCurrentMood('');
      setMoodNote('');
    setSelectedTags([]);
    setMoodIntensity(5);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getMoodStats = () => {
    const byMood: { [key: string]: number } = {};
    const byActivity: { [key: string]: number } = {};
    let total = 0;

    moodEntries.forEach(entry => {
      byMood[entry.emoji] = (byMood[entry.emoji] || 0) + 1;
      if (entry.activity) {
        byActivity[entry.activity] = (byActivity[entry.activity] || 0) + 1;
      }
      total++;
    });

    return { byMood, byActivity, total };
  };

  const filteredActivities = activities.filter(activity => {
    if (activityFilter === 'all') return true;
    return activity.category === activityFilter;
  });

  const filteredMoodEntries = moodEntries.filter(entry => {
    if (moodFilter === 'all') return true;
    return entry.emoji === moodFilter;
  });

  return (
    <div className="w-full px-2 md:px-0 space-y-8">
      <BreakZoneInfo />

      {/* Timer Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.01 }}
        className="neon-glow p-6 rounded-lg shadow-lg flex flex-col min-h-[250px] backdrop-blur-sm"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold gradient-text flex items-center gap-2">
            <span className="text-2xl">⏰</span> Break Timer
          </h3>
          <button
            onClick={() => setShowTimerSettings(!showTimerSettings)}
            className="btn-techy px-4 py-2 text-sm"
          >
            {showTimerSettings ? 'Hide Settings' : 'Timer Settings'}
          </button>
        </div>

        {showTimerSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-[var(--background-end-rgb)] rounded-lg"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Custom Break Duration (minutes)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customTimeInput}
                    onChange={(e) => handleCustomTimeChange(e.target.value)}
                    className="w-20 p-2 rounded bg-[var(--background-end-rgb)] text-[var(--text-color)] border border-[var(--border-color-rgb)] focus:outline-none focus:border-[var(--primary-accent-rgb)]"
                    placeholder="Enter minutes"
                  />
                  <span className="text-sm text-[var(--text-color)]/80">minutes</span>
                </div>
                <p className="text-xs text-[var(--text-color)]/60 mt-1">
                  Enter any number of minutes for your break duration
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="text-center">
            <motion.div 
              className="inline-block bg-[var(--background-end-rgb)] px-6 py-4 rounded"
              animate={{
                scale: isActive ? [1, 1.02, 1] : 1,
                boxShadow: isActive 
                  ? ['0 0 0 rgba(var(--primary-accent-rgb), 0)', '0 0 20px rgba(var(--primary-accent-rgb), 0.3)', '0 0 0 rgba(var(--primary-accent-rgb), 0)']
                  : 'none'
              }}
              transition={{
                duration: 2,
                repeat: isActive ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              <p className="text-4xl font-bold text-[var(--text-color)] font-mono">
                {formatTime(timeLeft)}
              </p>
            </motion.div>
          </div>

          <div className="flex gap-4">
            {!isActive ? (
              <motion.button
                onClick={startTimer}
                className="btn-techy px-4 py-2 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start
              </motion.button>
            ) : (
              <motion.button
                onClick={pauseTimer}
                className="btn-techy px-4 py-2 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Pause
              </motion.button>
            )}
            <motion.button
              onClick={resetTimer}
              className="btn-techy px-4 py-2 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reset
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Activities Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.01 }}
        className="neon-glow p-6 rounded-lg shadow-lg flex flex-col min-h-[250px] backdrop-blur-sm"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold gradient-text flex items-center gap-2">
            <span className="text-2xl">🧘</span> Break Activities
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setShowActivityStats(!showActivityStats)}
              className="btn-techy px-3 py-1 text-sm"
            >
              {showActivityStats ? 'Hide Stats' : 'Show Stats'}
            </button>
          </div>
        </div>

        {showActivityStats && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-[var(--background-end-rgb)] rounded-lg"
          >
            <h4 className="font-medium mb-3 text-[var(--primary-accent-rgb)]">Activity History</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {activityHistory.map((entry, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span>{entry.name}</span>
                  <span className="text-[var(--text-color)]/60">{entry.timestamp}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {['all', 'quick', 'relaxing', 'energizing'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActivityFilter(filter as any)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                activityFilter === filter
                  ? 'bg-[var(--primary-accent-rgb)] text-white'
                  : 'bg-[var(--background-end-rgb)] hover:bg-[var(--border-color-rgb)]/30'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedActivity?.name === activity.name
                  ? 'bg-[var(--primary-accent-rgb)]/20 ring-1 ring-[var(--primary-accent-rgb)]/50'
                  : 'bg-[var(--background-end-rgb)] hover:bg-[var(--border-color-rgb)]/30'
              }`}
              onClick={() => startActivity(activity)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{activity.icon}</span>
                  <div>
                    <h4 className="font-medium text-[var(--text-color)]">{activity.name}</h4>
                    <p className="text-sm text-[var(--text-color)]/80">{activity.description}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-[var(--primary-accent-rgb)]/20 text-[var(--primary-accent-rgb)]">
                        {activity.duration}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-[var(--secondary-accent-rgb)]/20 text-[var(--secondary-accent-rgb)]">
                        {activity.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {showActivityDetails && selectedActivity && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-[var(--background-end-rgb)] rounded-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-[var(--primary-accent-rgb)]">Activity Guide</h4>
              <div className="flex gap-2">
                <span className="text-sm px-2 py-1 rounded-full bg-[var(--primary-accent-rgb)]/20 text-[var(--primary-accent-rgb)]">
                  {selectedActivity.duration}
                </span>
                <span className="text-sm px-2 py-1 rounded-full bg-[var(--secondary-accent-rgb)]/20 text-[var(--secondary-accent-rgb)]">
                  {selectedActivity.category}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {selectedActivity.name === 'Deep Breathing' && <BreathingAnimation />}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2 flex items-center gap-2">
                    <span>📝</span> Steps
                  </h5>
                  <ul className="list-decimal list-inside space-y-1 text-sm">
                    {selectedActivity.steps?.map((step, index) => (
                      <li key={index} className="mb-2">{step}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2 flex items-center gap-2">
                    <span>✨</span> Benefits
                  </h5>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {selectedActivity.benefits?.map((benefit, index) => (
                      <li key={index} className="mb-2">{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={completeActivity}
                className="btn-techy w-full py-2 text-sm mt-4"
              >
                Complete Activity
          </button>
        </div>
          </motion.div>
        )}
      </motion.div>

      {/* Mood Tracker Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.01 }}
        className="neon-glow p-6 rounded-lg shadow-lg flex flex-col min-h-[550px] backdrop-blur-sm"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold gradient-text flex items-center gap-2">
            <span className="text-2xl">😊</span> Mood Tracker
          </h3>
          <button
            onClick={() => setShowMoodStats(!showMoodStats)}
            className="btn-techy px-3 py-1 text-sm"
          >
            {showMoodStats ? 'Hide Stats' : 'Show Stats'}
          </button>
        </div>

        {showMoodStats && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-[var(--background-end-rgb)] rounded-lg"
          >
            <h4 className="font-medium mb-3 text-[var(--primary-accent-rgb)]">Mood Statistics</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium mb-2">Mood Distribution</h5>
                <div className="space-y-2">
                  {Object.entries(getMoodStats().byMood).map(([emoji, count]) => (
                    <div key={emoji} className="flex items-center gap-2">
                      <span className="text-xl">{emoji}</span>
                      <div className="flex-1 h-2 bg-[var(--border-color-rgb)]/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--primary-accent-rgb)]"
                          style={{ width: `${(count / getMoodStats().total) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="text-sm font-medium mb-2">Activity Impact</h5>
                <div className="space-y-2">
                  {Object.entries(getMoodStats().byActivity).map(([activity, count]) => (
                    <div key={activity} className="flex items-center gap-2">
                      <span className="text-sm flex-1">{activity}</span>
                      <div className="flex-1 h-2 bg-[var(--border-color-rgb)]/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--secondary-accent-rgb)]"
                          style={{ width: `${(count / getMoodStats().total) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex-1 flex flex-col justify-start space-y-6">
          <motion.div 
            className="bg-[var(--background-end-rgb)]/50 p-4 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h4 className="text-sm font-medium mb-3 text-[var(--text-color)]/80">How are you feeling?</h4>
            <div className="grid grid-cols-4 gap-3">
              {emojis.map(({ emoji, label, color }) => (
                <MoodOption
                key={emoji}
                  emoji={emoji}
                  label={label}
                  color={color}
                  isSelected={currentMood === emoji}
                onClick={() => setCurrentMood(emoji)}
                />
            ))}
          </div>
          </motion.div>

          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-[var(--background-end-rgb)]/50 p-4 rounded-xl">
              <label className="block text-sm font-medium mb-3 text-[var(--text-color)]/80">Mood Intensity</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={moodIntensity}
                  onChange={(e) => setMoodIntensity(parseInt(e.target.value))}
                  className="flex-1 accent-[var(--primary-accent-rgb)]"
                />
                <div className="w-12 h-12 rounded-full bg-[var(--primary-accent-rgb)]/20 flex items-center justify-center">
                  <span className="text-lg font-semibold text-[var(--primary-accent-rgb)]">
                    {moodIntensity}
                  </span>
                </div>
              </div>
            </div>

            {/* Mood Entry Form */}
            <div className="bg-[var(--background-end-rgb)]/50 p-4 rounded-xl">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-color)]/80">Add a note (optional)</label>
          <textarea
            value={moodNote}
            onChange={(e) => setMoodNote(e.target.value)}
                    className="w-full p-2 rounded bg-[var(--background-end-rgb)] text-[var(--text-color)] border border-[var(--border-color-rgb)] focus:outline-none focus:border-[var(--primary-accent-rgb)] resize-none"
                    rows={3}
                    placeholder="How are you feeling? What's on your mind?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-color)]/80">Add tags</label>
                  <div className="flex flex-wrap gap-2">
                    {moodTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-[var(--primary-accent-rgb)] text-white'
                            : 'bg-[var(--background-end-rgb)] hover:bg-[var(--border-color-rgb)]/30'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

          <button
            onClick={addMoodEntry}
                  disabled={!currentMood}
                  className={`w-full py-2 rounded-lg text-sm transition-colors ${
                    currentMood
                      ? 'btn-techy'
                      : 'bg-[var(--border-color-rgb)]/30 text-[var(--text-color)]/50 cursor-not-allowed'
                  }`}
                >
                  Save Mood Entry
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-base font-semibold text-[var(--text-color)]/90">Recent Moods</h4>
              <select
                value={moodFilter}
                onChange={(e) => setMoodFilter(e.target.value)}
                className="bg-[var(--background-end-rgb)] border border-[var(--border-color-rgb)] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[var(--primary-accent-rgb)]"
              >
                <option value="all">All Moods</option>
                {emojis.map(({ emoji, label }) => (
                  <option key={emoji} value={emoji}>{label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-3 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
              {filteredMoodEntries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl border border-[var(--border-color-rgb)] bg-[var(--background-end-rgb)]/50 hover:bg-[var(--background-end-rgb)]/70 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{entry.emoji}</span>
                      {entry.activity && (
                        <span className="text-xs px-2 py-1 rounded-full bg-[var(--primary-accent-rgb)]/20 text-[var(--primary-accent-rgb)]">
                          {entry.activity}
                        </span>
                      )}
                      <span className="text-xs px-2 py-1 rounded-full bg-[var(--secondary-accent-rgb)]/20 text-[var(--secondary-accent-rgb)]">
                        Intensity: {entry.intensity}/10
                      </span>
                    </div>
                    <span className="text-xs text-[var(--text-color)]/60">{entry.timestamp}</span>
                  </div>
                  {entry.note && <p className="text-sm text-[var(--text-color)]/90 mb-2">{entry.note}</p>}
                  {entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {entry.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-[var(--border-color-rgb)]/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
          </div>
      </motion.div>

      {/* Quick Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-lg bg-[var(--background-end-rgb)] border border-[var(--border-color-rgb)]"
      >
        <h3 className="text-lg font-semibold mb-4 gradient-text">Quick Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '⏰', text: 'Take regular breaks every 25-30 minutes' },
            { icon: '💧', text: 'Stay hydrated during your breaks' },
            { icon: '🧘', text: 'Use breaks to stretch and move around' },
            { icon: '📊', text: 'Track your mood to identify patterns' }
          ].map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 rounded-lg bg-[var(--primary-accent-rgb)]/10"
            >
              <p className="text-sm">
                <span className="font-medium">{tip.icon}</span> {tip.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BreakZone; 