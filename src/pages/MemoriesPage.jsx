import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MemoryGallery from '../components/MemoryGallery';
import VideoModal from '../components/VideoModal';
import LoveMessage from '../components/LoveMessage';
import { Film, Heart, Sparkles, MessageCircleHeart } from 'lucide-react';

/**
 * MemoriesPage (Page Three)
 * - Houses Memory Gallery
 * - Video Surprise Popup (on same page)
 * - Heartfelt Message Envelope (on same page)
 */
export default function MemoriesPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <motion.section
      key="memories-page"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6 }}
      style={{
        padding: '20px 0 80px 0',
        minHeight: '80vh'
      }}
    >
      {/* 1. Memory Gallery */}
      <MemoryGallery />

      {/* 2. Video Surprise Callout Banner on the SAME page */}
      <div
        style={{
          margin: '50px auto 40px auto',
          textAlign: 'center',
          maxWidth: '680px'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel pink-glow-border"
          style={{
            padding: '36px 28px',
            borderRadius: '30px',
            background: 'linear-gradient(135deg, rgba(255, 240, 245, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%)',
            boxShadow: '0 16px 45px rgba(231, 84, 128, 0.18)'
          }}
        >
          <div
            className="animate-pulse-glow"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFE4EC, #F8BBD0)',
              color: 'var(--color-deep-pink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}
          >
            <Film size={30} />
          </div>

          <h3
            style={{
              fontSize: '1.5rem',
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '8px'
            }}
          >
            A Motion Picture Just For You 🎬
          </h3>

          <p
            style={{
              fontSize: '0.96rem',
              color: 'var(--text-secondary)',
              marginBottom: '24px',
              maxWidth: '480px',
              margin: '0 auto 24px auto'
            }}
          >
            Beyond still photographs, some moments are best relived in motion. Here is a sweet video compiled with love.
          </p>

          {/* Prominent Video Button */}
          <button
            onClick={() => setIsVideoOpen(true)}
            className="btn-romantic"
            style={{
              fontSize: '1.05rem',
              padding: '14px 34px'
            }}
          >
            <Film size={20} />
            <span>There's Something Special for You 🎥</span>
          </button>
        </motion.div>
      </div>

      {/* Video Popup Modal (Rendered on SAME page) */}
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />

      {/* 3. Heartfelt Message Box (On SAME page) */}
      <LoveMessage />
    </motion.section>
  );
}
