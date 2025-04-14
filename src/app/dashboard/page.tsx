'use client';

import { useGame } from '@/context/GameContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ErrorBoundary from '@/components/ErrorBoundary';
import Image from 'next/image';
import VolumeControl from '@/components/VolumeControl';

type DifficultyButton = {
  mode: 'easy' | 'medium' | 'hard';
  gradient: string;
  hoverGradient: string;
  label: string;
};

export default function Dashboard() {
  const { user, toggleMusic, isMusicPlaying } = useGame(); // Removed logout
  const router = useRouter();
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) return null;

  const difficultyButtons: DifficultyButton[] = [
    { 
      mode: 'easy', 
      gradient: 'from-green-500/20 to-emerald-500/20', 
      hoverGradient: 'hover:from-green-500/30 hover:to-emerald-500/30', 
      label: 'Easy Mode' 
    },
    { 
      mode: 'medium', 
      gradient: 'from-yellow-500/20 to-orange-500/20', 
      hoverGradient: 'hover:from-yellow-500/30 hover:to-orange-500/30', 
      label: 'Medium Mode' 
    },
    { 
      mode: 'hard', 
      gradient: 'from-red-500/20 to-rose-500/20', 
      hoverGradient: 'hover:from-red-500/30 hover:to-rose-500/30', 
      label: 'Hard Mode' 
    },
  ];

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-purple-900/20 to-indigo-900/20 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome, {user.username}!
            </h1>
            <div className="flex items-center gap-4 md:order-last">
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMusic}
                  className="p-2 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
                  aria-label={isMusicPlaying ? 'Mute music' : 'Unmute music'}
                >
                  {isMusicPlaying ? '🔊' : '🔈'}
                </button>
                <VolumeControl />
              </div>
            </div>
          </div>

          {/* Avatar section - centered on mobile */}
          <div className="flex justify-center md:justify-end mb-8">
            <button
              onClick={() => router.push('/profile')}
              className="p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
            >
              {user.avatar ? (
                <div className="relative w-24 h-24 md:w-20 md:h-20">
                  <Image 
                    src={user.avatar} 
                    alt="Profile"
                    fill
                    className="rounded-full object-cover border-2 border-purple-500/30"
                    sizes="(max-width: 768px) 96px, 80px"
                    priority
                  />
                </div>
              ) : (
                <div className="w-24 h-24 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
              )}
            </button>
          </div>

          {/* Instructions Modal */}
          {showInstructions && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="w-full max-w-lg bg-gradient-to-br from-purple-900/90 to-indigo-900/90 rounded-2xl border border-foreground/20 p-6 sm:p-8 shadow-2xl m-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    How to Play
                  </h2>
                  <button
                    onClick={() => setShowInstructions(false)}
                    className="text-foreground/60 hover:text-foreground/80"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-4 text-foreground/80">
                  <p>🎯 Choose a difficulty level to start playing.</p>
                  <p>⏱️ Each riddle has a time limit - answer quickly for bonus points!</p>
                  <p>💡 Use hints wisely - they can help you but will reduce your final score.</p>
                  <p>🎵 Toggle background music and adjust volume to your preference.</p>
                  <p>🏆 Complete all riddles to see your final score and achievements!</p>
                </div>
                <button
                  onClick={() => setShowInstructions(false)}
                  className="mt-6 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  Got it!
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div
              className="bg-foreground/10 rounded-xl p-6 backdrop-blur-sm"
              role="region"
              aria-label="Player Statistics"
            >
              <h2 className="text-2xl font-semibold mb-4">Your Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl">👑</span>
                  <p>High Score: {user.highScore}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">💡</span>
                  <p>Hints Remaining: {user.hintsRemaining}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {difficultyButtons.map(({ mode, gradient, hoverGradient, label }) => (
              <Link
                key={mode}
                href={`/game/${mode}`}
                className={`p-6 rounded-xl bg-gradient-to-r ${gradient} ${hoverGradient} transition-all`}
              >
                <h3 className="text-xl font-semibold mb-2">{label}</h3>
                <p className="text-sm text-foreground/70">
                  {mode === 'easy' && 'Perfect for beginners. Simple riddles with generous time limits.'}
                  {mode === 'medium' && 'Challenging riddles with moderate time pressure.'}
                  {mode === 'hard' && 'Expert level riddles with strict time limits.'}
                </p>
              </Link>
            ))}
          </div>

          {/* Logout Button and Confirmation Modal removed */}
        </div>
      </div>
    </ErrorBoundary>
  );
}


