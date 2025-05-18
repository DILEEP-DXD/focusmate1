import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthFormPopup from './components/AuthFormPopup';
import BackToTop from './components/BackToTop';
import { ThemeProvider } from './context/ThemeContext';

const HomePage = lazy(() => import('./pages/HomePage'));
const StudyToolsPage = lazy(() => import('./pages/StudyToolsPage'));
const BreakZonePage = lazy(() => import('./pages/BreakZonePage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));

const App: React.FC = () => {
  const location = useLocation();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const openPopup = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  // Simulated login for front-end design
  const handleLogin = (email: string, password: string) => {
    console.log('App: handleLogin called with email:', email, 'and password:', password);
   
    if (email === 'user@example.com' && password === 'password') {
      closePopup();
    } else {
      alert('Simulated login failed. Use user@example.com and password'); // Simple feedback
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-b from-[var(--background-start-rgb)] to-[var(--background-end-rgb)] text-[var(--text-color)]">
        <Navbar onGetStartedClick={openPopup} onLoginClick={openPopup} />
        
        <main className="pt-40">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/study-tools" element={<StudyToolsPage />} />
              <Route path="/break-zone" element={<BreakZonePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              {/* <Route path="/mood-tracker" element={<MoodTrackerPage />} /> */}
              {/* Add more routes for other pages here */}
              <Route path="/about-us" element={<AboutUsPage />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <BackToTop />
        <AuthFormPopup isVisible={isPopupVisible} onClose={closePopup} onLogin={handleLogin} />
      </div>
    </ThemeProvider>
  );
};

export default App;
