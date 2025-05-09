'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { shareToSocial } from '@/utils/socialSharing';
import type { GameStats } from '@/types';

interface ShareButtonProps {
  stats: GameStats;
  className?: string;
}

export default function ShareButton({ stats, className = '' }: ShareButtonProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleShare = async (platform: 'twitter' | 'facebook' | 'whatsapp' | 'clipboard') => {
    const result = await shareToSocial(platform, stats);

    if (result.message) {
      setFeedback({
        message: result.message,
        type: result.success ? 'success' : 'error'
      });
      setTimeout(() => setFeedback(null), 2000);
    }

    setShowShareMenu(false);
  };

  // Determine color theme based on difficulty
  const getThemeColors = () => {
    switch(stats.difficulty) {
      case 'easy':
        return 'from-green-500 to-emerald-500';
      case 'medium':
        return 'from-yellow-500 to-orange-500';
      case 'hard':
        return 'from-red-500 to-rose-500';
      default:
        return 'from-purple-500 to-pink-500';
    }
  };

  const themeGradient = getThemeColors();
  const shareOptions = [
    { id: 'twitter', label: 'Share on X/Twitter', icon: '𝕏' },
    { id: 'facebook', label: 'Share on Facebook', icon: '📘' },
    { id: 'whatsapp', label: 'Share on WhatsApp', icon: '💬' },
    { id: 'clipboard', label: 'Copy to Clipboard', icon: '📋' },
  ] as const;

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className={`w-full px-6 py-3 bg-gradient-to-r ${themeGradient} rounded-lg flex items-center justify-center gap-2 transition-colors`}
        aria-label="Share Score"
      >
        <span className="font-semibold">Share Score</span>
        <span aria-hidden="true">📤</span>
      </button>

      <AnimatePresence>
        {showShareMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-full left-0 right-0 mb-2 bg-foreground/20 backdrop-blur-md rounded-lg overflow-hidden border border-foreground/20 z-10"
          >
            {shareOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleShare(option.id)}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-foreground/30 transition-colors text-left"
              >
                <span className="text-xl" aria-hidden="true">{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`absolute top-full left-0 right-0 mt-2 p-3 rounded-lg ${
              feedback.type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}
          >
            {feedback.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


