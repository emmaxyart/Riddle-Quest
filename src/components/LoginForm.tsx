'use client';

import { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';

interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const { login } = useGame();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    const success = login(username.trim());
    if (success) {
      onSuccess();
    } else {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="w-full px-4 py-3 rounded-lg border border-foreground/30 focus:border-purple-500 transition-colors backdrop-blur-sm placeholder-foreground/50 text-foreground"
          style={{
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
            backgroundColor: 'rgba(31, 41, 55, 0.8)',
            color: '#ededed',
            WebkitTextFillColor: '#ededed',
            fontSize: '16px', // Prevents zoom on iOS
            // Override any autofill styling
            WebkitBoxShadow: '0 0 0 1000px rgba(31, 41, 55, 0.8) inset',
            boxShadow: '0 0 0 1000px rgba(31, 41, 55, 0.8) inset',
            // Ensure text is always visible
            textShadow: 'none',
            // iOS specific fixes
            WebkitTapHighlightColor: 'transparent'
          }}
          required
        />
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mt-1"
          >
            {error}
          </motion.p>
        )}
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity"
      >
        Start Playing
      </motion.button>
    </form>
  );
}
