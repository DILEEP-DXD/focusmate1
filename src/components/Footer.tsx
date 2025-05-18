import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Study Tools', path: '/study-tools' },
      { label: 'Break Zone', path: '/break-zone' },
      { label: 'Dashboard', path: '/dashboard' },
    ],
    company: [
      { label: 'About Us', path: '/about-us' },
      { label: 'Contact', path: '/contact' },
      { label: 'Blog', path: '/blog' },
    ],
    support: [
      { label: 'Help Center', path: '/help' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
    ],
    social: [
      { label: 'GitHub', icon: '📱', url: 'https://github.com/yourusername' },
      { label: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/in/yourusername' },
      { label: 'Instagram', icon: '📸', url: 'https://instagram.com/yourusername' },
    ],
  };

  return (
    <footer className="bg-[var(--background-end-rgb)]/80 backdrop-blur-sm border-t border-[var(--primary-accent-rgb)]/20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold gradient-text"
            >
              FocusMate
            </motion.div>
            <p className="text-[var(--text-color)]/70 text-sm">
              Empowering students with smart study tools and mindful breaks for better learning outcomes.
            </p>
            <div className="flex space-x-4">
              {footerLinks.social.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[var(--primary-accent-rgb)] hover:opacity-80 transition-opacity"
                >
                  <span className="text-xl">{link.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-[var(--text-color)]/70 hover:text-[var(--primary-accent-rgb)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-[var(--text-color)]/70 hover:text-[var(--primary-accent-rgb)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-[var(--text-color)]/70 hover:text-[var(--primary-accent-rgb)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-[var(--primary-accent-rgb)]/20 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-4 gradient-text">Stay Updated</h3>
            <p className="text-[var(--text-color)]/70 mb-4">
              Subscribe to our newsletter for the latest updates and study tips.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-[var(--background-end-rgb)] border border-[var(--primary-accent-rgb)]/20 text-[var(--text-color)] focus:outline-none focus:border-[var(--primary-accent-rgb)]"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-techy px-6 py-2"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--primary-accent-rgb)]/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[var(--text-color)]/60 text-sm">
              © {currentYear} FocusMate. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="text-[var(--text-color)]/60 hover:text-[var(--primary-accent-rgb)] text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-[var(--text-color)]/60 hover:text-[var(--primary-accent-rgb)] text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/contact"
                className="text-[var(--text-color)]/60 hover:text-[var(--primary-accent-rgb)] text-sm transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 