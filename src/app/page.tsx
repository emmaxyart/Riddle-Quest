'use client';

import { useGame } from '@/context/GameContext';
import Link from 'next/link';
import { useState } from 'react';
import VolumeControl from '@/components/VolumeControl';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, login, isMusicPlaying, toggleMusic } = useGame();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);

  const handleStartMusic = () => {
    toggleMusic();
    setShowMusicPrompt(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      const isNewUser = !localStorage.getItem(`user_${username.trim()}`);
      login(username.trim());
      
      // Redirect new users to avatar upload page
      if (isNewUser) {
        router.push('/avatar');
      } else {
        router.push('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-sm">
      {/* Music prompt overlay */}
      {showMusicPrompt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 rounded-2xl border border-foreground/20 p-6 m-4 max-w-sm text-center">
            <h2 className="text-2xl font-bold mb-4">Enable Music?</h2>
            <p className="mb-6 text-foreground/80">Would you like to enable background music for a better gaming experience?</p>
            <div className="space-x-4">
              <button
                onClick={handleStartMusic}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Yes, Enable Music
              </button>
              <button
                onClick={() => setShowMusicPrompt(false)}
                className="px-6 py-3 rounded-lg bg-foreground/20 text-white font-semibold hover:bg-foreground/30 transition-colors"
              >
                No Thanks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-full max-w-lg bg-gradient-to-br from-purple-900/90 to-indigo-900/90 rounded-2xl border border-foreground/20 p-6 sm:p-8 shadow-2xl m-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                🧠 Welcome to the Ultimate Riddle Challenge!
              </h2>
              <button
                onClick={() => setShowInstructions(false)}
                className="text-foreground/60 hover:text-foreground/80 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4 text-foreground/80">
              <p className="text-lg">
                Are you ready to test your brainpower and have some fun? 🎉
              </p>
              
              <p>
                In this game, you will face mind-twisting riddles that will challenge your logic, creativity, and wit.
                From simple brain teasers to tricky puzzles — there is something for everyone!
              </p>
              
              <div className="bg-foreground/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">🎯 Choose your level:</h3>
                <p>Beginner, Medium, or Advanced</p>
              </div>
              
              <div className="space-y-2">
                <p>🏆 Get points for every correct answer!</p>
                <p>🎉 Confetti and cheers await your victories.</p>
                <p>😢 Get one wrong? A sad sound reminds you to try again!</p>
              </div>
              
              <p className="text-lg font-semibold mt-6">
                Are you clever enough to crack them all?
              </p>
              
              <button
                onClick={() => setShowInstructions(false)}
                className="w-full mt-6 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity"
              >
                👉 Click to Begin!
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed top-4 right-4 flex gap-4 items-center">
        <button
          onClick={() => setShowInstructions(true)}
          className="px-4 py-2 rounded-lg bg-foreground/20 hover:bg-foreground/30 transition-colors backdrop-blur-md"
        >
          Instructions
        </button>
        <div className="flex items-center gap-4">
          <VolumeControl />
          <button
            onClick={toggleMusic}
            className="px-4 py-2 rounded-lg bg-foreground/20 hover:bg-foreground/30 transition-colors backdrop-blur-md"
          >
            {isMusicPlaying ? '🔊 Music On' : '🔇 Music Off'}
          </button>
        </div>
      </div>

      <div className="w-full max-w-md backdrop-blur-md bg-foreground/10 rounded-xl sm:rounded-2xl border border-foreground/20 p-6 sm:p-8 shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Riddle Game
        </h1>

        {!user ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-3 rounded-lg bg-foreground/20 border border-foreground/30 focus:border-purple-500 transition-colors backdrop-blur-sm placeholder-foreground/50"
              required
            />
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Start Playing
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl text-center mb-4">
              Welcome back, {user.username}!
            </h2>
            <Link
              href="/dashboard"
              className="block w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-center hover:opacity-90 transition-opacity"
            >
              Go to Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}





