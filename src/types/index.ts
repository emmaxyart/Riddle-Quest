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
  lastLoginDate?: string;
}

export interface GameState {
  currentRiddle: number;
  score: number;
  isPlaying: boolean;
  gameMode: 'easy' | 'medium' | 'hard';
  multiplier: number;
}
