import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onGetStartedClick: () => void;
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onGetStartedClick, onLoginClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/study-tools', label: 'Study Tools' },
    { to: '/break-zone', label: 'Break Zone' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/about-us', label: 'About Us' }
  ];

  // Placeholder for potential search functionality if needed later
  const handleSearchIconClick = () => {
      console.log('Search icon clicked - implement search functionality.');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 ${
        isScrolled ? 'bg-[var(--background-end-rgb)]/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-24">
        {/* Logo and Search Icon */}
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold gradient-text cursor-pointer"
          >
            <Link to="/">FocusMate</Link>
          </motion.div>
          {/* Circular Search Icon */}
          <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSearchIconClick}
              className="p-2 rounded-full bg-[var(--card-background-rgb)] border border-[var(--primary-accent-rgb)]/20 hover:bg-[var(--primary-accent-rgb)]/10 transition-colors"
              aria-label="Search"
            >
              🔍
            </motion.button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
          {navItems.map((link) => (
            <motion.div
              key={link.to}
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <Link
                to={link.to}
                className={`navbar-link text-sm font-medium ${
                  location.pathname === link.to ? 'active' : ''
                }`}
              >
                {link.label}
              </Link>
              {location.pathname === link.to && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--primary-accent-rgb)]"
                  />
                )}
            </motion.div>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Switcher */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-full bg-[var(--card-background-rgb)] border border-[var(--primary-accent-rgb)]/20 hover:bg-[var(--primary-accent-rgb)]/10 transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? (
              <svg
                className="w-5 h-5 text-[var(--primary-accent-rgb)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-[var(--primary-accent-rgb)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </motion.button>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-[var(--primary-accent-rgb)] text-[var(--primary-color)] px-6 py-2 text-sm rounded-full transition-colors duration-200 hover:bg-[var(--primary-accent-rgb)] hover:text-white font-semibold uppercase tracking-wider text-center"
            onClick={onLoginClick}
          >
            Login
          </motion.button>
          {/* Get Started Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-techy px-6 py-2 text-sm text-center border border-transparent"
            onClick={onGetStartedClick}
          >
            Get Started
          </motion.button>
           {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full bg-[var(--card-background-rgb)] border border-[var(--primary-accent-rgb)]/20"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--background-end-rgb)]/95 backdrop-blur-lg border-t border-[var(--primary-accent-rgb)]/20"
          >
            

            {/* Mobile Navigation */}
            <div className="px-4 py-4 space-y-2">
              {navItems.map((link) => (
                <motion.div
                  key={link.to}
                  whileHover={{ scale: 1.02 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2 text-base font-medium py-2 ${
                      location.pathname === link.to ? 'text-[var(--primary-accent-rgb)]' : ''
                    }`}
                  >
                    
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Action Buttons */}
              <div className="flex flex-col gap-2 pt-4 border-t border-[var(--primary-accent-rgb)]/20">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full border border-[var(--primary-accent-rgb)] text-[var(--primary-color)] px-6 py-2 text-base rounded-full transition-colors duration-200 hover:bg-[var(--primary-accent-rgb)] hover:text-white font-semibold"
                  onClick={() => {
                    onLoginClick();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-techy px-6 py-2 text-base rounded-full"
                  onClick={() => {
                    onGetStartedClick();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Get Started
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 