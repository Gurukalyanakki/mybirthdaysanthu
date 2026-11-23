import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, RefreshCw, CheckCircle } from 'lucide-react';
import { birthdayLetter } from '../data/birthdayMessage';
import confetti from 'canvas-confetti';

/**
 * LoveMessage Component
 * - Interactive pink envelope with 3D flap animation
 * - Glassmorphism message card sliding out
 * - Typewriter text animation paragraph by paragraph
 * - Fully editable from src/data/birthdayMessage.js
 */
export default function LoveMessage() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Full joined letter string
  const fullLetterText = birthdayLetter.paragraphs.join('\n\n');

  // Typewriter effect when envelope is opened
  useEffect(() => {
    if (!isOpen) {
      setDisplayedText('');
      setIsTypingComplete(false);
      return;
    }

    let currentIndex = 0;
    const typingSpeed = 16; // ms per character for smooth romantic pacing

    const interval = setInterval(() => {
      if (currentIndex < fullLetterText.length) {
        setDisplayedText(fullLetterText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [isOpen, fullLetterText]);

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      setIsOpen(true);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#E75480', '#F8BBD0', '#FFE4EC', '#FFD700']
      });
    }
  };

  const handleSkipTyping = () => {
    setDisplayedText(fullLetterText);
    setIsTypingComplete(true);
  };

  const handleReplay = () => {
    setDisplayedText('');
    setIsTypingComplete(false);
    setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < fullLetterText.length) {
          setDisplayedText(fullLetterText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTypingComplete(true);
          clearInterval(interval);
        }
      }, 20);
    }, 100);
  };

  return (
    <div
      id="heartfelt-message"
      style={{
        width: '100%',
        maxWidth: '820px',
        margin: '60px auto 40px auto',
        textAlign: 'center'
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '32px' }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid var(--color-rose-pink)',
            padding: '6px 20px',
            borderRadius: '9999px',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--color-deep-pink)',
            marginBottom: '14px',
            boxShadow: '0 4px 14px rgba(231, 84, 128, 0.12)'
          }}
        >
          <Sparkles size={15} />
          <span>WORDS FROM THE HEART</span>
          <Heart size={15} fill="var(--color-deep-pink)" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '10px'
          }}
        >
          {birthdayLetter.heading}
        </motion.h2>

        <p
          style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-sans)',
            maxWidth: '560px',
            margin: '0 auto'
          }}
        >
          {birthdayLetter.subtitle}
        </p>
      </div>

      {/* Interactive Envelope Container */}
      <div style={{ position: 'relative', margin: '0 auto', maxWidth: '640px' }}>
        {!isOpen ? (
          /* Closed Romantic Envelope */
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            onClick={handleOpenEnvelope}
            className="glass-panel pink-glow-border"
            style={{
              padding: '60px 30px',
              borderRadius: '28px',
              background: 'linear-gradient(145deg, #FFF0F5 0%, #FFE4EC 50%, #FADCE6 100%)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(231, 84, 128, 0.22), 0 0 30px rgba(248, 187, 208, 0.35)'
            }}
          >
            {/* Envelope Flap Accent Lines */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '50%',
                borderBottom: '2px dashed rgba(231, 84, 128, 0.3)',
                pointerEvents: 'none'
              }}
            />

            {/* Wax Seal / Stamp Button */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #E75480, #D8316B)',
                color: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
                boxShadow: '0 8px 24px rgba(216, 49, 107, 0.45), 0 0 18px rgba(248, 187, 208, 0.5)',
                border: '3px solid #FFF'
              }}
            >
              <Heart size={34} fill="#FFFFFF" />
            </motion.div>

            <h3
              style={{
                fontSize: '1.4rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                color: '#D8316B',
                marginBottom: '8px'
              }}
            >
              For Bangaruuu 🌸
            </h3>

            <p
              style={{
                fontSize: '0.96rem',
                color: 'var(--text-secondary)',
                fontWeight: 600
              }}
            >
              Click here to unseal your 20th birthday letter 💌
            </p>
          </motion.div>
        ) : (
          /* Opened Letter Card */
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="glass-panel pink-glow-border"
            style={{
              padding: 'clamp(28px, 5vw, 50px)',
              borderRadius: '30px',
              background: 'rgba(255, 255, 255, 0.93)',
              position: 'relative',
              textAlign: 'left',
              boxShadow: '0 24px 60px rgba(231, 84, 128, 0.2), 0 0 35px rgba(248, 187, 208, 0.35)',
              border: '2px solid rgba(255, 255, 255, 0.95)'
            }}
          >
            {/* Top letter decoration */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(248, 187, 208, 0.7)',
                paddingBottom: '16px',
                marginBottom: '28px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>💌</span>
                <div>
                  <span style={{ fontWeight: 700, color: 'var(--color-deep-pink)', fontSize: '0.95rem' }}>
                    Personal Love Letter
                  </span>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {birthdayLetter.date}
                  </div>
                </div>
              </div>

              {/* Actions: Skip / Replay */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {!isTypingComplete ? (
                  <button
                    onClick={handleSkipTyping}
                    style={{
                      background: '#FFF0F5',
                      border: '1px solid var(--color-rose-pink)',
                      borderRadius: '14px',
                      padding: '5px 12px',
                      fontSize: '0.8rem',
                      color: 'var(--color-deep-pink)',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    Show Full Letter ✨
                  </button>
                ) : (
                  <button
                    onClick={handleReplay}
                    title="Replay typewriter"
                    style={{
                      background: '#FFF0F5',
                      border: '1px solid var(--color-rose-pink)',
                      borderRadius: '14px',
                      padding: '5px 12px',
                      fontSize: '0.8rem',
                      color: 'var(--color-deep-pink)',
                      cursor: 'pointer',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <RefreshCw size={13} />
                    <span>Replay</span>
                  </button>
                )}
              </div>
            </div>

            {/* Typewriter Body Text */}
            <div
              style={{
                fontSize: 'clamp(1.05rem, 2.2vw, 1.18rem)',
                lineHeight: 1.85,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-serif)',
                whiteSpace: 'pre-wrap',
                minHeight: '260px'
              }}
            >
              {displayedText}
              {!isTypingComplete && (
                <span
                  style={{
                    display: 'inline-block',
                    width: '3px',
                    height: '1.2em',
                    background: 'var(--color-deep-pink)',
                    marginLeft: '3px',
                    verticalAlign: 'middle',
                    animation: 'softBlink 0.7s infinite'
                  }}
                />
              )}
            </div>

            {/* Sign off */}
            {isTypingComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  marginTop: '32px',
                  borderTop: '1px solid rgba(248, 187, 208, 0.6)',
                  paddingTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    {birthdayLetter.signOff}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-script)',
                      fontSize: '1.8rem',
                      color: '#D8316B',
                      fontWeight: 700
                    }}
                  >
                    {birthdayLetter.author}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--color-deep-pink)',
                    fontSize: '1.5rem'
                  }}
                >
                  <span className="animate-heart-beat">💖</span>
                  <span className="animate-float-slow">🌸</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
