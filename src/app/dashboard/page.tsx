'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';

interface User {
  username: string;
  highScore: number;
  stats: {
    totalGamesPlayed: number;
  };
  streak: {
    current: number;
    best: number;
  };
  achievements: {
    [key: string]: boolean;
  };
}

function useAuth() {
  return {
    user: null as User | null,
    isLoading: false
  };
}

type DifficultyButton = {
  mode: 'easy' | 'medium' | 'hard';
  gradient: string;
  hoverGradient: string;
  label: string;
};

type Achievement = {
  id: 'perfect10' | 'streak3' | 'speedster' | 'riddleMaster';
  icon: string;
  label: string;
};

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading">
        <div className="h-32 w-32 animate-pulse bg-foreground/10 rounded-xl"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const difficultyButtons: DifficultyButton[] = [
    { mode: 'easy', gradient: 'from-green-500/20 to-emerald-500/20', hoverGradient: 'hover:from-green-500/30 hover:to-emerald-500/30', label: 'Easy Mode' },
    { mode: 'medium', gradient: 'from-yellow-500/20 to-orange-500/20', hoverGradient: 'hover:from-yellow-500/30 hover:to-orange-500/30', label: 'Medium Mode' },
    { mode: 'hard', gradient: 'from-red-500/20 to-rose-500/20', hoverGradient: 'hover:from-red-500/30 hover:to-rose-500/30', label: 'Hard Mode' },
  ];

  const achievements: Achievement[] = [
    { id: 'perfect10', icon: '🎯', label: 'Perfect 10' },
    { id: 'streak3', icon: '🔥', label: 'Streak 3' },
    { id: 'speedster', icon: '⚡', label: 'Speedster' },
    { id: 'riddleMaster', icon: '👑', label: 'Riddle Master' },
  ];

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-purple-900/20 to-indigo-900/20 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Welcome, {user.username}!
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="bg-foreground/10 rounded-xl p-6 backdrop-blur-sm"
              role="region"
              aria-label="Player Statistics"
            >
              <h2 className="text-2xl font-semibold mb-4">Your Stats</h2>
              <div className="space-y-2">
                <p>High Score: {user.highScore}</p>
                <p>Games Played: {user.stats.totalGamesPlayed}</p>
                <p>Current Streak: {user.streak.current}</p>
                <p>Best Streak: {user.streak.best}</p>
              </div>
            </div>

            <div
              className="bg-foreground/10 rounded-xl p-6 backdrop-blur-sm"
              role="region"
              aria-label="Player Achievements"
            >
              <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map(({ id, icon, label }) => (
                  <div
                    key={id}
                    className={`p-3 rounded-lg ${user.achievements[id] ? 'bg-purple-500/20' : 'bg-foreground/5'}`}
                    role="status"
                    aria-label={`Achievement ${label} ${user.achievements[id] ? 'Unlocked' : 'Locked'}`}
                  >
                    {icon} {label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {difficultyButtons.map(({ mode, gradient, hoverGradient, label }) => (
              <button
                key={mode}
                onClick={() => router.push(`/game/${mode}`)}
                className={`p-6 rounded-xl bg-gradient-to-r ${gradient} ${hoverGradient} transition-all`}
                aria-label={`Start ${label}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}


