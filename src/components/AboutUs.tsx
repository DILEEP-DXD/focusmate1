import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AboutUs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const tabs = [
    { id: 'mission', label: 'Our Mission', icon: '🎯' },
    { id: 'developer', label: 'Developer', icon: '👨‍💻' },
    { id: 'values', label: 'Our Values', icon: '💫' },
    { id: 'impact', label: 'Our Impact', icon: '📈' }
  ];

  const developerInfo = {
    name: 'Dileep Kumar',
    role: 'Full Stack Developer',
    education: 'Student at LPU India',
    bio: 'Passionate about creating innovative solutions that make a difference in education.',
    skills: [
      'React & TypeScript',
      'Node.js & Express',
      'UI/UX Design',
      'Problem Solving'
    ],
    social: [
      { platform: 'GitHub', icon: '📱', url: 'https://github.com/yourusername' },
      { platform: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/in/yourusername' },
      { platform: 'Instagram', icon: '📸', url: 'https://instagram.com/yourusername' }
    ]
  };

  const values = [
    {
      title: 'Innovation',
      description: 'Constantly pushing boundaries to create better learning experiences.',
      icon: '💡'
    },
    {
      title: 'Accessibility',
      description: 'Making quality education available to everyone.',
      icon: '🌍'
    },
    {
      title: 'User-Centric',
      description: 'Putting students at the heart of everything we do.',
      icon: '❤️'
    },
    {
      title: 'Excellence',
      description: 'Striving for the highest quality in all aspects.',
      icon: '⭐'
    }
  ];

  const impactStats = [
    { label: 'Active Users', value: '50K+', icon: '👥' },
    { label: 'Study Hours', value: '1M+', icon: '⏰' },
    { label: 'Success Rate', value: '85%', icon: '📈' },
    { label: 'Countries', value: '30+', icon: '🌍' }
  ];

  return (
    <div className="w-full px-4 md:px-0 space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold gradient-text">
          About FocusMate
        </h1>
        <p className="text-lg text-[var(--text-color)]/80 max-w-2xl mx-auto">
          We're on a mission to revolutionize the way students learn and study, 
          making education more engaging, effective, and accessible for everyone.
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center space-x-4"
      >
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-[var(--primary-accent-rgb)] text-white'
                : 'bg-[var(--background-end-rgb)] hover:bg-[var(--border-color-rgb)]/30'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Mission Tab */}
          {activeTab === 'mission' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold gradient-text">Our Story</h3>
                <p className="text-[var(--text-color)]/80">
                  FocusMate was born from a simple observation: students were struggling to maintain focus 
                  and manage their study time effectively. We saw an opportunity to create a solution that 
                  would not only help students study better but also make the process more enjoyable.
                </p>
                <p className="text-[var(--text-color)]/80">
                  Today, we're proud to serve thousands of students worldwide, helping them achieve their 
                  academic goals through our innovative study tools and mindful break system.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[var(--background-end-rgb)] p-6 rounded-lg"
              >
                <h3 className="text-2xl font-semibold mb-4 gradient-text">Our Vision</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <h4 className="font-medium">Personalized Learning</h4>
                      <p className="text-sm text-[var(--text-color)]/80">
                        Creating adaptive learning experiences tailored to each student's needs
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <h4 className="font-medium">Innovation</h4>
                      <p className="text-sm text-[var(--text-color)]/80">
                        Continuously improving our platform with cutting-edge technology
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <h4 className="font-medium">Global Impact</h4>
                      <p className="text-sm text-[var(--text-color)]/80">
                        Making quality education accessible to students worldwide
                      </p>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>
          )}

          {/* Developer Tab */}
          {activeTab === 'developer' && (
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[var(--background-end-rgb)] p-8 rounded-lg"
              >
                <div className="flex flex-col items-center mb-8">
                  <div className="w-32 h-32 rounded-full bg-[var(--primary-accent-rgb)]/20 flex items-center justify-center mb-4">
                    <span className="text-5xl">👨‍💻</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{developerInfo.name}</h3>
                  <p className="text-[var(--primary-accent-rgb)] mb-1">{developerInfo.role}</p>
                  <p className="text-[var(--text-color)]/80 mb-4">{developerInfo.education}</p>
                  <div className="flex space-x-6">
                    {developerInfo.social.map((link) => (
                      <motion.a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-[var(--primary-accent-rgb)] hover:opacity-80 transition-opacity"
                      >
                        <span className="text-2xl">{link.icon}</span>
                        <span className="ml-2">{link.platform}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold mb-3 gradient-text">About Me</h4>
                    <p className="text-[var(--text-color)]/80">
                      {developerInfo.bio}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-3 gradient-text">Skills & Expertise</h4>
                    <div className="flex flex-wrap gap-3">
                      {developerInfo.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 rounded-full bg-[var(--primary-accent-rgb)]/10 text-[var(--primary-accent-rgb)]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-3 gradient-text">Development Journey</h4>
                    <p className="text-[var(--text-color)]/80">
                      As a student at Lovely Professional University, I experienced firsthand the challenges 
                      of modern education. My passion for technology and desire to help fellow students led 
                      me to create FocusMate. I believe in the power of technology to transform education 
                      and make learning more accessible and enjoyable for everyone.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Values Tab */}
          {activeTab === 'values' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[var(--background-end-rgb)] p-6 rounded-lg"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl">{value.icon}</span>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                  </div>
                  <p className="text-[var(--text-color)]/80">{value.description}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Impact Tab */}
          {activeTab === 'impact' && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {impactStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[var(--background-end-rgb)] p-6 rounded-lg text-center"
                  >
                    <span className="text-3xl mb-2 block">{stat.icon}</span>
                    <div className="text-2xl font-bold text-[var(--primary-accent-rgb)]">
                      {stat.value}
                    </div>
                    <div className="text-sm text-[var(--text-color)]/80">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[var(--background-end-rgb)] p-6 rounded-lg"
              >
                <h3 className="text-xl font-semibold mb-4 gradient-text">Student Success Stories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <p className="text-[var(--text-color)]/80">
                      "FocusMate has completely transformed my study routine. The break system helps me stay 
                      focused and the study tools make learning more engaging."
                    </p>
                    <p className="font-medium">- Maria S., University Student</p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[var(--text-color)]/80">
                      "I've seen a significant improvement in my grades since using FocusMate. The adaptive 
                      learning features really help me understand difficult concepts."
                    </p>
                    <p className="font-medium">- James K., High School Student</p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 py-12"
      >
        <h2 className="text-3xl font-bold gradient-text">Join Our Journey</h2>
        <p className="text-[var(--text-color)]/80 max-w-2xl mx-auto">
          Be part of our mission to transform education and help students achieve their full potential.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-techy px-8 py-3 text-lg"
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AboutUs; 