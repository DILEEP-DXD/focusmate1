import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Flashcard {
  id: number;
  term: string;
  definition: string;
  topic: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

interface QuizStats {
  correctAnswers: number;
  totalQuestions: number;
  topicPerformance: { [key: string]: { correct: number; total: number } };
  difficultyPerformance: { [key: string]: { correct: number; total: number } };
}

const StudyTools: React.FC = () => {
  const allFlashcards: Flashcard[] = [
    // Computers
    { id: 1, term: 'CPU', definition: "The brain of your computer. It processes all instructions and calculations, making your computer work.", topic: 'Computers' },
    { id: 2, term: 'RAM', definition: "Your computer's short-term memory. It temporarily stores data that your CPU needs to access quickly.", topic: 'Computers' },
    { id: 3, term: 'HTTP', definition: "The language of the web. It's how your browser communicates with websites to load pages and content.", topic: 'Computers' },
    
    // Geography
    { id: 4, term: 'Mount Everest', definition: "The world's highest peak at 29,029 feet. Located in the Himalayas between Nepal and China.", topic: 'Geography' },
    { id: 5, term: 'Amazon River', definition: "The world's largest river by water volume. Flows through South America and contains 20% of Earth's freshwater.", topic: 'Geography' },
    { id: 6, term: 'Great Barrier Reef', definition: "The world's largest living structure. A coral reef system off Australia's coast, visible from space.", topic: 'Geography' },

    // Politics
    { id: 7, term: 'Democracy', definition: "A system where power comes from the people. Citizens vote to choose their leaders and make decisions.", topic: 'Politics' },
    { id: 8, term: 'Capitalism', definition: "An economic system where private businesses own resources and compete in a free market.", topic: 'Capitalism' },
    { id: 9, term: 'United Nations', definition: "A global organization of 193 countries working together for peace, security, and international cooperation.", topic: 'Politics' },

    // Nature
    { id: 10, term: 'Photosynthesis', definition: "How plants make food. They use sunlight to convert water and carbon dioxide into energy and oxygen.", topic: 'Nature' },
    { id: 11, term: 'Biodiversity', definition: "The variety of life on Earth. Includes all plants, animals, and microorganisms in different ecosystems.", topic: 'Nature' },
    { id: 12, term: 'Ecosystem', definition: "A community of living things and their environment. Everything works together in a balanced system.", topic: 'Nature' },

    // Space
    { id: 13, term: 'Milky Way', definition: "Our home galaxy. A spiral galaxy containing our solar system and billions of other stars.", topic: 'Space' },
    { id: 14, term: 'Black Hole', definition: "A space region with gravity so strong nothing can escape, not even light. Formed from collapsed stars.", topic: 'Space' },
    { id: 15, term: 'Andromeda Galaxy', definition: "Our nearest large galaxy neighbor. Will collide with the Milky Way in about 4.5 billion years.", topic: 'Space' },
  ];

  const topics = ['All Topics', 'Computers', 'Geography', 'Politics', 'Nature', 'Space'];
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>(allFlashcards);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [newTerm, setNewTerm] = useState('');
  const [newDefinition, setNewDefinition] = useState('');

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);

  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizStats, setQuizStats] = useState<QuizStats>({
    correctAnswers: 0,
    totalQuestions: 0,
    topicPerformance: {},
    difficultyPerformance: {}
  });
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Add new state for option animations
  const [optionAnimations, setOptionAnimations] = useState<{ [key: string]: boolean }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Timer effect for questions
  useEffect(() => {
    if (quizStarted && !quizCompleted && !showFeedback) {
      setTimeLeft(30); // 30 seconds per question
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === null || prev <= 0) {
            clearInterval(timer);
            handleTimeUp();
            return null;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentQuestionIndex, quizStarted, quizCompleted, showFeedback]);

  const handleTimeUp = () => {
    setShowFeedback(true);
    setSelectedAnswer('');
    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };

  const handleOptionHover = (option: string) => {
    setOptionAnimations(prev => ({
      ...prev,
      [option]: true
    }));
  };

  const handleOptionLeave = (option: string) => {
    setOptionAnimations(prev => ({
      ...prev,
      [option]: false
    }));
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    setTimeLeft(null);

    const isCorrect = answer === quizQuestions[currentQuestionIndex].correctAnswer;
    const currentTopic = quizQuestions[currentQuestionIndex].topic;
    const currentDifficulty = quizQuestions[currentQuestionIndex].difficulty;

    // Update stats
    setQuizStats(prev => {
      const newStats = { ...prev };
      newStats.totalQuestions++;
      if (isCorrect) {
        newStats.correctAnswers++;
        
        // Update topic performance
        if (!newStats.topicPerformance[currentTopic]) {
          newStats.topicPerformance[currentTopic] = { correct: 0, total: 0 };
        }
        newStats.topicPerformance[currentTopic].correct++;
        newStats.topicPerformance[currentTopic].total++;

        // Update difficulty performance
        if (!newStats.difficultyPerformance[currentDifficulty]) {
          newStats.difficultyPerformance[currentDifficulty] = { correct: 0, total: 0 };
        }
        newStats.difficultyPerformance[currentDifficulty].correct++;
        newStats.difficultyPerformance[currentDifficulty].total++;
      }
      return newStats;
    });

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Show explanation briefly
    setShowExplanation(true);
    setTimeout(() => {
      setShowExplanation(false);
      setShowFeedback(false);
      setSelectedAnswer('');

      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const handleNextCard = () => {
    setShowDefinition(false);
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevCard = () => {
    setShowDefinition(false);
    setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleTopicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const topic = event.target.value;
    setSelectedTopic(topic);
    if (topic === 'All Topics') {
      setFlashcards(allFlashcards);
    } else {
      setFlashcards(allFlashcards.filter(card => card.topic === topic));
    }
    setCurrentCardIndex(0); // Reset to the first card of the new topic
    setShowDefinition(false); // Hide definition for the new card
  };

  const handleAddFlashcard = () => {
    if (!newTopic || !newTerm || !newDefinition) {
      alert('Please fill in all fields');
      return;
    }

    const newFlashcard: Flashcard = {
      id: flashcards.length + 1,
      term: newTerm,
      definition: newDefinition,
      topic: newTopic
    };

    setFlashcards([...flashcards, newFlashcard]);
    
    // Add new topic to topics list if it doesn't exist
    if (!topics.includes(newTopic)) {
      topics.push(newTopic);
    }

    // Reset form
    setNewTerm('');
    setNewDefinition('');
    setShowAddForm(false);
  };

  // Generate quiz questions from flashcards
  const generateQuizQuestions = (flashcards: Flashcard[], count: number = 5) => {
    const questions: QuizQuestion[] = [];
    const usedFlashcards = new Set<number>();

    while (questions.length < count && usedFlashcards.size < flashcards.length) {
      const randomIndex = Math.floor(Math.random() * flashcards.length);
      if (usedFlashcards.has(randomIndex)) continue;

      const flashcard = flashcards[randomIndex];
      usedFlashcards.add(randomIndex);

      // Generate wrong options from other flashcards
      const wrongOptions = flashcards
        .filter((_, index) => !usedFlashcards.has(index))
        .map(f => f.definition)
        .slice(0, 3);

      // Shuffle options
      const options = [...wrongOptions, flashcard.definition].sort(() => Math.random() - 0.5);

      questions.push({
        id: questions.length + 1,
        question: `What is the definition of "${flashcard.term}"?`,
        options,
        correctAnswer: flashcard.definition,
        difficulty: 'medium',
        topic: flashcard.topic
      });
    }

    return questions;
  };

  // Start a new quiz
  const startQuiz = () => {
    const questions = generateQuizQuestions(flashcards, 5);
    setQuizQuestions(questions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizStarted(true);
    setQuizCompleted(false);
    setSelectedAnswer('');
    setShowFeedback(false);
  };

  // Calculate performance metrics
  const calculatePerformance = () => {
    const totalCorrect = quizStats.correctAnswers;
    const totalQuestions = quizStats.totalQuestions;
    const accuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

    // Calculate topic-wise performance
    const topicPerformance = Object.entries(quizStats.topicPerformance).map(([topic, stats]) => ({
      topic,
      accuracy: (stats.correct / stats.total) * 100
    }));

    return { accuracy, topicPerformance };
  };

  return (
    <div className="w-full px-2 md:px-0 space-y-8">
      {/* Flashcards Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 1.0, ease: "easeIn" }}
        className="neon-glow p-6 rounded shadow-sm flex flex-col min-h-[400px]"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold gradient-text flex items-center gap-2">
            <span className="text-2xl">📚</span> Flashcards
          </h3>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-techy px-4 py-2 text-sm"
          >
            {showAddForm ? 'Cancel' : 'Add New Flashcard'}
          </button>
        </div>

        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-[var(--background-end-rgb)] rounded-lg"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Topic</label>
                <input
                  type="text"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="Enter topic name"
                  className="w-full p-2 rounded bg-[var(--background-end-rgb)] text-[var(--text-color)] border border-[var(--border-color-rgb)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Term</label>
                <input
                  type="text"
                  value={newTerm}
                  onChange={(e) => setNewTerm(e.target.value)}
                  placeholder="Enter term"
                  className="w-full p-2 rounded bg-[var(--background-end-rgb)] text-[var(--text-color)] border border-[var(--border-color-rgb)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Definition</label>
                <textarea
                  value={newDefinition}
                  onChange={(e) => setNewDefinition(e.target.value)}
                  placeholder="Enter definition"
                  className="w-full p-2 rounded bg-[var(--background-end-rgb)] text-[var(--text-color)] border border-[var(--border-color-rgb)]"
                  rows={3}
                />
              </div>
              <button
                onClick={handleAddFlashcard}
                className="btn-techy px-4 py-2 text-sm w-full"
              >
                Add Flashcard
              </button>
            </div>
          </motion.div>
        )}

        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="mb-4 text-center">
            <div className="mb-4">
              <label htmlFor="topic-select" className="block text-md font-semibold text-[var(--text-color)] mb-2">Select Topic:</label>
              <select
                id="topic-select"
                value={selectedTopic}
                onChange={handleTopicChange}
                className="p-2 rounded bg-[var(--background-end-rgb)] text-[var(--text-color)] border border-[var(--border-color-rgb)]"
              >
                {topics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>
             <p className="text-sm font-semibold gradient-text">Current Topic: {selectedTopic === 'All Topics' ? flashcards[currentCardIndex]?.topic || 'N/A' : selectedTopic}</p>
          </div>
          <motion.div
            className="w-full max-w-lg perspective-1000 cursor-pointer"
            onClick={() => setShowDefinition(!showDefinition)}
          >
            <div className={`relative w-full h-64 card-flip ${showDefinition ? 'flipped' : ''}`}>
              <div className="card-face card-face-front absolute w-full h-full backface-hidden">
                <div className="w-full h-full bg-[var(--background-end-rgb)] rounded-lg shadow-lg p-8 flex items-center justify-center">
                  <p className="text-2xl font-semibold text-[var(--primary-accent-rgb)] text-center transition-colors duration-300">
                    {flashcards.length > 0 ? flashcards[currentCardIndex].term : 'No Flashcards Available'}
                  </p>
                </div>
              </div>
              <div className="card-face card-face-back absolute w-full h-full backface-hidden rotate-y-180">
                <div className="w-full h-full neon-glow rounded-lg shadow-lg p-8 flex flex-col items-center justify-center">
                  
                  <div className="w-full h-px bg-[var(--primary-accent-rgb)]/30 my-2"></div>
                  <p className="text-base text-[var(--primary-accent-rgb)] text-center">
                    {flashcards.length > 0 ? flashcards[currentCardIndex].definition : 'Select a topic or add flashcards.'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={handlePrevCard}
              className="btn-techy px-4 py-2 text-sm"
              disabled={flashcards.length === 0}
            >
              Previous
            </button>
            <button
              onClick={handleNextCard}
              className="btn-techy px-4 py-2 text-sm"
              disabled={flashcards.length === 0}
            >
              Next
            </button>
          </div>
           {flashcards.length === 0 && (
            <p className="text-base text-red-500 mt-4">No flashcards found for this topic.</p>
          )}
        </div>
      </motion.div>

      {/* Flashcards Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--background-end-rgb)] p-6 rounded-lg shadow-sm"
      >
        <h4 className="text-xl font-semibold mb-4 gradient-text flex items-center gap-2">
          <span className="text-2xl">💡</span> About Flashcards
        </h4>
        <div className="space-y-4 text-[var(--text-color)]/90">
          <p>
            Flashcards are a powerful learning tool that helps you memorize and understand concepts through active recall. 
            Our flashcard system is designed to help you learn more effectively.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[var(--card-background-rgb)] rounded-lg">
              <h5 className="font-semibold mb-2 text-[var(--primary-accent-rgb)]">Tips for Effective Learning</h5>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Review cards regularly for better retention</li>
                <li>Create your own cards for personalized learning</li>
                <li>Focus on understanding, not just memorization</li>
                <li>Use the cards in both directions (term to definition and vice versa)</li>
              </ul>
            </div>
            <div className="p-4 bg-[var(--card-background-rgb)] rounded-lg">
              <h5 className="font-semibold mb-2 text-[var(--primary-accent-rgb)]">Best Practices</h5>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Keep definitions clear and concise</li>
                <li>Group related cards by topics</li>
                <li>Add examples to make concepts clearer</li>
                <li>Review difficult cards more frequently</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quiz Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 1.0, ease: "easeIn" }}
        className="neon-glow p-6 rounded shadow-sm flex flex-col min-h-[400px]"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold gradient-text flex items-center gap-2">
            <span className="text-2xl">❓</span> Adaptive Quiz
          </h3>
          {!quizStarted && (
            <button
              onClick={startQuiz}
              className="btn-techy px-4 py-2 text-sm hover:scale-105 transition-transform"
            >
              Start Quiz
            </button>
          )}
        </div>

        {quizStarted && !quizCompleted && (
          <div className="flex-1 flex flex-col">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Progress:</span>
                  <div className="w-48 bg-[var(--background-end-rgb)] rounded-full h-2">
                    <motion.div
                      className="bg-[var(--primary-accent-rgb)] h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentQuestionIndex / quizQuestions.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
                {timeLeft !== null && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Time:</span>
                    <span className={`text-sm ${timeLeft <= 10 ? 'text-red-500' : ''}`}>
                      {timeLeft}s
                    </span>
                  </div>
                )}
              </div>
              <div className="flex justify-between text-sm text-[var(--text-color)]/80">
                <p>Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
                <p>Score: {score}</p>
              </div>
            </div>

            <div className="flex-1">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6"
              >
                <p className="text-lg font-medium text-[var(--text-color)]">
                  {quizQuestions[currentQuestionIndex].question}
                </p>
              </motion.div>

              <div className="space-y-4">
                {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    onMouseEnter={() => handleOptionHover(option)}
                    onMouseLeave={() => handleOptionLeave(option)}
                    disabled={showFeedback}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={optionAnimations[option] ? { x: [0, 5, 0] } : {}}
                    className={`w-full p-4 rounded-lg text-left transition-all duration-200 relative overflow-hidden group ${
                      showFeedback
                        ? option === quizQuestions[currentQuestionIndex].correctAnswer
                          ? 'bg-green-500/20 ring-2 ring-green-500'
                          : selectedAnswer === option
                          ? 'bg-red-500/20 ring-2 ring-red-500'
                          : 'bg-[var(--background-end-rgb)]'
                        : 'bg-[var(--background-end-rgb)] hover:bg-[var(--border-color-rgb)]/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-medium text-[var(--primary-accent-rgb)]">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{option}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--primary-accent-rgb)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                ))}
              </div>

              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-lg bg-[var(--background-end-rgb)]"
                >
                  <p className="text-sm text-[var(--text-color)]/80">
                    {selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer
                      ? "Correct! Well done!"
                      : `Incorrect. The correct answer is: ${quizQuestions[currentQuestionIndex].correctAnswer}`}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {quizCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center"
          >
            <h4 className="text-2xl font-semibold mb-4 gradient-text">Quiz Completed!</h4>
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold text-[var(--primary-accent-rgb)] mb-2"
              >
                {score}/{quizQuestions.length}
              </motion.div>
              <p className="text-[var(--text-color)]/80">
                Accuracy: {calculatePerformance().accuracy.toFixed(1)}%
              </p>
            </div>
            <div className="w-full max-w-md mb-6">
              <h5 className="text-lg font-semibold mb-3">Topic Performance</h5>
              {calculatePerformance().topicPerformance.map(({ topic, accuracy }) => (
                <motion.div
                  key={topic}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-3"
                >
                  <div className="flex justify-between mb-1">
                    <span>{topic}</span>
                    <span>{accuracy.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-[var(--background-end-rgb)] rounded-full h-2">
                    <motion.div
                      className="bg-[var(--primary-accent-rgb)] h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${accuracy}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.button
              onClick={startQuiz}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-techy px-6 py-2"
            >
              Try Again
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Quiz Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--background-end-rgb)] p-6 rounded-lg shadow-sm"
      >
        <h4 className="text-xl font-semibold mb-4 gradient-text flex items-center gap-2">
          <span className="text-2xl">🎯</span> About Adaptive Quiz
        </h4>
        <div className="space-y-4 text-[var(--text-color)]/90">
          <p>
            Our adaptive quiz system is designed to help you test your knowledge and identify areas that need more attention. 
            The system adapts to your performance and provides personalized feedback.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[var(--card-background-rgb)] rounded-lg">
              <h5 className="font-semibold mb-2 text-[var(--primary-accent-rgb)]">How It Works</h5>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Questions are generated from your flashcards</li>
                <li>30-second time limit per question</li>
                <li>Immediate feedback on answers</li>
                <li>Performance tracking by topic</li>
              </ul>
            </div>
            <div className="p-4 bg-[var(--card-background-rgb)] rounded-lg">
              <h5 className="font-semibold mb-2 text-[var(--primary-accent-rgb)]">Tips for Success</h5>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Read questions carefully</li>
                <li>Manage your time effectively</li>
                <li>Review incorrect answers</li>
                <li>Focus on weak topics</li>
              </ul>
            </div>
            <div className="p-4 bg-[var(--card-background-rgb)] rounded-lg">
              <h5 className="font-semibold mb-2 text-[var(--primary-accent-rgb)]">Performance Tracking</h5>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Track progress by topic</li>
                <li>Monitor accuracy rates</li>
                <li>Identify improvement areas</li>
                <li>Set learning goals</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-4 bg-[var(--card-background-rgb)] rounded-lg">
            <h5 className="font-semibold mb-2 text-[var(--primary-accent-rgb)]">Learning Strategy</h5>
            <p className="text-sm">
              Combine flashcards and quizzes for optimal learning. Use flashcards for initial learning and review, 
              then test your knowledge with quizzes. Review your quiz results to identify areas that need more attention, 
              and create new flashcards for those topics. This cycle of learning, testing, and reviewing will help you 
              master the material more effectively.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudyTools; 