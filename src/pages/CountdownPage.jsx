import React from 'react';
import { motion } from 'framer-motion';
import Countdown from '../components/Countdown';

/**
 * CountdownPage (Page One)
 * - Countdown to November 24, 2026 IST
 * - Asks for passcode 042406 even after countdown is completed
 * - Supports locking again
 */
export default function CountdownPage({ onOpenSecret, onNavigateToWishes, isUnlocked, onLock }) {
  return (
    <motion.section
      key="countdown-page"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(80vh - 80px)',
        padding: '20px 0 60px 0'
      }}
    >
      <Countdown
        onOpenSecret={onOpenSecret}
        onNavigateToWishes={onNavigateToWishes}
        isUnlocked={isUnlocked}
        onLock={onLock}
      />
    </motion.section>
  );
}
