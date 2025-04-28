export interface Riddle {
  id: number;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  hint: string;
  timeLimit: number;
}

export interface User {
  username: string;
  highScore: number;
  hintsRemaining: number;
  avatar?: string;
  lastLoginDate: string;
  streak: number;
  totalGames: number;
  totalCorrectAnswers: number;
  fastestAnswer: number;
  gamesWithoutHints: number;
  perfectGames: number;
  lastPlayedDate?: string;
}

export interface GameState {
  timeElapsed: number;
  correctAnswers: number;
  hintsUsed: number;
  currentRiddle: number;
  score: number;
  isPlaying: boolean;
  gameMode: 'easy' | 'medium' | 'hard';
  multiplier: number;
}

export interface GameStats {
  score: number;
  totalRiddles: number;
  difficulty: 'easy' | 'medium' | 'hard';
  achievements: string[];
  timeElapsed: number;
  correctAnswers: number;
  hintsUsed: number;
}

export interface ShareResult {
  success: boolean;
  message?: string;
}
