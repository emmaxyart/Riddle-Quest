'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/context/GameContext';
import BackButton from '@/components/BackButton';
import OfflineRedirect from '@/components/OfflineRedirect';
import { Riddle } from '@/types';
import GameComplete from '@/components/GameComplete';
import { generateHint } from '@/utils/hints';
import { playSound } from '@/utils/sounds';
import Loading from '@/components/Loading';

export default function EasyMode() {
  const router = useRouter();
  const {
    user,
    gameState,
    resetGame,
    updateScore,
    useHint,
    completeGame
  } = useGame();

  // Add new state variables
  const [isResetting, setIsResetting] = useState(false);
  const [isQuitting, setIsQuitting] = useState(false);

  // Add handler for quitting game
  const handleQuitGame = () => {
    if (confirm("Are you sure you want to quit? Your progress will be lost.")) {
      setIsQuitting(true);
      router.push('/dashboard');
    }
  };

  // Call useHint at the top level
  const handleHint = useHint;

  const [isLoading, setIsLoading] = useState(true);
  const [riddles, setRiddles] = useState<Riddle[]>([]);
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | null;
  }>({ message: '', type: null });
  const [startTime, setStartTime] = useState<number>(0);
  const [usedHintsThisGame, setUsedHintsThisGame] = useState(false);

  // Add state to track game statistics
  const [gameStats, setGameStats] = useState({
    hintsUsed: 0,
    correctAnswers: 0,
    timeElapsed: 0,
    startTime: Date.now()
  });

  const TOTAL_RIDDLES = 40;

  const fetchRiddles = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/riddles?difficulty=easy');
      if (!response.ok) throw new Error('Failed to fetch riddles');
      const data = await response.json();
      
      // Shuffle the riddles to ensure randomness
      const shuffledRiddles = shuffleArray([...data]);
      
      // Ensure we only use exactly 40 riddles and no duplicates
      const uniqueRiddles = removeDuplicateRiddles(shuffledRiddles);
      
      // Take only the first TOTAL_RIDDLES
      setRiddles(uniqueRiddles.slice(0, TOTAL_RIDDLES));
      setTimeRemaining(30);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch riddles:', error);
      setFeedback({
        message: 'Failed to load riddles. Please try again.',
        type: 'error'
      });
      setIsLoading(false);
    }
  };

  // Helper function to shuffle array - no state updates here
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Helper function to remove duplicate riddles - no state updates here
  const removeDuplicateRiddles = (riddles: Riddle[]) => {
    const uniqueRiddles: Riddle[] = [];
    const seenQuestions = new Set<string>();
    
    for (const riddle of riddles) {
      // Normalize the question by removing extra spaces and converting to lowercase
      const normalizedQuestion = riddle.question.toLowerCase().trim();
      
      if (!seenQuestions.has(normalizedQuestion)) {
        seenQuestions.add(normalizedQuestion);
        uniqueRiddles.push(riddle);
      }
    }
    
    return uniqueRiddles;
  };

  useEffect(() => {
    // Reset game when component mounts
    resetGame();
    fetchRiddles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const moveToNextRiddle = useCallback(() => {
    if (currentRiddleIndex < riddles.length - 1) {
      setCurrentRiddleIndex(prev => prev + 1);
      setAnswer('');
      setFeedback({ message: '', type: null });
      setTimeRemaining(30); // Reset timer for next riddle
    } else {
      // Game is over - set index to riddles.length to trigger GameComplete
      setCurrentRiddleIndex(riddles.length);
      
      // Calculate final game stats
      const timeElapsed = Math.floor((Date.now() - gameStats.startTime) / 1000);
      setGameStats(prev => ({
        ...prev,
        timeElapsed
      }));
      
      setFeedback({
        message: `Game Over! Final Score: ${gameState.score}`,
        type: 'info'
      });
      
      // Call completeGame with the updated stats
      completeGame(gameStats.hintsUsed > 0);
    }
  }, [currentRiddleIndex, riddles.length, gameStats.startTime, gameStats.hintsUsed, gameState.score, completeGame]);

  const handleTimeUp = useCallback(() => {
    setFeedback({
      message: 'Time\'s up! Moving to next riddle...',
      type: 'error'
    });
    
    console.log('Time up for current riddle');
    setTimeout(moveToNextRiddle, 2000);
  }, [moveToNextRiddle]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (!isLoading && riddles.length > 0 && currentRiddleIndex < riddles.length) {
      // Set time remaining once at the beginning of the effect
      setTimeRemaining(riddles[currentRiddleIndex].timeLimit || 30);
      
      timerId = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerId);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [currentRiddleIndex, isLoading, riddles, handleTimeUp]);

  const handleSubmitAnswer = () => {
    if (!answer.trim()) {
      setFeedback({
        message: 'Please enter an answer',
        type: 'error'
      });
      return;
    }

    const currentRiddle = riddles[currentRiddleIndex];
    const isCorrect = answer.toLowerCase().trim() === currentRiddle.answer.toLowerCase();
    const answerTime = (Date.now() - startTime) / 1000; // Convert to seconds

    if (isCorrect) {
      playSound('success');
      updateScore(currentRiddle.points, timeRemaining, answerTime);
      
      // Track correct answer
      setGameStats(prev => ({
        ...prev,
        correctAnswers: prev.correctAnswers + 1
      }));
     
      setFeedback({
        message: `Correct! +${currentRiddle.points} points`,
        type: 'success'
      });
      setTimeout(moveToNextRiddle, 2000);
    } else {
      playSound('failure');
     
      setFeedback({
        message: 'Incorrect. Try again!',
        type: 'error'
      });
    }
  };

  const handleShowHint = useCallback(() => {
    if (!user?.hintsRemaining) {
      setFeedback({
        message: 'No hints remaining!',
        type: 'error'
      });
      return;
    }

    if (handleHint()) {
      setUsedHintsThisGame(true);
      // Track hint usage
      setGameStats(prev => ({
        ...prev,
        hintsUsed: prev.hintsUsed + 1
      }));
      
      const generatedHint = generateHint(
        riddles[currentRiddleIndex]?.question || '',
        riddles[currentRiddleIndex]?.answer || ''
      );
      setFeedback({
        message: generatedHint,
        type: 'info'
      });
    } else {
      setFeedback({
        message: 'No hints remaining!',
        type: 'error'
      });
    }
  }, [user?.hintsRemaining, handleHint, riddles, currentRiddleIndex]);

  const handleResetGame = () => {
    // Remove confirmation dialog
    setIsResetting(true);
    resetGame();
    setCurrentRiddleIndex(0);
    setAnswer('');
    setFeedback({ message: '', type: null });
    setUsedHintsThisGame(false); // Reset hints used flag
    setGameStats({
      hintsUsed: 0,
      correctAnswers: 0,
      timeElapsed: 0,
      startTime: Date.now()
    });
    
    // Start fetching riddles
    fetchRiddles();
    
    // Set a timeout to end the loading state after a short delay
    setTimeout(() => {
      setIsResetting(false);
    }, 1500); // Reduced from 5 seconds to 1.5 seconds for faster response
  };

  const calculateProgress = () => {
    return {
      current: currentRiddleIndex + 1,
      percentage: Math.round(((currentRiddleIndex + 1) / TOTAL_RIDDLES) * 100),
      remaining: TOTAL_RIDDLES - (currentRiddleIndex + 1)
    };
  };

  const calculateAchievements = () => {
    if (!user) return [];
    
    const achievements: string[] = [];
    
    // Calculate achievements based on game performance
    if (gameState.score >= TOTAL_RIDDLES * 10) {
      achievements.push('Perfect Score');
    }
    
    if (gameState.score >= 300) {
      achievements.push('High Scorer');
    }
    
    if (!usedHintsThisGame) {
      achievements.push('No Hints Used');
    }
    
    if (user?.totalGames === 1) {
      achievements.push('First Win');
    }
    
    // Streak Achievement
    if (user?.streak && user.streak >= 3) {
      achievements.push('Streak Master');
    }
    
    // Log achievements for debugging
    console.log('Calculated achievements:', achievements);
    
    return achievements;
  };

  useEffect(() => {
    if (currentRiddleIndex === riddles.length && riddles.length > 0) {
      // Call completeGame once when the game is finished
      completeGame(usedHintsThisGame);
    }
  }, [currentRiddleIndex, riddles.length, usedHintsThisGame, completeGame]);

  useEffect(() => {
    setStartTime(Date.now());
  }, [currentRiddleIndex]);

  if (isLoading) {
    return <Loading />;
  }

  const progress = calculateProgress();

  // Game is complete
  if (currentRiddleIndex >= riddles.length && riddles.length > 0) {
    // Calculate achievements based on game performance
    const achievements = calculateAchievements();
    
    // Calculate final game stats
    const timeElapsed = Math.floor((Date.now() - gameStats.startTime) / 1000);
    const correctAnswers = gameStats.correctAnswers;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const averageTime = correctAnswers > 0 ? (timeElapsed / correctAnswers).toFixed(1) : "N/A";
    
    return (
      <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
        <BackButton />
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
          <div className="w-full max-w-md backdrop-blur-md bg-foreground/10 rounded-2xl border border-foreground/20 p-8 shadow-2xl">
            <GameComplete 
              stats={{
                score: gameState.score,
                correctAnswers: correctAnswers,
                totalRiddles: TOTAL_RIDDLES,
                timeElapsed: timeElapsed,
                hintsUsed: gameStats.hintsUsed,
                achievements: achievements,
                difficulty: "easy"
              }}
              onPlayAgain={handleResetGame}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <OfflineRedirect>
      <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
        <BackButton />
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
          <div className="w-full max-w-md backdrop-blur-md bg-foreground/10 rounded-2xl border border-foreground/20 p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Easy Mode
              </h1>
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-foreground/70">
                  Score: <span className="font-bold text-green-400">{gameState.score}</span>
                </div>
                <div className="text-sm text-foreground/70">
                  Time: <span className={`font-bold ${timeRemaining < 10 ? 'text-red-400' : 'text-green-400'}`}>{timeRemaining}s</span>
                </div>
              </div>
            </div>

            {currentRiddleIndex < TOTAL_RIDDLES && riddles[currentRiddleIndex] && (
              <>
                <div className="p-4 rounded-xl bg-foreground/20 backdrop-blur-sm mb-4">
                  <h2 className="text-lg font-semibold mb-2">Riddle #{currentRiddleIndex + 1}</h2>
                  <p className="text-foreground/90">{riddles[currentRiddleIndex].question}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Your answer..."
                      className="w-full p-3 rounded-lg bg-foreground/10 border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={handleSubmitAnswer}
                      className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                      Submit
                    </button>
                    <button
                      onClick={handleShowHint}
                      disabled={!user?.hintsRemaining}
                      className={`px-4 py-2 rounded-lg border ${
                        user?.hintsRemaining
                          ? 'border-green-500/50 text-green-400 hover:bg-green-500/10'
                          : 'border-foreground/20 text-foreground/40'
                      } transition-colors`}
                    >
                      Hint ({user?.hintsRemaining || 0})
                    </button>
                  </div>
                </div>
              </>
            )}

            {feedback.message && (
              <div
                className={`p-3 rounded-lg my-4 text-center ${
                  feedback.type === 'success'
                    ? 'bg-green-500/20 text-green-400'
                    : feedback.type === 'error'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}
              >
                {feedback.message}
              </div>
            )}

            <div className="mt-4">
              <div className="w-full bg-foreground/10 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
              <div className="mt-1 text-xs text-foreground/60 text-center">
                {progress.remaining} questions remaining
              </div>
            </div>

            {/* Add reset and quit game buttons with consistent styling */}
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={handleResetGame}
                disabled={isResetting}
                className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
              >
                {isResetting ? "Resetting Game..." : "Reset Game"}
              </button>
              
              <button
                onClick={handleQuitGame}
                disabled={isQuitting}
                className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
              >
                {isQuitting ? "Quitting..." : "Quit Game"}
              </button>
            </div>
          </div>
        </div>

        {/* Game Over Screen */}
        {currentRiddleIndex >= riddles.length && riddles.length > 0 && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-2xl bg-gradient-to-br from-green-900/90 to-emerald-900/90 rounded-2xl border border-foreground/20 p-6 sm:p-8 shadow-2xl">
              <GameComplete 
                stats={{
                  score: gameState.score,
                  totalRiddles: TOTAL_RIDDLES,
                  difficulty: 'easy',
                  achievements: calculateAchievements(),
                  timeElapsed: gameState.timeElapsed || 0,
                  correctAnswers: gameState.correctAnswers || 0,
                  hintsUsed: gameState.hintsUsed || 0
                }}
                onPlayAgain={handleResetGame}
              />
            </div>
          </div>
        )}
      </div>
    </OfflineRedirect>
  );
}

// The completeGame function is now imported from the GameContext

