import React, { useState } from 'react';
import { Heart, Lock, Unlock, Sparkles, Image, PartyPopper, Clock } from 'lucide-react';

/**
 * Navbar Component
 * Subtle top glassmorphism bar providing quick navigation between unlocked pages.
 * The lock pill allows locking and unlocking.
 */
export default function Navbar({ currentPage, onNavigate, isUnlocked, onOpenSecret, onLock }) {
  const [isHoveredUnlocked, setIsHoveredUnlocked] = useState(false);

  const navItems = [
    { id: 'countdown', label: 'Countdown', icon: Clock, requiresUnlock: false },
    { id: 'wishes', label: 'Wishes', icon: PartyPopper, requiresUnlock: true },
    { id: 'memories', label: 'Memories', icon: Image, requiresUnlock: true }
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: '16px',
        zIndex: 800,
        width: '100%',
        maxWidth: '720px',
        margin: '0 auto 24px auto',
        padding: '0 16px'
      }}
    >
      <nav
        className="glass-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 18px',
          borderRadius: '9999px',
          background: 'rgba(255, 255, 255, 0.85)',
          boxShadow: '0 8px 26px rgba(231, 84, 128, 0.14)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)'
        }}
      >
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('countdown')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '1rem',
            color: 'var(--text-primary)',
            userSelect: 'none'
          }}
        >
          <span
            className="animate-heart-beat"
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFE4EC, #F8BBD0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-deep-pink)'
            }}
          >
            <Heart size={16} fill="var(--color-deep-pink)" />
          </span>
          <span style={{ fontFamily: 'var(--font-serif)', letterSpacing: '0.3px' }}>
            Santhoshi's <span style={{ color: 'var(--color-deep-pink)' }}>20th</span>
          </span>
        </div>

        {/* Page Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            const isLocked = item.requiresUnlock && !isUnlocked;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (isLocked) {
                    onOpenSecret();
                  } else {
                    onNavigate(item.id);
                  }
                }}
                title={isLocked ? 'Enter secret code to unlock' : item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  background: isActive
                    ? 'linear-gradient(135deg, #E75480, #D8316B)'
                    : 'transparent',
                  color: isActive ? '#FFFFFF' : isLocked ? 'var(--text-muted)' : 'var(--text-secondary)',
                  opacity: isLocked ? 0.65 : 1,
                  transition: 'all 0.25s ease'
                }}
              >
                <Icon size={14} />
                <span className="nav-label" style={{ display: 'inline' }}>
                  {item.label}
                </span>
                {isLocked && <Lock size={12} />}
              </button>
            );
          })}
        </div>

        {/* Lock / Unlock Toggle Button */}
        <div>
          {!isUnlocked ? (
            /* When locked: click opens secret passcode modal */
            <button
              onClick={onOpenSecret}
              title="Enter Secret Key to unlock"
              style={{
                background: 'rgba(255, 240, 245, 0.9)',
                border: '1px solid var(--color-rose-pink)',
                borderRadius: '9999px',
                padding: '6px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '0.82rem',
                color: 'var(--color-deep-pink)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#FFE4EC')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 240, 245, 0.9)')}
            >
              <Lock size={13} />
              <span>Unlock</span>
            </button>
          ) : (
            /* When unlocked: click locks the website again! */
            <button
              onClick={onLock}
              onMouseEnter={() => setIsHoveredUnlocked(true)}
              onMouseLeave={() => setIsHoveredUnlocked(false)}
              title="Click to lock the celebration again"
              style={{
                background: isHoveredUnlocked ? '#FFEBEE' : '#E8F5E9',
                border: isHoveredUnlocked ? '1px solid #EF9A9A' : '1px solid #A5D6A7',
                borderRadius: '9999px',
                padding: '6px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '0.82rem',
                color: isHoveredUnlocked ? '#C62828' : '#2E7D32',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {isHoveredUnlocked ? (
                <>
                  <Lock size={13} />
                  <span>Lock Again</span>
                </>
              ) : (
                <>
                  <Unlock size={13} />
                  <span>Unlocked</span>
                </>
              )}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
