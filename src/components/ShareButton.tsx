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
        className="w-full px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg flex items-center justify-center gap-2 transition-colors"
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
            className="absolute z-50 top-full mt-2 left-0 right-0 bg-foreground/10 backdrop-blur-md rounded-lg border border-foreground/20 p-2 shadow-xl"
          >
            <div className="flex flex-col gap-2">
              {shareOptions.map(({ id, label, icon }) => (
                <button
                  key={id}
                  onClick={() => handleShare(id)}
                  className="flex items-center gap-2 p-2 hover:bg-foreground/20 rounded-lg transition-colors w-full text-left"
                >
                  <span aria-hidden="true">{icon}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`absolute z-50 top-full mt-2 left-1/2 -translate-x-1/2 ${
              feedback.type === 'success' ? 'bg-green-500/90' : 'bg-red-500/90'
            } backdrop-blur-md rounded-lg px-4 py-2 whitespace-nowrap shadow-lg`}
          >
            {feedback.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

