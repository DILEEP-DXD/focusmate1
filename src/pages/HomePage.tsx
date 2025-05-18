import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="py-40 md:py-52 lg:py-64 px-4 text-center relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Spotlight Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--primary-accent-rgb)]/5 to-transparent" />
        
        {/* Left Side Element - Floating Cube */}
        <div className="absolute left-[10%] top-1/2 -translate-y-1/2">
          <motion.div
            animate={{
              rotateY: [0, 360],
              rotateX: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-40 h-40 relative"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Cube Faces */}
            <div className="absolute inset-0 border-2 border-[var(--primary-accent-rgb)]/30 bg-[var(--primary-accent-rgb)]/5 backdrop-blur-sm" />
            <div className="absolute inset-0 border-2 border-[var(--primary-accent-rgb)]/30 bg-[var(--primary-accent-rgb)]/5 backdrop-blur-sm" style={{ transform: 'rotateY(90deg) translateZ(20px)' }} />
            <div className="absolute inset-0 border-2 border-[var(--primary-accent-rgb)]/30 bg-[var(--primary-accent-rgb)]/5 backdrop-blur-sm" style={{ transform: 'rotateY(-90deg) translateZ(20px)' }} />
            <div className="absolute inset-0 border-2 border-[var(--primary-accent-rgb)]/30 bg-[var(--primary-accent-rgb)]/5 backdrop-blur-sm" style={{ transform: 'rotateX(90deg) translateZ(20px)' }} />
            <div className="absolute inset-0 border-2 border-[var(--primary-accent-rgb)]/30 bg-[var(--primary-accent-rgb)]/5 backdrop-blur-sm" style={{ transform: 'rotateX(-90deg) translateZ(20px)' }} />
            <div className="absolute inset-0 border-2 border-[var(--primary-accent-rgb)]/30 bg-[var(--primary-accent-rgb)]/5 backdrop-blur-sm" style={{ transform: 'translateZ(20px)' }} />
          </motion.div>
        </div>

        {/* Right Side Element - 3D Sphere */}
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2">
          <motion.div
            animate={{
              rotateY: [0, -360],
              rotateX: [0, -360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-40 h-40 relative"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Sphere Faces */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 border-2 border-[var(--secondary-accent-rgb)]/30 bg-[var(--secondary-accent-rgb)]/5 backdrop-blur-sm rounded-full"
                style={{
                  transform: `
                    rotateY(${i * 30}deg)
                    rotateX(${i * 30}deg)
                    translateZ(20px)
                  `,
                }}
              />
            ))}
            
            {/* Inner Glow */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-4 rounded-full bg-[var(--secondary-accent-rgb)]/20 backdrop-blur-sm"
              style={{
                transform: 'translateZ(10px)',
              }}
            />

            {/* Core Glow */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--secondary-accent-rgb)]/40"
              style={{
                transform: 'translateZ(15px)',
              }}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <motion.h1 
            className="text-6xl md:text-7xl font-bold mb-6 gradient-text relative"
            style={{
              textShadow: '0 0 20px rgba(var(--primary-accent-rgb), 0.3)',
            }}
          >
            <motion.span
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-accent-rgb)] via-[var(--secondary-accent-rgb)] to-[var(--primary-accent-rgb)] bg-[length:200%_auto]"
            >
              FocusMate
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-[var(--text-color)]/90 relative"
            style={{
              textShadow: '0 0 15px rgba(var(--primary-accent-rgb), 0.2)',
            }}
          >
            Study Smart, Stay Lighter
          </motion.p>
        </motion.div>
      </section>

      {/* Detailed Features Section */}
      <section className="py-16 px-4 bg-[var(--card-background-rgb)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease: "easeIn" }}
          className="container mx-auto max-w-4xl"
        >
          <h3 className="text-2xl font-bold mb-8 text-center gradient-text">What You Can Do With FocusMate</h3>
          <ul className="space-y-4">
            <li><strong>Study Tools:</strong> Flashcards and adaptive quizzes to enhance your learning experience.</li>
            <li><strong>Break Zone:</strong> Take mindful breaks with guided activities and mood tracking.</li>
            <li><strong>Progress Tracking:</strong> Monitor your study hours, completed sessions, and quiz scores.</li>
          </ul>
        </motion.div>
      </section>

      {/* Features Overview - Stacked Layout */}
      <section className="py-20 px-4 bg-[var(--background-end-rgb)]/50">
        <div className="container mx-auto max-w-md">
           <h2 className="text-3xl font-bold mb-12 text-center gradient-text">Explore Features</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, ease: "easeIn" }}
            className="flex flex-col space-y-8"
          >
            {/* Study Tools Card */}
            <motion.div className="neon-glow p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="text-4xl mb-4 text-[var(--primary-accent-rgb)]">📚</div>
              <h3 className="text-xl font-semibold mb-3">Study Tools</h3>
              <p className="text-[var(--text-color)]/80 mb-6">
                Boost your learning with interactive flashcards and adaptive quizzes.
              </p>
              <Link to="/study-tools" className="btn-techy px-6 py-2 text-base">
                Go to Study Tools
              </Link>
            </motion.div>

            {/* Break Zone Card */}
            <motion.div className="neon-glow p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="text-4xl mb-4 text-[var(--primary-accent-rgb)]">⏰</div>
              <h3 className="text-xl font-semibold mb-3">Break Zone</h3>
              <p className="text-[var(--text-color)]/80 mb-6">
                Take effective breaks with guided activities and a stress relief timer.
              </p>
               <Link to="/break-zone" className="btn-techy px-6 py-2 text-base">
                Go to Break Zone
              </Link>
            </motion.div>

            {/* Dashboard Card */}
            <motion.div className="neon-glow p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="text-4xl mb-4 text-[var(--primary-accent-rgb)]">📊</div>
              <h3 className="text-xl font-semibold mb-3">Learning Dashboard</h3>
              <p className="text-[var(--text-color)]/80 mb-6">
                Track your progress, view statistics, and monitor your learning journey.
              </p>
              <Link to="/dashboard" className="btn-techy px-6 py-2 text-base">
                View Dashboard
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-32 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--background-end-rgb)] to-[var(--card-background-rgb)] opacity-50" />
        <div className="absolute inset-0 backdrop-blur-sm" />
        
        {/* Animated Background Circles */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[var(--primary-accent-rgb)]/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[var(--secondary-accent-rgb)]/20 blur-3xl"
        />

        <div className="container mx-auto max-w-5xl relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: "easeIn" }}
            className="text-center"
          >
            <h2 className="text-5xl font-bold mb-6 gradient-text drop-shadow-[0_0_10px_rgba(100,149,237,0.4)]">
              Join the FocusMate Community!
            </h2>
            <p className="text-xl text-[var(--text-color)]/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              FocusMate is a free, open-source project built to help students succeed. 
              Start using our tools today and contribute to a supportive learning environment.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-xl bg-[var(--card-background-rgb)]/50 backdrop-blur-sm border border-[var(--primary-accent-rgb)]/20"
              >
                <div className="text-3xl mb-4">🎓</div>
                <h3 className="text-lg font-semibold mb-2 gradient-text">Smart Learning</h3>
                <p className="text-[var(--text-color)]/80 text-sm">
                  Access powerful study tools designed to enhance your learning experience
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-xl bg-[var(--card-background-rgb)]/50 backdrop-blur-sm border border-[var(--primary-accent-rgb)]/20"
              >
                <div className="text-3xl mb-4">🤝</div>
                <h3 className="text-lg font-semibold mb-2 gradient-text">Community Support</h3>
                <p className="text-[var(--text-color)]/80 text-sm">
                  Join a community of learners and share your journey to success
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-xl bg-[var(--card-background-rgb)]/50 backdrop-blur-sm border border-[var(--primary-accent-rgb)]/20"
              >
                <div className="text-3xl mb-4">🚀</div>
                <h3 className="text-lg font-semibold mb-2 gradient-text">Continuous Growth</h3>
                <p className="text-[var(--text-color)]/80 text-sm">
                  Track your progress and watch your learning journey evolve
                </p>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-techy px-8 py-4 text-lg font-semibold flex items-center gap-2"
              >
                <span>Get Started</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-lg font-semibold rounded-full border-2 border-[var(--primary-accent-rgb)] text-[var(--primary-accent-rgb)] hover:bg-[var(--primary-accent-rgb)]/10 transition-colors flex items-center gap-2"
              >
                <span>Learn More</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Social Proof */}
            <div className="mt-16 flex flex-col items-center">
              <p className="text-[var(--text-color)]/60 text-sm mb-4">Trusted by students worldwide</p>
              <div className="flex gap-8 items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-2xl opacity-60 hover:opacity-100 transition-opacity"
                >
                  🎓
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-2xl opacity-60 hover:opacity-100 transition-opacity"
                >
                  📚
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-2xl opacity-60 hover:opacity-100 transition-opacity"
                >
                  🌟
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;