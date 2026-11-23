import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { memories, memoryCategories } from '../data/memories';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * MemoryGallery Component
 * 
 * Dynamically inspects the natural dimensions (width x height) of each photo
 * to create custom frames that adapt perfectly to the photo's real proportions.
 * 
 * Frame Types based on inspected aspect ratio:
 *  1. 'story' (ratio < 0.65) -> Slender 9:16 mobile/story portrait frame with vertical filigree
 *  2. 'portrait' (0.65 <= ratio < 0.88) -> Vintage Victorian rose-gold ornate frame with cream matte
 *  3. 'square' (0.88 <= ratio <= 1.25) -> Parisian gallery shadowbox frame with 4 metallic rivets
 *  4. 'wide' (ratio > 1.25) -> Panoramic cinematic horizon frame with metallic trim bars
 * 
 * Guarantee: 100% of the photo is visible, sharp, and perfectly framed. No cropping, no messages/text.
 */
export default function MemoryGallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [photoMeta, setPhotoMeta] = useState({});

  // Inspect each photo's natural dimensions on mount
  useEffect(() => {
    memories.forEach((photo) => {
      const img = new Image();
      img.src = photo.image;
      img.onload = () => {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        const ratio = w / h;

        let frameType = 'portrait';
        if (ratio < 0.65) {
          frameType = 'story'; // Slim 9:16 portrait
        } else if (ratio < 0.88) {
          frameType = 'portrait'; // Classic 3:4 / 2:3 portrait
        } else if (ratio <= 1.25) {
          frameType = 'square'; // Square / near-square
        } else {
          frameType = 'wide'; // Landscape
        }

        setPhotoMeta((prev) => ({
          ...prev,
          [photo.id]: {
            width: w,
            height: h,
            ratio: ratio,
            frameType: frameType,
            loaded: true
          }
        }));
      };
    });
  }, []);

  // Filter memories by category
  const filteredMemories =
    activeCategory === 'all'
      ? memories
      : memories.filter((item) => item.category === activeCategory);

  const openLightbox = (index) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((prev) => (prev + 1) % filteredMemories.length);
    }
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(
        (prev) => (prev - 1 + filteredMemories.length) % filteredMemories.length
      );
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'ArrowRight') nextPhoto(e);
      if (e.key === 'ArrowLeft') prevPhoto(e);
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, filteredMemories.length]);

  /**
   * FRAME 1: Slim 'Story' Portrait Frame (for 9:16 / ultra-tall mobile portraits)
   */
  const renderStoryFrame = (photo, meta, isLightbox = false) => {
    const ratio = meta?.ratio || 0.58;
    return (
      <div
        style={{
          position: 'relative',
          padding: isLightbox ? '16px 14px' : '12px 10px',
          background: 'linear-gradient(135deg, #FBE3E8 0%, #FFFFFF 25%, #F7D2DA 50%, #FFFFFF 75%, #ECC0CB 100%)',
          borderRadius: isLightbox ? '24px' : '20px',
          boxShadow: isLightbox
            ? '0 25px 60px rgba(0,0,0,0.5), 0 0 35px rgba(231, 84, 128, 0.4)'
            : '0 12px 28px rgba(231, 84, 128, 0.18), inset 0 1px 3px rgba(255,255,255,0.9), inset 0 -2px 3px rgba(183,110,121,0.25)',
          border: '1.5px solid rgba(231, 84, 128, 0.35)',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        {/* Top & Bottom Crown Filigree Accents */}
        <div
          style={{
            position: 'absolute',
            top: isLightbox ? '6px' : '4px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '36px',
            height: '3px',
            borderRadius: '2px',
            background: 'linear-gradient(90deg, transparent, #E75480, #B76E79, #E75480, transparent)',
            zIndex: 2
          }}
        />

        {/* 4 Corner Accents */}
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => {
          const isTop = pos.includes('top');
          const isLeft = pos.includes('left');
          return (
            <svg
              key={pos}
              viewBox="0 0 20 20"
              width={isLightbox ? '18' : '14'}
              height={isLightbox ? '18' : '14'}
              style={{
                position: 'absolute',
                top: isTop ? (isLightbox ? '6px' : '4px') : 'auto',
                bottom: !isTop ? (isLightbox ? '6px' : '4px') : 'auto',
                left: isLeft ? (isLightbox ? '6px' : '4px') : 'auto',
                right: !isLeft ? (isLightbox ? '6px' : '4px') : 'auto',
                transform: `${!isTop ? 'scaleY(-1)' : ''} ${!isLeft ? 'scaleX(-1)' : ''}`,
                pointerEvents: 'none',
                zIndex: 3
              }}
            >
              <path
                d="M 2 16 L 2 4 Q 2 2 4 2 L 16 2"
                fill="none"
                stroke="#D8316B"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="5" cy="5" r="2" fill="#E75480" />
            </svg>
          );
        })}

        {/* Inner Passe-Partout */}
        <div
          style={{
            padding: isLightbox ? '8px' : '6px',
            background: '#FFF9FA',
            borderRadius: isLightbox ? '16px' : '14px',
            border: '1px solid rgba(231, 84, 128, 0.22)',
            boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)',
            boxSizing: 'border-box'
          }}
        >
          {/* Exact Adaptive Photo Window */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: `${ratio}`,
              maxHeight: isLightbox ? '75vh' : 'none',
              borderRadius: isLightbox ? '12px' : '10px',
              overflow: 'hidden',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.15)',
              background: '#FFF0F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={photo.image}
              alt=""
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                if (!isLightbox) e.currentTarget.style.transform = 'scale(1.04)';
              }}
              onMouseLeave={(e) => {
                if (!isLightbox) e.currentTarget.style.transform = 'scale(1)';
              }}
            />

            {!isLightbox && (
              <div
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(6px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-deep-pink)',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.12)'
                }}
              >
                <Maximize2 size={13} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  /**
   * FRAME 2: Classic 3:4 / 2:3 Portrait Frame
   */
  const renderPortraitFrame = (photo, meta, isLightbox = false) => {
    const ratio = meta?.ratio || 0.72;
    return (
      <div
        style={{
          position: 'relative',
          padding: isLightbox ? '18px 16px' : '14px 12px',
          background: 'linear-gradient(135deg, #FDE6EA 0%, #FFFFFF 30%, #F8D2DA 50%, #FFFFFF 70%, #E8B4BE 100%)',
          borderRadius: isLightbox ? '26px' : '22px',
          boxShadow: isLightbox
            ? '0 25px 60px rgba(0,0,0,0.5), 0 0 35px rgba(231, 84, 128, 0.4)'
            : '0 14px 34px rgba(231, 84, 128, 0.18), inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -2px 4px rgba(183,110,121,0.3)',
          border: '1.5px solid rgba(231, 84, 128, 0.35)',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        {/* 4 Corner Filigree Brackets */}
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => {
          const isTop = pos.includes('top');
          const isLeft = pos.includes('left');
          return (
            <svg
              key={pos}
              viewBox="0 0 24 24"
              width={isLightbox ? '22' : '16'}
              height={isLightbox ? '22' : '16'}
              style={{
                position: 'absolute',
                top: isTop ? (isLightbox ? '8px' : '6px') : 'auto',
                bottom: !isTop ? (isLightbox ? '8px' : '6px') : 'auto',
                left: isLeft ? (isLightbox ? '8px' : '6px') : 'auto',
                right: !isLeft ? (isLightbox ? '8px' : '6px') : 'auto',
                transform: `${!isTop ? 'scaleY(-1)' : ''} ${!isLeft ? 'scaleX(-1)' : ''}`,
                pointerEvents: 'none',
                zIndex: 3
              }}
            >
              <path
                d="M 2 20 L 2 6 Q 2 2 6 2 L 20 2"
                fill="none"
                stroke="#D8316B"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="7" cy="7" r="2.5" fill="#E75480" />
            </svg>
          );
        })}

        {/* Inner Passe-Partout */}
        <div
          style={{
            padding: isLightbox ? '10px' : '8px',
            background: '#FFF9FA',
            borderRadius: isLightbox ? '18px' : '14px',
            border: '1.5px solid rgba(231, 84, 128, 0.22)',
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.06)',
            boxSizing: 'border-box'
          }}
        >
          {/* Exact Adaptive Photo Window */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: `${ratio}`,
              maxHeight: isLightbox ? '75vh' : 'none',
              borderRadius: isLightbox ? '14px' : '10px',
              overflow: 'hidden',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.15)',
              background: '#FFF0F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={photo.image}
              alt=""
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                if (!isLightbox) e.currentTarget.style.transform = 'scale(1.04)';
              }}
              onMouseLeave={(e) => {
                if (!isLightbox) e.currentTarget.style.transform = 'scale(1)';
              }}
            />

            {!isLightbox && (
              <div
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(6px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-deep-pink)',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.12)'
                }}
              >
                <Maximize2 size={13} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  /**
   * FRAME 3: Square Gallery Shadowbox Frame (with rose gold metallic corner studs)
   */
  const renderSquareFrame = (photo, meta, isLightbox = false) => {
    const ratio = meta?.ratio || 1;
    return (
      <div
        style={{
          position: 'relative',
          padding: isLightbox ? '18px' : '14px',
          background: 'linear-gradient(145deg, #FFFFFF 0%, #FFF2F6 45%, #FDE4EB 100%)',
          borderRadius: isLightbox ? '26px' : '22px',
          border: '2px solid rgba(248, 187, 208, 0.95)',
          boxShadow: isLightbox
            ? '0 25px 60px rgba(0,0,0,0.5), 0 0 35px rgba(231, 84, 128, 0.4)'
            : '0 14px 32px rgba(231, 84, 128, 0.18), inset 0 2px 4px rgba(255,255,255,0.95)',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        {/* 4 Rose Gold Metallic Rivets / Studs */}
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => {
          const isTop = pos.includes('top');
          const isLeft = pos.includes('left');
          return (
            <div
              key={pos}
              style={{
                position: 'absolute',
                top: isTop ? (isLightbox ? '10px' : '7px') : 'auto',
                bottom: !isTop ? (isLightbox ? '10px' : '7px') : 'auto',
                left: isLeft ? (isLightbox ? '10px' : '7px') : 'auto',
                right: !isLeft ? (isLightbox ? '10px' : '7px') : 'auto',
                width: isLightbox ? '12px' : '9px',
                height: isLightbox ? '12px' : '9px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #F8BBD0 35%, #E75480 80%, #AD1457 100%)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2), inset 0 1px 1px #FFF',
                zIndex: 3
              }}
            />
          );
        })}

        {/* Inner Adaptive Window */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: `${ratio}`,
            maxHeight: isLightbox ? '75vh' : 'none',
            borderRadius: isLightbox ? '16px' : '12px',
            overflow: 'hidden',
            border: '1.5px solid rgba(231, 84, 128, 0.22)',
            boxShadow: '0 6px 18px rgba(0,0,0,0.08), inset 0 0 10px rgba(0,0,0,0.12)',
            background: '#FFF0F5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={photo.image}
            alt=""
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={(e) => {
              if (!isLightbox) e.currentTarget.style.transform = 'scale(1.04)';
            }}
            onMouseLeave={(e) => {
              if (!isLightbox) e.currentTarget.style.transform = 'scale(1)';
            }}
          />

          {!isLightbox && (
            <div
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(6px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-deep-pink)',
                boxShadow: '0 3px 8px rgba(0,0,0,0.12)'
              }}
            >
              <Maximize2 size={13} />
            </div>
          )}
        </div>
      </div>
    );
  };

  /**
   * FRAME 4: Wide / Landscape Horizon Frame
   */
  const renderWideFrame = (photo, meta, isLightbox = false) => {
    const ratio = meta?.ratio || 1.4;
    return (
      <div
        style={{
          position: 'relative',
          padding: isLightbox ? '16px 18px' : '12px 12px 14px 12px',
          background: 'linear-gradient(180deg, #FFF5F7 0%, #FFFFFF 15%, #FFFFFF 85%, #FDE4EB 100%)',
          borderRadius: isLightbox ? '24px' : '20px',
          border: '1.5px solid rgba(216, 49, 107, 0.35)',
          boxShadow: isLightbox
            ? '0 25px 60px rgba(0,0,0,0.5), 0 0 35px rgba(231, 84, 128, 0.4)'
            : '0 12px 30px rgba(216, 49, 107, 0.16), inset 0 0 0 2px rgba(255,255,255,0.7)',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        {/* Top Rose-Gold Trim Accent Bar */}
        <div
          style={{
            height: isLightbox ? '4px' : '3px',
            width: '45%',
            margin: '0 auto 8px auto',
            borderRadius: '4px',
            background: 'linear-gradient(90deg, transparent, #B76E79 25%, #F8BBD0 50%, #B76E79 75%, transparent)'
          }}
        />

        {/* Wide Adaptive Photo Window */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: `${ratio}`,
            maxHeight: isLightbox ? '75vh' : 'none',
            borderRadius: isLightbox ? '14px' : '12px',
            overflow: 'hidden',
            boxShadow: '0 6px 16px rgba(0,0,0,0.1), inset 0 0 10px rgba(0,0,0,0.12)',
            background: '#FFF0F5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={photo.image}
            alt=""
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={(e) => {
              if (!isLightbox) e.currentTarget.style.transform = 'scale(1.04)';
            }}
            onMouseLeave={(e) => {
              if (!isLightbox) e.currentTarget.style.transform = 'scale(1)';
            }}
          />

          {!isLightbox && (
            <div
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(6px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-deep-pink)',
                boxShadow: '0 3px 8px rgba(0,0,0,0.12)'
              }}
            >
              <Maximize2 size={13} />
            </div>
          )}
        </div>

        {/* Bottom Rose-Gold Trim Accent Bar */}
        <div
          style={{
            height: isLightbox ? '3px' : '2px',
            width: '60%',
            margin: '8px auto 0 auto',
            borderRadius: '4px',
            background: 'linear-gradient(90deg, transparent, #E75480 25%, #F8BBD0 50%, #E75480 75%, transparent)'
          }}
        />
      </div>
    );
  };

  /**
   * Dispatches the appropriate frame based on dynamically inspected dimensions
   */
  const renderFramedPhoto = (photo, isLightbox = false) => {
    const meta = photoMeta[photo.id];
    const frameType = meta?.frameType || 'portrait';

    switch (frameType) {
      case 'story':
        return renderStoryFrame(photo, meta, isLightbox);
      case 'square':
        return renderSquareFrame(photo, meta, isLightbox);
      case 'wide':
        return renderWideFrame(photo, meta, isLightbox);
      case 'portrait':
      default:
        return renderPortraitFrame(photo, meta, isLightbox);
    }
  };

  return (
    <div style={{ width: '100%', margin: '0 auto', paddingBottom: '20px' }}>
      {/* Category Tabs */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '36px',
          padding: '0 10px'
        }}
      >
        {memoryCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '9px 20px',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: 600,
                border: isActive
                  ? '1.5px solid var(--color-deep-pink)'
                  : '1.5px solid rgba(248, 187, 208, 0.6)',
                background: isActive
                  ? 'linear-gradient(135deg, #E75480, #D8316B)'
                  : 'rgba(255, 255, 255, 0.85)',
                color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                boxShadow: isActive
                  ? '0 6px 18px rgba(231, 84, 128, 0.35)'
                  : '0 2px 8px rgba(0, 0, 0, 0.04)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                backdropFilter: 'blur(8px)'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = '#FFE4EC';
                  e.currentTarget.style.color = '#D8316B';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.85)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Masonry Framed Photos Grid (Flows dynamically according to natural sizes) */}
      <div className="memory-masonry-grid">
        <AnimatePresence>
          {filteredMemories.map((photo, index) => (
            <motion.div
              layout
              key={photo.id}
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35 }}
              className="memory-frame-item"
              style={{
                cursor: 'pointer',
                transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => openLightbox(index)}
            >
              {renderFramedPhoto(photo, false)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal (Adaptive full-resolution frame - NO cropping, NO text) */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && filteredMemories[selectedPhotoIndex] && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1100,
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
              onClick={closeLightbox}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(25, 12, 20, 0.9)',
                backdropFilter: 'blur(14px)'
              }}
            />

            {/* Framed Lightbox Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                position: 'relative',
                zIndex: 2,
                maxWidth: 'min(90vw, 720px)',
                width: '100%',
                maxHeight: '90vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                aria-label="Close"
                style={{
                  position: 'absolute',
                  top: '-46px',
                  right: '0',
                  zIndex: 25,
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.92)',
                  color: 'var(--color-deep-pink)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <X size={20} />
              </button>

              {/* Prev Button */}
              <button
                onClick={prevPhoto}
                aria-label="Previous photo"
                className="lightbox-btn-prev"
              >
                <ChevronLeft size={26} />
              </button>

              {/* Next Button */}
              <button
                onClick={nextPhoto}
                aria-label="Next photo"
                className="lightbox-btn-next"
              >
                <ChevronRight size={26} />
              </button>

              {/* Enlarged Photo inside its exact adaptive frame */}
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {renderFramedPhoto(filteredMemories[selectedPhotoIndex], true)}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
