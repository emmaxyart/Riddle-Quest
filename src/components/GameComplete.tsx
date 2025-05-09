'use client';

import ShareButton from './ShareButton';
import type { GameStats } from '@/types';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface GameCompleteProps {
  stats: GameStats;
  onPlayAgain: () => void;
}

export default function GameComplete({ stats, onPlayAgain }: GameCompleteProps) {
  const percentage = (stats.score / (stats.totalRiddles * 10)) * 100;
  const [isResetting, setIsResetting] = useState(false);

  const handlePlayAgain = () => {
    setIsResetting(true);
    onPlayAgain();
    // Reset state after a short delay to show loading state
    setTimeout(() => setIsResetting(false), 500);
  };

  // Determine color theme based on difficulty
  const getThemeColors = () => {
    switch(stats.difficulty) {
      case 'easy':
        return {
          gradient: 'from-green-500 to-emerald-500',
          bg: 'bg-green-500/20',
          text: 'text-green-400',
          hover: 'hover:bg-green-500/30'
        };
      case 'medium':
        return {
          gradient: 'from-yellow-500 to-orange-500',
          bg: 'bg-yellow-500/20',
          text: 'text-yellow-400',
          hover: 'hover:bg-yellow-500/30'
        };
      case 'hard':
        return {
          gradient: 'from-red-500 to-rose-500',
          bg: 'bg-red-500/20',
          text: 'text-red-400',
          hover: 'hover:bg-red-500/30'
        };
      default:
        return {
          gradient: 'from-purple-500 to-pink-500',
          bg: 'bg-purple-500/20',
          text: 'text-purple-400',
          hover: 'hover:bg-purple-500/30'
        };
    }
  };

  const theme = getThemeColors();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className={`text-4xl font-bold mb-4 bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
          Game Complete! 🎉
        </h2>
        
        <p className="text-2xl mb-4">Final Score: {stats.score}</p>
        
        <div className="w-full bg-foreground/20 rounded-full h-4 mb-6">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(percentage, 100)}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`bg-gradient-to-r ${theme.gradient} h-4 rounded-full`}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className={`p-4 rounded-lg ${theme.bg}`}>
            <p className="text-sm opacity-70">Correct Answers</p>
            <p className="text-2xl font-bold">{stats.correctAnswers}/{stats.totalRiddles}</p>
          </div>
          
          <div className={`p-4 rounded-lg ${theme.bg}`}>
            <p className="text-sm opacity-70">Average Time</p>
            <p className="text-2xl font-bold">
              {stats.correctAnswers > 0 
                ? `${(stats.timeElapsed / stats.correctAnswers).toFixed(1)}s` 
                : "N/A"}
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${theme.bg}`}>
            <p className="text-sm opacity-70">Hints Used</p>
            <p className="text-2xl font-bold">{stats.hintsUsed}</p>
          </div>
          
          <div className={`p-4 rounded-lg ${theme.bg}`}>
            <p className="text-sm opacity-70">Difficulty</p>
            <p className="text-2xl font-bold capitalize">{stats.difficulty}</p>
          </div>
        </div>
        
        {stats.achievements.length > 0 && (
          <div className={`p-4 rounded-lg ${theme.bg} mb-6`}>
            <h3 className="text-lg font-semibold mb-2">Achievements Unlocked</h3>
            <ul className="space-y-1">
              {stats.achievements.map((achievement, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span>🏆</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <ShareButton stats={stats} />
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <button
            onClick={handlePlayAgain}
            disabled={isResetting}
            className={`w-full px-4 py-3 rounded-lg bg-gradient-to-r ${theme.gradient} text-white font-semibold hover:opacity-90 transition-opacity`}
          >
            {isResetting ? "Starting New Game..." : "Play Again"}
          </button>
          
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-lg bg-foreground/20 text-center text-white font-semibold hover:bg-foreground/30 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

