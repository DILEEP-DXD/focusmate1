import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthFormPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}

const AuthFormPopup: React.FC<AuthFormPopupProps> = ({ isVisible, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await onLogin(email, password);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setEmail('');
    setPassword('');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-[var(--primary-accent-rgb)] text-white flex items-center justify-center shadow-lg hover:bg-[var(--primary-accent-rgb)]/90 transition-colors"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            {/* Form Container */}
            <div className="bg-[var(--background-end-rgb)] rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="p-6 text-center border-b border-[var(--primary-accent-rgb)]/20">
                <h2 className="text-2xl font-bold gradient-text mb-2">
                  {isLogin ? 'Welcome Back!' : 'Create Account'}
                </h2>
                <p className="text-[var(--text-color)]/70">
                  {isLogin
                    ? 'Sign in to continue your learning journey'
                    : 'Join FocusMate to start learning smarter'}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--text-color)]/80"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background-end-rgb)] border border-[var(--primary-accent-rgb)]/20 text-[var(--text-color)] focus:outline-none focus:border-[var(--primary-accent-rgb)] transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[var(--text-color)]/80"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background-end-rgb)] border border-[var(--primary-accent-rgb)]/20 text-[var(--text-color)] focus:outline-none focus:border-[var(--primary-accent-rgb)] transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-[var(--text-color)]/80"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      className="w-full px-4 py-3 rounded-lg bg-[var(--background-end-rgb)] border border-[var(--primary-accent-rgb)]/20 text-[var(--text-color)] focus:outline-none focus:border-[var(--primary-accent-rgb)] transition-colors"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-techy py-3 text-lg font-semibold relative"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
                    />
                  ) : (
                    isLogin ? 'Sign In' : 'Create Account'
                  )}
                </motion.button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-[var(--primary-accent-rgb)] hover:opacity-80 transition-opacity text-sm"
                  >
                    {isLogin
                      ? "Don't have an account? Sign up"
                      : 'Already have an account? Sign in'}
                  </button>
                </div>
              </form>

              {/* Social Login */}
              <div className="p-6 border-t border-[var(--primary-accent-rgb)]/20">
                <div className="text-center mb-4">
                  <span className="text-[var(--text-color)]/60 text-sm">Or continue with</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--background-end-rgb)] border border-[var(--primary-accent-rgb)]/20 text-[var(--text-color)] hover:bg-[var(--primary-accent-rgb)]/10 transition-colors"
                  >
                    <span className="text-xl">📱</span>
                    <span>Google</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--background-end-rgb)] border border-[var(--primary-accent-rgb)]/20 text-[var(--text-color)] hover:bg-[var(--primary-accent-rgb)]/10 transition-colors"
                  >
                    <span className="text-xl">💼</span>
                    <span>GitHub</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthFormPopup; 