import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';

/**
 * MusicToggle Component
 * - Plays the romantic birthday song automatically when the website is opened!
 * - Directly attempts immediate autoplay on page load.
 * - If browser autoplay policy blocks unprompted audio, automatically starts
 *   playing on the very first touch/click/scroll anywhere on the website.
 * - Visible floating toggle button with animated sound wave equalizer.
 */
export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef(null);

  const startPlayback = async () => {
    if (!audioRef.current) return false;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setShowTooltip(false);
      return true;
    } catch {
      // Browser blocked direct audio without prior interaction
      return false;
    }
  };

  useEffect(() => {
    const audio = new Audio('/audio/romantic_bgm.mp3');
    audio.loop = true;
    audio.volume = 0.65;
    audioRef.current = audio;

    // 1. Attempt immediate autoplay as soon as website opens
    startPlayback().then((started) => {
      if (!started) {
        // Show subtle invitation pill
        setShowTooltip(true);

        // 2. Play immediately on the first touch, click, scroll or keypress anywhere
        const handleFirstInteraction = () => {
          startPlayback().then((playSuccess) => {
            if (playSuccess) {
              removeListeners();
            }
          });
        };

        const removeListeners = () => {
          window.removeEventListener('click', handleFirstInteraction);
          window.removeEventListener('touchstart', handleFirstInteraction);
          window.removeEventListener('scroll', handleFirstInteraction);
          window.removeEventListener('keydown', handleFirstInteraction);
          window.removeEventListener('pointerdown', handleFirstInteraction);
        };

        window.addEventListener('click', handleFirstInteraction, { passive: true });
        window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
        window.addEventListener('scroll', handleFirstInteraction, { passive: true });
        window.addEventListener('keydown', handleFirstInteraction, { passive: true });
        window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
      }
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setShowTooltip(false);
      } catch (err) {
        console.error("Audio playback error:", err);
      }
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 900
      }}
    >
      {/* Tooltip hint if browser requires a tap */}
      {showTooltip && !isPlaying && (
        <div
          onClick={startPlayback}
          style={{
            position: 'absolute',
            bottom: '58px',
            left: '0',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            color: '#D8316B',
            padding: '8px 16px',
            borderRadius: '16px',
            fontSize: '0.86rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 24px rgba(231, 84, 128, 0.25)',
            border: '1px solid rgba(248, 187, 208, 0.8)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'floatSlow 3s ease-in-out infinite',
            cursor: 'pointer'
          }}
        >
          <span>Tap anywhere to start music 🎵</span>
          <Heart size={14} fill="#D8316B" />
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Mute music" : "Play music"}
        title={isPlaying ? "Mute Song" : "Play Song"}
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: isPlaying
            ? 'linear-gradient(135deg, #E75480, #D8316B)'
            : 'rgba(255, 255, 255, 0.9)',
          color: isPlaying ? '#FFFFFF' : '#E75480',
          border: isPlaying ? 'none' : '2px solid rgba(248, 187, 208, 0.8)',
          boxShadow: isPlaying
            ? '0 0 20px rgba(231, 84, 128, 0.6), 0 8px 20px rgba(231, 84, 128, 0.3)'
            : '0 6px 18px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          backdropFilter: 'blur(10px)',
          position: 'relative'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {isPlaying ? (
          /* Animated sound wave bars */
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <span
              style={{
                width: '3px',
                height: '14px',
                background: '#FFFFFF',
                borderRadius: '3px',
                animation: 'floatSlow 0.8s ease-in-out infinite alternate'
              }}
            />
            <span
              style={{
                width: '3px',
                height: '20px',
                background: '#FFFFFF',
                borderRadius: '3px',
                animation: 'floatSlow 0.6s ease-in-out infinite 0.2s alternate'
              }}
            />
            <span
              style={{
                width: '3px',
                height: '12px',
                background: '#FFFFFF',
                borderRadius: '3px',
                animation: 'floatSlow 0.9s ease-in-out infinite 0.4s alternate'
              }}
            />
          </div>
        ) : (
          <VolumeX size={22} />
        )}

        {/* Ambient pulse ring when playing */}
        {isPlaying && (
          <span
            style={{
              position: 'absolute',
              inset: '-4px',
              borderRadius: '50%',
              border: '2px solid rgba(231, 84, 128, 0.5)',
              animation: 'pulseGlow 2s infinite',
              pointerEvents: 'none'
            }}
          />
        )}
      </button>
    </div>
  );
}
