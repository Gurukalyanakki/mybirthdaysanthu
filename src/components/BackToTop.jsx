import React, { useState, useEffect } from 'react';
import { ArrowUp, Heart } from 'lucide-react';

/**
 * BackToTop Component
 * Smooth scrolls back to top with romantic floating button
 */
export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Scroll back to top"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 900,
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.9)',
        border: '1.5px solid var(--color-rose-pink)',
        color: 'var(--color-deep-pink)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 8px 24px rgba(231, 84, 128, 0.25)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.08)';
        e.currentTarget.style.background = '#FFE4EC';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
      }}
    >
      <ArrowUp size={22} />
    </button>
  );
}
