export interface Riddle {
  id: number;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface User {
  username: string;
  highScore: number;
}

export interface GameState {
  currentRiddle: number;
  score: number;
  isPlaying: boolean;
  gameMode: 'easy' | 'medium' | 'hard';
}
