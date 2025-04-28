export interface Badge {
  earned: boolean;
  id: string;
  icon: string;
  title: string;
  description: string;
  requirement: (stats: UserStats) => boolean;
}

export interface UserStats {
  totalCorrectAnswers: number;
  streak: number;
  fastestAnswer: number;
  highScore: number;
  gamesWithoutHints: number;
  perfectGames: number;
}

export const badges: Badge[] = [
  {
    id: 'correct-answers',
    icon: '🎯',
    title: 'Sharp Shooter',
    description: '10 Correct Answers',
    requirement: (stats) => stats.totalCorrectAnswers >= 10,
    earned: false
  },
  {
    id: 'streak',
    icon: '🔥',
    title: 'On Fire',
    description: '3-Day Streak',
    requirement: (stats) => stats.streak >= 3,
    earned: false
  },
  {
    id: 'fast-thinker',
    icon: '⚡',
    title: 'Fast Thinker',
    description: 'Answer under 10 seconds',
    requirement: (stats) => stats.fastestAnswer < 10,
    earned: false
  },
  {
    id: 'high-scorer',
    icon: '👑',
    title: 'High Scorer',
    description: 'Score over 1000 points',
    requirement: (stats) => stats.highScore > 1000,
    earned: false
  },
  {
    id: 'hint-saver',
    icon: '💡',
    title: 'Wise One',
    description: 'Complete game without using hints',
    requirement: (stats) => stats.gamesWithoutHints > 0,
    earned: false
  },
  {
    id: 'perfect-game',
    icon: '🌟',
    title: 'Perfect Game',
    description: 'Complete a game with 100% accuracy',
    requirement: (stats) => stats.perfectGames > 0,
    earned: false
  },
];


