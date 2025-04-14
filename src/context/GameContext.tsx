'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { User, GameState } from '@/types';
import { playBackgroundMusic, pauseBackgroundMusic, setMusicVolume } from '@/utils/music';

interface GameContextType {
  user: User | null;
  gameState: GameState;
  isMusicPlaying: boolean;
  login: (username: string) => boolean;
  logout: () => void;
  toggleMusic: () => void;
  resetGame: () => void;
  resetHighScore: () => void;
  updateScore: (points: number, timeRemaining: number) => void;
  useHint: () => boolean;
  updateAvatar: (avatarData: string) => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const DEFAULT_GAME_STATE: GameState = {
  currentRiddle: 0,
  score: 0,
  isPlaying: false,
  multiplier: 0,
  gameMode: 'easy'  // Adding default game mode
};

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      // Set initial volume and start playing
      setMusicVolume(0.3);
      playBackgroundMusic();
      setIsMusicPlaying(true);

      return () => {
        pauseBackgroundMusic();
      };
    } catch (error) {
      console.error('Error initializing game:', error);
    }
  }, []);

  const login = (username: string): boolean => {
    try {
      if (!username.trim()) return false;

      const existingUser = localStorage.getItem(`user_${username}`);
      const newUser = existingUser 
        ? JSON.parse(existingUser)
        : {
            username,
            highScore: 0,
            lastLoginDate: new Date().toISOString(),
            hintsRemaining: 15  // Changed from 3 to 15
          };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem(`user_${username}`, JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('user');
      resetGame();
      pauseBackgroundMusic();
      setIsMusicPlaying(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const toggleMusic = () => {
    try {
      if (isMusicPlaying) {
        pauseBackgroundMusic();
      } else {
        playBackgroundMusic();
      }
      setIsMusicPlaying(!isMusicPlaying);
    } catch (error) {
      console.error('Error toggling music:', error);
    }
  };

  const resetGame = () => {
    setGameState({
      ...DEFAULT_GAME_STATE,
      currentRiddle: 0,
      score: 0,
      isPlaying: true,
    });

    // Reset user's hints if they exist
    if (user) {
      const updatedUser = {
        ...user,
        hintsRemaining: 15  // Changed from 3 to 15
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      localStorage.setItem(`user_${user.username}`, JSON.stringify(updatedUser));
    }
  };

  const resetHighScore = () => {
    try {
      if (user) {
        const updatedUser = { ...user, highScore: 0 };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        localStorage.setItem(`user_${user.username}`, JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Error resetting high score:', error);
    }
  };

  const updateScore = (points: number, timeRemaining: number) => {
    try {
      if (!user) return;

      const timeBonus = Math.floor(timeRemaining / 5);
      const totalPoints = points + timeBonus;
      const newScore = gameState.score + totalPoints;

      setGameState(prev => ({ ...prev, score: newScore }));

      if (newScore > user.highScore) {
        const updatedUser = { ...user, highScore: newScore };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        localStorage.setItem(`user_${user.username}`, JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  const useHint = (): boolean => {
    if (!user || user.hintsRemaining <= 0) return false;
    
    const updatedUser = {
      ...user,
      hintsRemaining: user.hintsRemaining - 1
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    localStorage.setItem(`user_${user.username}`, JSON.stringify(updatedUser));
    
    return true;
  };

  const updateAvatar = async (avatarData: string): Promise<void> => {
    if (!user) throw new Error('No user logged in');

    try {
      const updatedUser: User = {
        ...user,
        avatar: avatarData
      };

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      localStorage.setItem(`user_${user.username}`, JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Failed to update avatar:', error);
      throw new Error('Failed to update avatar');
    }
  };

  return (
    <GameContext.Provider value={{
      user,
      gameState,
      isMusicPlaying,
      login,
      logout,
      toggleMusic,
      resetGame,
      resetHighScore,
      updateScore,
      useHint,
      updateAvatar,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};






