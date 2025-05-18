import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface MoodEntry {
  id: number;
  emoji: string;
  note: string;
  timestamp: string;
}

const MoodTracker: React.FC = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [currentMood, setCurrentMood] = useState('');
  const [moodNote, setMoodNote] = useState('');

  const emojis = ['😊', '😐', '😢', '😡', '😴'];

  const addMoodEntry = () => {
    if (currentMood) {
      const newEntry: MoodEntry = {
        id: Date.now(),
        emoji: currentMood,
        note: moodNote,
        timestamp: new Date().toLocaleString(),
      };
      setMoodEntries([newEntry, ...moodEntries]);
      setCurrentMood('');
      setMoodNote('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="neon-glow p-6 rounded shadow-sm"
    >
      <h3 className="text-xl font-semibold mb-4 gradient-text flex items-center gap-2">
        <span className="text-2xl">😊</span> Mood Tracker
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-around">
          {emojis.map((emoji) => (
            <motion.button
              key={emoji}
              onClick={() => setCurrentMood(emoji)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`text-3xl p-2 rounded-full transition-transform duration-200 ${currentMood === emoji ? 'ring-2 ring-[var(--primary-accent-rgb)] scale-105' : 'opacity-80 hover:opacity-100'}`}
            >
              {emoji}
            </motion.button>
          ))}
        </div>

        <textarea
          value={moodNote}
          onChange={(e) => setMoodNote(e.target.value)}
          placeholder="Add a note about your mood..."
          className="w-full p-3 rounded bg-[var(--background-end-rgb)] border border-[var(--border-color-rgb)] text-[var(--text-color)] placeholder-[var(--text-color)]/60 focus:outline-none focus:border-[var(--primary-accent-rgb)] min-h-[80px] resize-none"
        />

        <button
          onClick={addMoodEntry}
          className="btn-techy w-full py-2 text-sm"
        >
          Log Mood
        </button>

        <div className="mt-6">
          <h4 className="text-base font-semibold text-[var(--text-color)]/90 mb-3">Recent Moods</h4>
          <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
            {moodEntries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded border border-[var(--border-color-rgb)] bg-[var(--background-end-rgb)]"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">{entry.emoji}</span>
                  <span className="text-xs text-[var(--text-color)]/60">{entry.timestamp}</span>
                </div>
                {entry.note && <p className="text-sm text-[var(--text-color)]/90">{entry.note}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MoodTracker; 