'use client';

import { useGame } from '@/context/GameContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Avatar from '@/components/Avatar';
import BackButton from '@/components/BackButton';
import { Badge } from '@/components/Badge';
import { badges } from '@/config/badges';
import type { UserStats } from '@/config/badges';

export default function ProfilePage() {
  const { user, logout, updateUsername } = useGame();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/');
    } else {
      setNewUsername(user.username);
    }
  }, [user, router]);

  if (!user) return null;

  const userStats: UserStats = {
    totalCorrectAnswers: user?.totalCorrectAnswers || 0,
    streak: user?.streak || 0,
    fastestAnswer: user?.fastestAnswer || Infinity,
    highScore: user?.highScore || 0,
    gamesWithoutHints: user?.gamesWithoutHints || 0,
    perfectGames: user?.perfectGames || 0
  };

  const earnedBadges = badges.map(badge => ({
    ...badge,
    earned: badge.requirement(userStats),
  }));

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUsername.trim() && newUsername !== user.username) {
      updateUsername(newUsername.trim());
    }
    setIsEditing(false);
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-purple-900/20 to-indigo-900/20">
      <BackButton />
      <div className="max-w-4xl mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="backdrop-blur-md bg-foreground/10 rounded-xl border border-foreground/20 p-6">
              <div className="flex flex-col items-center">
                <Avatar
                  src={user.avatar}
                  alt={user.username}
                  size="lg"
                  className="mb-4"
                />
                <button
                  onClick={() => router.push('/avatar')}
                  className="text-sm text-purple-400 hover:text-purple-300 mb-4"
                >
                  Change Avatar
                </button>
                
                {isEditing ? (
                  <form onSubmit={handleUsernameSubmit} className="w-full">
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-foreground/20 border border-foreground/30 focus:border-purple-500"
                      autoFocus
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        type="submit"
                        className="flex-1 px-3 py-1 rounded-lg bg-purple-500 hover:bg-purple-600"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex-1 px-3 py-1 rounded-lg bg-foreground/20 hover:bg-foreground/30"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold mb-1">{user.username}</h2>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-sm text-purple-400 hover:text-purple-300"
                    >
                      Edit Username
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-center">
                  <span>Highest Score</span>
                  <span className="font-mono text-xl">{user.highScore}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Current Streak</span>
                  <span className="font-mono text-xl">{user.streak} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Hints Remaining</span>
                  <span className="font-mono text-xl">{user.hintsRemaining}</span>
                </div>
              </div>

              <button
                onClick={() => setShowConfirmLogout(true)}
                className="w-full mt-6 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="md:col-span-2">
            <div className="backdrop-blur-md bg-foreground/10 rounded-xl border border-foreground/20 p-6">
              <h2 className="text-2xl font-bold mb-6">🏆 Achievements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {earnedBadges.map((badge) => (
                  <Badge
                    key={badge.id}
                    icon={badge.icon}
                    title={badge.title}
                    description={badge.description}
                    earned={badge.earned}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showConfirmLogout && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Logout</h3>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex gap-4">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex-1 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
              <button
                onClick={() => setShowConfirmLogout(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-foreground/20 hover:bg-foreground/30"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





