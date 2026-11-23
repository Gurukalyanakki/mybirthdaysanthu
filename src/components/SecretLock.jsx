import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Heart, KeyRound, X, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * SecretLock Component
 * Secret access popup validating 6-digit code: "042406"
 */
export default function SecretLock({ isOpen, onClose, onUnlockSuccess }) {
  const CODE_LENGTH = 6;
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(''));
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  // Reset and focus when modal opens
  useEffect(() => {
    if (isOpen) {
      setDigits(Array(CODE_LENGTH).fill(''));
      setErrorMsg('');
      setIsUnlocked(false);
      setTimeout(() => {
        if (inputRefs[0].current) {
          inputRefs[0].current.focus();
        }
      }, 150);
    }
  }, [isOpen]);

  const handleChange = (index, value) => {
    // Only accept numeric characters
    const char = value.replace(/[^0-9]/g, '').slice(-1);

    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);
    setErrorMsg('');

    // Auto-advance to next input
    if (char && index < CODE_LENGTH - 1) {
      inputRefs[index + 1].current?.focus();
    }

    // Auto check if all digits entered
    if (char && index === CODE_LENGTH - 1 && newDigits.every((d) => d !== '')) {
      validateCode(newDigits.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (e.key === 'Enter') {
      validateCode(digits.join(''));
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, CODE_LENGTH);
    if (!pasted) return;

    const newDigits = Array(CODE_LENGTH).fill('');
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setDigits(newDigits);

    if (pasted.length === CODE_LENGTH) {
      validateCode(pasted);
    } else {
      inputRefs[Math.min(pasted.length, CODE_LENGTH - 1)].current?.focus();
    }
  };

  const validateCode = (code) => {
    if (code.length !== CODE_LENGTH && code !== '0424') {
      setErrorMsg(`Please enter all ${CODE_LENGTH} digits! 💌`);
      triggerShake();
      return;
    }

    // Secret code check: "042406" (also accepts "0424" as gentle fallback)
    if (code === '042406' || code === '0424') {
      setIsUnlocked(true);
      setErrorMsg('');

      // Confetti burst!
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#E75480', '#F8BBD0', '#FFE4EC', '#E6D5F7', '#FFD700']
      });

      // Save to localStorage
      try {
        localStorage.setItem('santhoshi_birthday_unlocked', 'true');
      } catch {}

      // Short delay for celebration animation then navigate
      setTimeout(() => {
        onUnlockSuccess();
      }, 1000);
    } else {
      setErrorMsg("Oopsie! That's not the secret code, try again sweetie 🌸");
      triggerShake();
      setDigits(Array(CODE_LENGTH).fill(''));
      setTimeout(() => {
        inputRefs[0].current?.focus();
      }, 200);
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 550);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(61, 34, 50, 0.45)',
              backdropFilter: 'blur(8px)'
            }}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`glass-panel-deep ${isShaking ? 'animate-shake' : ''}`}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '460px',
              padding: '36px 24px',
              borderRadius: '28px',
              textAlign: 'center',
              boxShadow: '0 24px 60px rgba(231, 84, 128, 0.28), 0 0 30px rgba(248, 187, 208, 0.4)',
              border: '1.5px solid rgba(255, 255, 255, 0.95)'
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'rgba(255, 255, 255, 0.8)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-deep-pink)';
                e.currentTarget.style.background = '#FFE4EC';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
              }}
            >
              <X size={18} />
            </button>

            {/* Icon Header */}
            <div
              className="animate-pulse-glow"
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: isUnlocked
                  ? 'linear-gradient(135deg, #4CAF50, #81C784)'
                  : 'linear-gradient(135deg, #FFE4EC, #F8BBD0)',
                color: isUnlocked ? '#FFFFFF' : '#E75480',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
                transition: 'all 0.4s ease'
              }}
            >
              {isUnlocked ? (
                <CheckCircle2 size={36} />
              ) : (
                <KeyRound size={34} className="animate-flicker" />
              )}
            </div>

            {/* Heading Prompt */}
            <h3
              style={{
                fontSize: '1.45rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}
            >
              Do you know the little secret? 💌
            </h3>

            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--text-secondary)',
                marginBottom: '26px'
              }}
            >
              Enter the 6-digit magical code to unlock Santhoshi's birthday celebration:
            </p>

            {/* 6-Digit Inputs */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'clamp(6px, 1.8vw, 10px)',
                marginBottom: '20px'
              }}
              onPaste={handlePaste}
            >
              {digits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={inputRefs[idx]}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  disabled={isUnlocked}
                  style={{
                    width: 'clamp(42px, 10vw, 54px)',
                    height: 'clamp(52px, 12vw, 62px)',
                    textAlign: 'center',
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    borderRadius: '14px',
                    border: digit
                      ? '2px solid var(--color-deep-pink)'
                      : '2px solid rgba(248, 187, 208, 0.7)',
                    background: digit ? 'rgba(255, 240, 245, 0.85)' : 'rgba(255, 255, 255, 0.8)',
                    boxShadow: digit
                      ? '0 0 14px rgba(231, 84, 128, 0.25)'
                      : '0 2px 8px rgba(0, 0, 0, 0.04)',
                    outline: 'none',
                    color: 'var(--color-deep-pink)',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-deep-pink)';
                    e.target.style.boxShadow = '0 0 16px rgba(231, 84, 128, 0.35)';
                  }}
                  onBlur={(e) => {
                    if (!digit) {
                      e.target.style.borderColor = 'rgba(248, 187, 208, 0.7)';
                      e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                    }
                  }}
                />
              ))}
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  style={{
                    color: '#D8316B',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    marginBottom: '16px'
                  }}
                >
                  <AlertCircle size={16} />
                  <span>{errorMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Message */}
            {isUnlocked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  color: '#2E7D32',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  marginBottom: '16px'
                }}
              >
                <Sparkles size={18} />
                <span>Unlocked! Opening your surprise... 💗</span>
              </motion.div>
            )}

            {/* Action Button */}
            <button
              onClick={() => validateCode(digits.join(''))}
              disabled={isUnlocked}
              className="btn-romantic"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1.05rem',
                opacity: isUnlocked ? 0.7 : 1
              }}
            >
              {isUnlocked ? (
                <>
                  <Sparkles size={18} />
                  <span>Opening Celebration...</span>
                </>
              ) : (
                <>
                  <Heart size={18} fill="#FFFFFF" />
                  <span>Unlock Celebration</span>
                </>
              )}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
