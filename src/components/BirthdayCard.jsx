import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Cake, ArrowRight, Flame, Smile, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * BirthdayCard Component (Page Two)
 * - Animated interactive birthday cake with candles that can be blown out
 * - Floating balloons, celebratory confetti, glowing typography
 * - Prominent "Let's Begin Our Beautiful Memories →" button
 */
export default function BirthdayCard({ onNavigateToMemories }) {
  const [candlesBlown, setCandlesBlown] = useState(false);

  // Trigger celebration confetti on mount
  useEffect(() => {
    const launchConfetti = () => {
      const end = Date.now() + 1500;
      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#E75480', '#F8BBD0', '#FFE4EC', '#FFD700', '#E6D5F7']
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#E75480', '#F8BBD0', '#FFE4EC', '#FFD700', '#E6D5F7']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    };

    launchConfetti();
  }, []);

  const handleBlowCandles = () => {
    setCandlesBlown(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#FFD700', '#E75480', '#F8BBD0', '#FFF']
    });
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
        padding: '20px 0'
      }}
    >
      {/* Floating Decorative Balloons in Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 0
        }}
      >
        <span
          className="animate-float-slow"
          style={{ position: 'absolute', top: '12%', left: '8%', fontSize: '42px', opacity: 0.75 }}
        >
          🎈
        </span>
        <span
          className="animate-float-medium"
          style={{ position: 'absolute', top: '25%', right: '10%', fontSize: '48px', opacity: 0.8 }}
        >
          🎈
        </span>
        <span
          className="animate-float-slow"
          style={{ position: 'absolute', top: '65%', left: '6%', fontSize: '38px', opacity: 0.7 }}
        >
          💖
        </span>
        <span
          className="animate-float-medium"
          style={{ position: 'absolute', top: '70%', right: '7%', fontSize: '40px', opacity: 0.75 }}
        >
          ✨
        </span>
      </div>

      {/* Main Glass Celebration Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-panel pink-glow-border"
        style={{
          padding: 'clamp(28px, 6vw, 56px) clamp(20px, 4vw, 48px)',
          borderRadius: '36px',
          background: 'rgba(255, 255, 255, 0.88)',
          position: 'relative',
          zIndex: 1,
          boxShadow: '0 24px 64px rgba(231, 84, 128, 0.22), 0 0 35px rgba(248, 187, 208, 0.4)'
        }}
      >
        {/* Milestone Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #FFE4EC, #F8BBD0)',
            padding: '8px 24px',
            borderRadius: '9999px',
            color: '#D8316B',
            fontWeight: 700,
            fontSize: '0.95rem',
            letterSpacing: '0.8px',
            marginBottom: '20px',
            boxShadow: '0 4px 14px rgba(231, 84, 128, 0.2)'
          }}
        >
          <Sparkles size={16} />
          <span>CELEBRATING TWO DECADES OF PURE WONDER</span>
          <Heart size={16} fill="#D8316B" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          style={{
            fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            lineHeight: 1.18,
            marginBottom: '16px',
            color: 'var(--text-primary)'
          }}
        >
          Happy 20th Birthday,{' '}
          <span className="text-gradient-romantic" style={{ display: 'inline-block' }}>
            Santhoshi! 🎂
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
            fontFamily: 'var(--font-script)',
            color: 'var(--color-deep-pink)',
            maxWidth: '680px',
            margin: '0 auto 36px auto',
            lineHeight: 1.5
          }}
        >
          "Today is all about you, your smile, and all the beautiful moments that make you special."
        </motion.p>

        {/* Interactive Birthday Cake Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
          style={{
            margin: '20px auto 32px auto',
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '240px',
              height: '190px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            {/* Candles & Flames */}
            <div
              style={{
                position: 'absolute',
                top: '10px',
                display: 'flex',
                gap: '28px',
                zIndex: 3
              }}
            >
              {[0, 1].map((candleIdx) => (
                <div key={candleIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Flame */}
                  {!candlesBlown ? (
                    <div
                      className="animate-flicker"
                      style={{
                        width: '14px',
                        height: '24px',
                        borderRadius: '50% 50% 35% 35%',
                        background: 'radial-gradient(ellipse at bottom, #FFF 0%, #FFD700 40%, #FF5722 95%)',
                        boxShadow: '0 0 16px #FF9800, 0 0 28px #FFC107'
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '8px',
                        height: '18px',
                        background: 'radial-gradient(circle, rgba(180,180,180,0.6) 0%, transparent 80%)',
                        animation: 'floatSlow 1.5s ease-out infinite'
                      }}
                    />
                  )}
                  {/* Candle Stick */}
                  <div
                    style={{
                      width: '9px',
                      height: '38px',
                      background: 'repeating-linear-gradient(45deg, #FFF, #FFF 4px, #E75480 4px, #E75480 8px)',
                      borderRadius: '4px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Cake Top Tier */}
            <div
              style={{
                width: '140px',
                height: '45px',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #FFE4EC 70%, #F8BBD0 100%)',
                borderRadius: '16px 16px 6px 6px',
                boxShadow: 'inset 0 -3px 6px rgba(231,84,128,0.2), 0 4px 10px rgba(0,0,0,0.06)',
                zIndex: 2,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D8316B',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}
            >
              <span>💗 20 💗</span>
            </div>

            {/* Cake Bottom Tier */}
            <div
              style={{
                width: '210px',
                height: '62px',
                background: 'linear-gradient(180deg, #F8BBD0 0%, #FFE4EC 50%, #F5CEE0 100%)',
                borderRadius: '20px 20px 8px 8px',
                boxShadow: 'inset 0 -4px 8px rgba(231,84,128,0.25), 0 8px 18px rgba(0,0,0,0.08)',
                zIndex: 1,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '0 16px'
              }}
            >
              <span style={{ fontSize: '15px' }}>🍓</span>
              <span style={{ fontSize: '15px' }}>✨</span>
              <span style={{ fontSize: '15px' }}>🍓</span>
              <span style={{ fontSize: '15px' }}>✨</span>
              <span style={{ fontSize: '15px' }}>🍓</span>
            </div>

            {/* Cake Plate Stand */}
            <div
              style={{
                width: '250px',
                height: '14px',
                background: 'linear-gradient(90deg, #E6D5F7, #FFFFFF, #E6D5F7)',
                borderRadius: '20px',
                boxShadow: '0 6px 18px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          {/* Interactive Wish / Blow Candles Button */}
          <button
            onClick={handleBlowCandles}
            style={{
              marginTop: '16px',
              background: candlesBlown ? '#F3E5F5' : '#FFF0F5',
              border: '1.5px solid var(--color-rose-pink)',
              borderRadius: '20px',
              padding: '6px 18px',
              color: 'var(--color-deep-pink)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {candlesBlown ? (
              <>
                <Star size={15} fill="#FFD700" color="#FFD700" />
                <span>Wish Made! May every dream come true ✨</span>
              </>
            ) : (
              <>
                <Flame size={15} color="#FF9800" />
                <span>Click to Make a Wish & Blow the Candles 🕯️</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Personalized Birthday Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          style={{
            maxWidth: '660px',
            margin: '0 auto 36px auto',
            padding: '20px 28px',
            borderRadius: '20px',
            background: 'rgba(255, 240, 245, 0.65)',
            border: '1px solid rgba(248, 187, 208, 0.7)',
            fontSize: '1.02rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6
          }}
        >
          Turning 20 is not just another birthday — it is the start of an extraordinary new chapter.
          May your journey ahead be blessed with pure happiness, great friendships, laughter that echoes,
          and moments that take your breath away. 🌸
        </motion.div>

        {/* Prominent Next Page Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <button
            onClick={onNavigateToMemories}
            className="btn-romantic"
            style={{
              fontSize: '1.15rem',
              padding: '16px 42px',
              letterSpacing: '0.3px'
            }}
          >
            <span>Let's Begin Our Beautiful Memories</span>
            <ArrowRight size={22} />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
