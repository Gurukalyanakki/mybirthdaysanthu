import React, { useEffect, useState } from 'react';

/**
 * FloatingHearts Component
 * - Ambient floating background hearts and rose petals
 * - Desktop interactive cursor heart trail (throttled)
 * - Click heart burst reactions
 */
export default function FloatingHearts() {
  const [cursorHearts, setCursorHearts] = useState([]);
  const [clickHearts, setClickHearts] = useState([]);

  // Desktop cursor trail
  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let lastTime = 0;
    const handleMouseMove = (e) => {
      const now = performance.now();
      // Throttle to 1 heart every 70ms to keep it smooth and elegant
      if (now - lastTime < 70) return;
      lastTime = now;

      const heartSymbols = ['💗', '💖', '🌸', '✨', '💕', '🌷'];
      const randomSymbol = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      const randomRotation = (Math.random() - 0.5) * 40;
      const randomSize = 14 + Math.random() * 12;

      const newHeart = {
        id: Math.random() + now,
        x: e.clientX,
        y: e.clientY,
        symbol: randomSymbol,
        rotation: randomRotation,
        size: randomSize
      };

      setCursorHearts((prev) => [...prev.slice(-15), newHeart]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Periodic cleanup of cursor hearts
  useEffect(() => {
    if (cursorHearts.length === 0) return;
    const timer = setTimeout(() => {
      setCursorHearts((prev) => prev.slice(1));
    }, 1000);
    return () => clearTimeout(timer);
  }, [cursorHearts]);

  // Click burst reaction
  useEffect(() => {
    const handleClick = (e) => {
      // Don't trigger on interactive inputs
      if (['INPUT', 'BUTTON', 'VIDEO'].includes(e.target.tagName)) return;

      const burstCount = 5;
      const newBursts = [];
      const symbols = ['💖', '✨', '💗', '🎀', '🌸'];

      for (let i = 0; i < burstCount; i++) {
        const angle = (i / burstCount) * 2 * Math.PI + (Math.random() * 0.4 - 0.2);
        const distance = 40 + Math.random() * 50;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        newBursts.push({
          id: Math.random() + performance.now() + i,
          x: e.clientX,
          y: e.clientY,
          dx,
          dy,
          symbol: symbols[i % symbols.length]
        });
      }

      setClickHearts((prev) => [...prev, ...newBursts]);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Periodic cleanup of click bursts
  useEffect(() => {
    if (clickHearts.length === 0) return;
    const timer = setTimeout(() => {
      setClickHearts((prev) => prev.slice(5));
    }, 900);
    return () => clearTimeout(timer);
  }, [clickHearts]);

  // Static array of background floating petals/hearts
  const ambientItems = [
    { left: '5%', duration: '18s', delay: '0s', size: '20px', symbol: '🌸' },
    { left: '15%', duration: '22s', delay: '4s', size: '16px', symbol: '💗' },
    { left: '25%', duration: '16s', delay: '2s', size: '18px', symbol: '✨' },
    { left: '38%', duration: '20s', delay: '7s', size: '22px', symbol: '🌷' },
    { left: '48%', duration: '25s', delay: '1s', size: '15px', symbol: '💖' },
    { left: '60%', duration: '19s', delay: '5s', size: '24px', symbol: '🌸' },
    { left: '72%', duration: '23s', delay: '3s', size: '17px', symbol: '💕' },
    { left: '84%', duration: '17s', delay: '8s', size: '20px', symbol: '✨' },
    { left: '94%', duration: '21s', delay: '6s', size: '18px', symbol: '🌷' }
  ];

  return (
    <>
      {/* Ambient background drifting petals */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden'
        }}
      >
        {ambientItems.map((item, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: '-50px',
              left: item.left,
              fontSize: item.size,
              animation: `petalDrift ${item.duration} linear infinite`,
              animationDelay: item.delay,
              opacity: 0.6,
              filter: 'drop-shadow(0 2px 6px rgba(231, 84, 128, 0.25))'
            }}
          >
            {item.symbol}
          </div>
        ))}
      </div>

      {/* Desktop cursor heart trails */}
      {cursorHearts.map((h) => (
        <span
          key={h.id}
          className="cursor-heart"
          style={{
            left: `${h.x}px`,
            top: `${h.y}px`,
            fontSize: `${h.size}px`,
            transform: `translate(-50%, -50%) rotate(${h.rotation}deg)`
          }}
        >
          {h.symbol}
        </span>
      ))}

      {/* Click explosion hearts */}
      {clickHearts.map((burst) => (
        <span
          key={burst.id}
          style={{
            position: 'fixed',
            left: `${burst.x}px`,
            top: `${burst.y}px`,
            pointerEvents: 'none',
            zIndex: 9999,
            fontSize: '18px',
            transform: `translate(${burst.dx}px, ${burst.dy}px) scale(1.3)`,
            opacity: 0,
            transition: 'all 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: 'drop-shadow(0 0 6px rgba(231, 84, 128, 0.5))'
          }}
        >
          {burst.symbol}
        </span>
      ))}
    </>
  );
}
