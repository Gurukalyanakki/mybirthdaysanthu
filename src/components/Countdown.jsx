import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Clock, Gift, PartyPopper, KeyRound, Lock, ArrowRight } from 'lucide-react';

/**
 * Countdown Component
 * Target: November 24, 2026 at midnight in Indian Standard Time (IST)
 * IST offset is UTC+5:30
 * 
 * Requirement: After countdown is completed, it asks for the passcode (042406)
 * to unlock the celebration!
 */
export default function Countdown({ onOpenSecret, onNavigateToWishes, isUnlocked, onLock }) {
  // Target: November 24, 2026 00:00:00 IST
  const targetDate = new Date('2026-11-24T00:00:00+05:30').getTime();

  const calculateTimeLeft = () => {
    const now = Date.now();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  const timeUnits = [
    { label: 'Days', value: timeLeft.days, unit: 'D' },
    { label: 'Hours', value: formatNumber(timeLeft.hours), unit: 'H' },
    { label: 'Minutes', value: formatNumber(timeLeft.minutes), unit: 'M' },
    { label: 'Seconds', value: formatNumber(timeLeft.seconds), unit: 'S' }
  ];

  return (
    <div className="countdown-wrapper" style={{ width: '100%', maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
      {/* Decorative Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.85)',
          border: '1px solid var(--color-rose-pink)',
          padding: '8px 22px',
          borderRadius: '9999px',
          fontSize: '0.95rem',
          fontWeight: 600,
          color: 'var(--color-deep-pink)',
          boxShadow: '0 4px 16px rgba(231, 84, 128, 0.15)',
          marginBottom: '20px'
        }}
      >
        {timeLeft.isPast ? (
          <>
            <PartyPopper size={18} className="animate-flicker" />
            <span>🎉 THE MOMENT IS FINALLY HERE! 🎉</span>
            <PartyPopper size={18} className="animate-flicker" />
          </>
        ) : (
          <>
            <Sparkles size={16} className="animate-flicker" />
            <span>A Milestone Celebration in the Making</span>
            <Heart size={16} fill="var(--color-deep-pink)" color="var(--color-deep-pink)" />
          </>
        )}
      </motion.div>

      {/* Main Headings */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        style={{
          fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
          fontFamily: 'var(--font-serif)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.2,
          marginBottom: '14px'
        }}
      >
        {timeLeft.isPast ? (
          <>
            Happy 20th Birthday,{' '}
            <span className="text-gradient-romantic" style={{ display: 'inline-block' }}>
              Santhoshi! 🎂
            </span>
          </>
        ) : (
          <>
            Someone Special Is Turning{' '}
            <span className="text-gradient-romantic" style={{ display: 'inline-block' }}>
              20! 💗
            </span>
          </>
        )}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          fontFamily: 'var(--font-script)',
          color: 'var(--color-deep-pink)',
          fontWeight: 600,
          marginBottom: '36px',
          letterSpacing: '0.5px'
        }}
      >
        {timeLeft.isPast
          ? "The countdown has arrived! Enter your secret code to unlock your birthday surprises 💌"
          : "Happy Birthday in Advance, Santhoshi! ✨"}
      </motion.p>

      {/* Target Date Pill */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.7)',
          padding: '6px 18px',
          borderRadius: '20px',
          fontSize: '0.92rem',
          color: 'var(--text-secondary)',
          marginBottom: '32px',
          border: '1px solid rgba(255, 255, 255, 0.8)'
        }}
      >
        <Clock size={16} color="var(--color-rose-gold)" />
        <span>
          {timeLeft.isPast ? (
            <strong style={{ color: 'var(--color-deep-pink)' }}>
              November 24, 2026 has arrived! Locked with secret passcode 🗝️
            </strong>
          ) : (
            <>Counting down to <strong>November 24, 2026</strong> (IST)</>
          )}
        </span>
      </motion.div>

      {/* Glowing Countdown Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(10px, 2.5vw, 24px)',
          margin: '0 auto 40px auto',
          maxWidth: '720px'
        }}
      >
        {timeUnits.map((item) => (
          <div
            key={item.label}
            className="glass-panel pink-glow-border"
            style={{
              padding: 'clamp(16px, 3.5vw, 28px) clamp(8px, 2vw, 16px)',
              position: 'relative',
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.85)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '22px'
            }}
          >
            {/* Top decorative pink stripe */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #F8BBD0, #E75480, #E6D5F7)'
              }}
            />

            {/* Glowing Digit */}
            <span
              style={{
                fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: '#D8316B',
                textShadow: '0 2px 10px rgba(231, 84, 128, 0.25)'
              }}
            >
              {item.value}
            </span>

            {/* Label */}
            <span
              style={{
                fontSize: 'clamp(0.75rem, 1.8vw, 0.95rem)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                color: 'var(--text-muted)',
                marginTop: '6px'
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Action Area: Passcode Access Prompt */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        style={{
          marginTop: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* If user already unlocked with passcode */}
        {isUnlocked ? (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={onNavigateToWishes}
              className="btn-romantic animate-pulse-glow"
              style={{
                fontSize: '1.18rem',
                padding: '16px 42px',
                boxShadow: '0 12px 36px rgba(231, 84, 128, 0.45)'
              }}
            >
              <Sparkles size={22} />
              <span>Enter Your Birthday Celebration →</span>
            </button>
            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.88rem', color: '#2E7D32', fontWeight: 600 }}>
                ✨ Passcode verified! Your surprises are unlocked.
              </span>
              <button
                onClick={onLock}
                title="Lock celebration again"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-deep-pink)',
                  fontSize: '0.85rem',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                (Lock again 🔒)
              </button>
            </div>
          </div>
        ) : timeLeft.isPast ? (
          /* When countdown completed: Prompt to enter passcode */
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={onOpenSecret}
              className="btn-romantic animate-pulse-glow"
              style={{
                fontSize: '1.18rem',
                padding: '16px 42px',
                boxShadow: '0 12px 36px rgba(231, 84, 128, 0.45)'
              }}
            >
              <KeyRound size={22} />
              <span>Enter Passcode to Unlock Celebration 💌</span>
            </button>
            <p
              style={{
                marginTop: '14px',
                fontSize: '0.92rem',
                color: 'var(--text-secondary)',
                fontWeight: 600
              }}
            >
              Do you have the secret code? Enter the 6-digit key to begin! ✨
            </p>
          </div>
        ) : (
          /* Before countdown: Early Secret Entry Option */
          <>
            <button
              onClick={onOpenSecret}
              className="glass-panel glass-card-interactive"
              style={{
                background: 'rgba(255, 255, 255, 0.88)',
                border: '1.5px dashed var(--color-deep-pink)',
                borderRadius: '28px',
                padding: '16px 32px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                color: 'var(--text-primary)',
                boxShadow: '0 10px 28px rgba(231, 84, 128, 0.18)'
              }}
            >
              {/* Animated Gift Box Icon */}
              <div
                className="animate-heart-beat"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FFE4EC, #F8BBD0)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-deep-pink)'
                }}
              >
                <Gift size={24} />
              </div>

              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '1.02rem', color: '#D8316B' }}>
                  Do you know the secret code? 💌
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Click here to unlock the birthday surprises ✨
                </div>
              </div>
            </button>

            <p
              style={{
                marginTop: '16px',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                fontStyle: 'italic'
              }}
            >
              * The celebration is protected with a secret passcode both before and after the countdown.
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
