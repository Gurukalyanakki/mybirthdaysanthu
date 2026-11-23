import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import CountdownPage from './pages/CountdownPage';
import BirthdayPage from './pages/BirthdayPage';
import MemoriesPage from './pages/MemoriesPage';
import SecretLock from './components/SecretLock';
import MusicToggle from './components/MusicToggle';
import FloatingHearts from './components/FloatingHearts';
import BackToTop from './components/BackToTop';

export default function App() {
  const [currentPage, setCurrentPage] = useState('countdown');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSecretOpen, setIsSecretOpen] = useState(false);

  // Restore unlock state from localStorage only if the passcode was entered previously
  useEffect(() => {
    try {
      const saved = localStorage.getItem('santhoshi_birthday_unlocked');
      if (saved === 'true') {
        setIsUnlocked(true);
      }
    } catch {}
  }, []);

  const handleUnlockSuccess = () => {
    setIsUnlocked(true);
    setIsSecretOpen(false);
    // Smooth navigation to Page 2 (Wishes) upon unlocking!
    setCurrentPage('wishes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLock = () => {
    try {
      localStorage.removeItem('santhoshi_birthday_unlocked');
    } catch {}
    setIsUnlocked(false);
    setCurrentPage('countdown');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page) => {
    // Both before AND after countdown completes, entering the passcode is required to unlock!
    if ((page === 'wishes' || page === 'memories') && !isUnlocked) {
      setIsSecretOpen(true);
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Ambient background glow orbs */}
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
      <div className="ambient-orb ambient-orb-3" />

      {/* Floating hearts & cursor particle trails */}
      <FloatingHearts />

      {/* Background music controller */}
      <MusicToggle />

      {/* Smooth back to top */}
      <BackToTop />

      {/* Secret Passcode Modal (Code: 042406) */}
      <SecretLock
        isOpen={isSecretOpen}
        onClose={() => setIsSecretOpen(false)}
        onUnlockSuccess={handleUnlockSuccess}
      />

      {/* Top Navbar with Lock / Unlock controls */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isUnlocked={isUnlocked}
        onOpenSecret={() => setIsSecretOpen(true)}
        onLock={handleLock}
      />

      {/* Main Content Area with Page Transitions */}
      <main className="container-romantic">
        <AnimatePresence mode="wait">
          {currentPage === 'countdown' && (
            <CountdownPage
              key="countdown"
              isUnlocked={isUnlocked}
              onOpenSecret={() => setIsSecretOpen(true)}
              onNavigateToWishes={() => handleNavigate('wishes')}
              onLock={handleLock}
            />
          )}

          {currentPage === 'wishes' && (
            <BirthdayPage
              key="wishes"
              onNavigateToMemories={() => handleNavigate('memories')}
            />
          )}

          {currentPage === 'memories' && (
            <MemoriesPage
              key="memories"
            />
          )}
        </AnimatePresence>
      </main>

      {/* Gentle Romantic Footer */}
      <footer
        style={{
          textAlign: 'center',
          padding: '40px 16px 30px 16px',
          color: 'var(--text-muted)',
          fontSize: '0.88rem',
          position: 'relative',
          zIndex: 1
        }}
      >
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          Crafted with endless love & care for Santhoshi's 20th Birthday 💗
        </p>
        <p style={{ marginTop: '6px', fontSize: '0.8rem', opacity: 0.75 }}>
          November 24, 2026 • Forever Cherished
        </p>
      </footer>
    </div>
  );
}
