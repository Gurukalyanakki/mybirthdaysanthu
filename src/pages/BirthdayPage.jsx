import React from 'react';
import { motion } from 'framer-motion';
import BirthdayCard from '../components/BirthdayCard';

/**
 * BirthdayPage (Page Two)
 * - Birthday wishes, interactive cake, confetti, balloons
 * - Transitions to Page Three (Memories)
 */
export default function BirthdayPage({ onNavigateToMemories }) {
  return (
    <motion.section
      key="birthday-page"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(85vh - 80px)',
        padding: '20px 0 60px 0'
      }}
    >
      <BirthdayCard onNavigateToMemories={onNavigateToMemories} />
    </motion.section>
  );
}
