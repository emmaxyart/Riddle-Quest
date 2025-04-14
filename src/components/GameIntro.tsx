'use client';

import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState } from 'react';

export default function GameIntro() {
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const logoVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        type: "spring",
        bounce: 0.5
      }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    }
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  return (
    <div className="relative">
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-sm"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="text-8xl mb-8"
          variants={logoVariants}
        >
          🧩
        </motion.div>

        <motion.h1
          className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          Riddle Quest
        </motion.h1>

        <motion.div
          className="space-y-4 text-center mb-8"
          variants={itemVariants}
        >
          <motion.p
            className="text-xl text-foreground/80"
            variants={itemVariants}
          >
            Embark on a journey of
          </motion.p>
          <motion.p
            className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Mind-Bending Riddles
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center space-y-6"
          variants={itemVariants}
        >
          <motion.div
            className="flex space-x-4"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-center space-x-2 bg-foreground/10 rounded-lg px-4 py-2"
              whileHover={{ scale: 1.05 }}
            >
              <span>🎯</span>
              <span>Multiple Difficulties</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2 bg-foreground/10 rounded-lg px-4 py-2"
              whileHover={{ scale: 1.05 }}
            >
              <span>🏆</span>
              <span>High Scores</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex space-x-4"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-center space-x-2 bg-foreground/10 rounded-lg px-4 py-2"
              whileHover={{ scale: 1.05 }}
            >
              <span>⭐</span>
              <span>Achievements</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2 bg-foreground/10 rounded-lg px-4 py-2"
              whileHover={{ scale: 1.05 }}
            >
              <span>🎵</span>
              <span>Background Music</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.button
          className="mt-12 px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          onClick={handleLoginClick}
        >
          Begin Your Quest
        </motion.button>
      </motion.div>

      {/* Login Modal */}
      {showLoginModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowLoginModal(false)}
        >
          <motion.div
            className="w-full max-w-md backdrop-blur-md bg-foreground/10 rounded-2xl border border-foreground/20 p-8 shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center">
              Login to Begin
            </h2>
            <LoginForm onSuccess={() => router.push('/dashboard')} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

// Create a separate LoginForm component
function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const { login } = useGame();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Add your validation logic here
      if (formData.username.length < 3) {
        throw new Error('Username must be at least 3 characters long');
      }
      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      await login(formData.username);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={formData.username}
          onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
          placeholder="Username"
          className="w-full px-4 py-3 rounded-lg bg-foreground/20 border border-foreground/30 focus:border-purple-500 transition-colors backdrop-blur-sm placeholder-foreground/50"
          required
        />
      </div>
      <div>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg bg-foreground/20 border border-foreground/30 focus:border-purple-500 transition-colors backdrop-blur-sm placeholder-foreground/50"
          required
        />
      </div>
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
      <button
        type="submit"
        className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity"
      >
        Login
      </button>
    </form>
  );
}


