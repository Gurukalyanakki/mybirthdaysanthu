import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Film, Heart, Sparkles } from 'lucide-react';

/**
 * VideoModal Component
 * - Modal popup on the SAME page
 * - Centered video player with rounded corners & soft pink glowing border
 * - Plays `/videos/birthday_surprise.mp4`
 * - Pauses the video when popup closes
 */
export default function VideoModal({ isOpen, onClose }) {
  const videoRef = useRef(null);

  // Pause video immediately when modal closes or unmounts
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          {/* Darkened Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(38, 16, 27, 0.78)',
              backdropFilter: 'blur(10px)'
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 25 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="glass-panel-deep"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '850px',
              padding: 'clamp(20px, 4vw, 36px)',
              borderRadius: '32px',
              border: '2px solid rgba(248, 187, 208, 0.9)',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.45), 0 0 45px rgba(231, 84, 128, 0.4)',
              background: 'rgba(255, 255, 255, 0.95)',
              zIndex: 2,
              textAlign: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close video surprise"
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 240, 245, 0.9)',
                border: '1.5px solid var(--color-rose-pink)',
                color: 'var(--color-deep-pink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.background = '#FFE4EC';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'rgba(255, 240, 245, 0.9)';
              }}
            >
              <X size={20} />
            </button>

            {/* Heading above the video */}
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--color-deep-pink)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  marginBottom: '8px'
                }}
              >
                <Sparkles size={16} />
                <span>SPECIAL CINEMATIC MOMENT</span>
                <Heart size={16} fill="var(--color-deep-pink)" />
              </div>

              <h2
                style={{
                  fontSize: 'clamp(1.6rem, 4vw, 2.3rem)',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  color: 'var(--text-primary)'
                }}
              >
                A Little Surprise, Made Just for You 💕
              </h2>

              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                  marginTop: '6px'
                }}
              >
                Press play below to watch a special video greeting recorded for your 20th birthday!
              </p>
            </div>

            {/* Video Player Wrapper */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                borderRadius: '22px',
                overflow: 'hidden',
                background: '#0D050B',
                boxShadow: '0 12px 35px rgba(231, 84, 128, 0.28), 0 0 25px rgba(231, 84, 128, 0.3)',
                border: '2px solid rgba(248, 187, 208, 0.8)',
                aspectRatio: '16 / 9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <video
                ref={videoRef}
                controls
                playsInline
                preload="metadata"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              >
                <source src="/videos/birthday_surprise.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Bottom note */}
            <p
              style={{
                marginTop: '16px',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                fontStyle: 'italic'
              }}
            >
              ✨ You can easily replace <code>/public/videos/birthday_surprise.mp4</code> with any custom video anytime!
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
