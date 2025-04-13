'use client';

import { useGame } from '@/context/GameContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import BackButton from '@/components/BackButton';

export default function Dashboard() {
  const { user, resetHighScore, resetGame, logout } = useGame();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) return null;

  const handleNewGame = () => {
    resetGame();
    router.push('/game');
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <BackButton />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-sm">
        <div className="w-full max-w-md backdrop-blur-md bg-foreground/10 rounded-xl sm:rounded-2xl border border-foreground/20 p-6 sm:p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-xl text-foreground/80">Welcome, {user.username}!</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-foreground/20 backdrop-blur-sm">
              <p className="text-lg mb-1">High Score</p>
              <p className="text-3xl font-mono">{user.highScore}</p>
            </div>

            <button
              onClick={handleNewGame}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              New Game
            </button>

            <button
              onClick={resetHighScore}
              className="w-full px-6 py-3 rounded-lg bg-foreground/20 text-white font-semibold hover:bg-foreground/30 transition-colors"
            >
              Reset High Score
            </button>

            <button
              onClick={handleLogout}
              className="w-full px-6 py-3 rounded-lg bg-red-500/20 text-red-400 font-semibold hover:bg-red-500/30 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}




