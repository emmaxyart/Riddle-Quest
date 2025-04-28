'use client';

import ShareButton from './ShareButton';
import type { GameStats } from '@/types';

interface GameCompleteProps {
  stats: GameStats;
  onPlayAgain: () => void;
}

export default function GameComplete({ stats, onPlayAgain }: GameCompleteProps) {
  const percentage = (stats.score / (stats.totalRiddles * 10)) * 100;

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Game Complete! 🎉
        </h2>
        
        <p className="text-2xl mb-4">Final Score: {stats.score}</p>
        
        <div className="w-full bg-foreground/20 rounded-full h-4 mb-6">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        {stats.achievements.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl mb-2">Achievements Earned:</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {stats.achievements.map((achievement: string) => (
                <span
                  key={achievement}
                  className="px-3 py-1 bg-foreground/20 rounded-full text-sm"
                >
                  {achievement}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <ShareButton stats={stats} />
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <button
            onClick={onPlayAgain}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Play Again
          </button>
          
          <a
            href="/dashboard"
            className="px-6 py-3 rounded-lg bg-foreground/20 text-center text-white font-semibold hover:bg-foreground/30 transition-colors"
          >
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}



