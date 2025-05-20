'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/context/GameContext';
import { Riddle } from '@/types';
import BackButton from '@/components/BackButton';
import GameComplete from '@/components/GameComplete';
import OfflineRedirect from '@/components/OfflineRedirect';
import { generateHint } from '@/utils/hints';
import { playSound } from '@/utils/sounds';
import Loading from '@/components/Loading';

export default function HardMode() {
  const router = useRouter();
  const { gameState, updateScore, resetGame, completeGame, user, useHint } = useGame();

  const [isLoading, setIsLoading] = useState(true);
  const [riddles, setRiddles] = useState<Riddle[]>([]);
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(15); // 15 seconds for hard mode
  const [feedback, setFeedback] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | null;
  }>({ message: '', type: null });
  const [startTime, setStartTime] = useState<number>(0);
  const [isResetting, setIsResetting] = useState(false);
  const [isQuitting, setIsQuitting] = useState(false);

  // Add state to track game statistics
  const [gameStats, setGameStats] = useState({
    hintsUsed: 0,
    correctAnswers: 0,
    timeElapsed: 0,
    startTime: Date.now()
  });

  const TOTAL_RIDDLES = 20; // Changed from 10 to 20 riddles for hard mode

  // Add a ref to track if the game has been completed
  const gameCompletedRef = useRef(false);

  // Add useEffect to handle game completion
  useEffect(() => {
    // Only call completeGame when the game is actually finished and not already completed
    if (
      currentRiddleIndex === riddles.length && 
      riddles.length > 0 && 
      !gameState.isComplete && 
      !gameCompletedRef.current
    ) {
      // Mark as completed to prevent multiple calls
      gameCompletedRef.current = true;
      const hasUsedHints = gameStats.hintsUsed > 0;
      completeGame(hasUsedHints);
    }
  }, [currentRiddleIndex, riddles.length, gameState.isComplete, completeGame, gameStats.hintsUsed]);

  const fetchRiddles = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching hard riddles...');
      const response = await fetch('/api/riddles?difficulty=hard');
      if (!response.ok) {
        console.error('Failed to fetch riddles:', response.status, response.statusText);
        throw new Error('Failed to fetch riddles');
      }
      const data = await response.json();
      console.log('Received riddles:', data);
      console.log('Riddles count:', data.length);
      
      // Ensure we only use exactly 10 riddles for hard mode
      setRiddles(data.slice(0, TOTAL_RIDDLES));
      setTimeRemaining(15); // Hard mode has 15 seconds per riddle
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

  const handleResetGame = () => {
    // Reset the completion ref
    gameCompletedRef.current = false;
    
    setIsResetting(true);
    resetGame();
    setCurrentRiddleIndex(0);
    setAnswer('');
    setFeedback({ message: '', type: null });
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
    }, 500);
  };

  const handleQuitGame = () => {
    if (confirm("Are you sure you want to quit? Your progress will be lost.")) {
      setIsQuitting(true);
      router.push('/dashboard');
    }
  };

  const moveToNextRiddle = useCallback(() => {
    if (currentRiddleIndex < riddles.length - 1) {
      setCurrentRiddleIndex(prev => prev + 1);
      setAnswer('');
      setFeedback({ message: '', type: null });
      setTimeRemaining(15); // Reset timer for next riddle
    } else if (currentRiddleIndex === riddles.length - 1) {
      // Only update to riddles.length if we're at the last riddle
      // This prevents multiple updates if already at the end
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
    }
  }, [currentRiddleIndex, riddles.length, gameState.score, gameStats.startTime]);

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
      // Clear the answer field to let them try again
      setAnswer('');
      // Don't automatically move to next riddle
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

    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (useHint()) {
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
  }, [user?.hintsRemaining, useHint, riddles, currentRiddleIndex]);

  useEffect(() => {
    // Only reset game and fetch riddles on initial mount
    const initializeGame = async () => {
      resetGame();
      await fetchRiddles();
    };
    
    initializeGame();
    // Empty dependency array means this only runs once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Only set up timer when we have riddles and aren't at the end
    if (
      riddles.length > 0 && 
      currentRiddleIndex < riddles.length && 
      !isLoading && 
      !isResetting
    ) {
      // Set start time only once when the riddle changes
      setStartTime(Date.now());
      
      // Set up interval for countdown
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Use a timeout to avoid state updates during render
            setTimeout(() => moveToNextRiddle(), 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Clean up interval on unmount or when dependencies change
      return () => clearInterval(timer);
    }
  }, [riddles.length, currentRiddleIndex, isLoading, isResetting, moveToNextRiddle]);

  // Memoize the calculateAchievements function to prevent recalculations on every render
  const calculateAchievements = useCallback(() => {
    const achievements: string[] = [];
    
    // Add achievements based on game performance
    if (gameStats.correctAnswers === TOTAL_RIDDLES) {
      achievements.push("Perfect Score! 🏆");
    }
    
    if (gameStats.hintsUsed === 0) {
      achievements.push("No Hints Used! 🧠");
    }
    
    if (gameState.score > 150) {
      achievements.push("High Scorer! 🌟");
    }
    
    if (gameStats.timeElapsed < TOTAL_RIDDLES * 10) {
      achievements.push("Speed Demon! ⚡");
    }
    
    return achievements;
  }, [gameStats.correctAnswers, gameStats.hintsUsed, gameStats.timeElapsed, gameState.score, TOTAL_RIDDLES]);

  if (isLoading) {
    return <Loading />;
  }

  // Game is complete
  if (currentRiddleIndex >= riddles.length && riddles.length > 0) {
    const achievements = calculateAchievements();
    
    return (
      <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-red-900/20 to-rose-900/20">
        <BackButton />
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
          <div className="w-full max-w-md backdrop-blur-md bg-foreground/10 rounded-2xl border border-foreground/20 p-8 shadow-2xl">
            <GameComplete 
              stats={{
                score: gameState.score,
                correctAnswers: gameStats.correctAnswers,
                totalRiddles: TOTAL_RIDDLES,
                timeElapsed: gameStats.timeElapsed,
                hintsUsed: gameStats.hintsUsed,
                achievements: achievements,
                difficulty: "hard"
              }}
              onPlayAgain={handleResetGame}
            />
          </div>
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentRiddle = riddles[currentRiddleIndex];

  return (
    <OfflineRedirect>
      <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-red-900/20 to-rose-900/20">
        <BackButton />
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
          <div className="w-full max-w-md backdrop-blur-md bg-foreground/10 rounded-2xl border border-foreground/20 p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent">
                Hard Mode
              </h1>
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-foreground/70">
                  Score: <span className="font-bold text-red-400">{gameState.score}</span>
                </div>
                <div className="text-sm text-foreground/70">
                  Time: <span className={`font-bold ${timeRemaining < 5 ? 'text-red-400' : 'text-red-400'}`}>{timeRemaining}s</span>
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
                      className="w-full p-3 rounded-lg bg-foreground/10 border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={handleSubmitAnswer}
                      className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                      Submit
                    </button>
                    <button
                      onClick={handleShowHint}
                      disabled={!user?.hintsRemaining}
                      className={`px-4 py-2 rounded-lg border ${
                        user?.hintsRemaining
                          ? 'border-red-500/50 text-red-400 hover:bg-red-500/10'
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
                  className="bg-gradient-to-r from-red-400 to-rose-500 h-2 rounded-full"
                  style={{ width: `${(currentRiddleIndex / TOTAL_RIDDLES) * 100}%` }}
                />
              </div>
              <div className="mt-1 text-xs text-foreground/60 text-center">
                {TOTAL_RIDDLES - currentRiddleIndex} questions remaining
              </div>
            </div>
            
            {/* Add reset and quit game buttons with red theme styling */}
            <div className="flex space-x-2 mt-6">
              <button
                onClick={handleResetGame}
                disabled={isResetting}
                className="flex-1 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
              >
                {isResetting ? "Resetting Game..." : "Reset Game"}
              </button>
              <button
                onClick={handleQuitGame}
                disabled={isQuitting}
                className="flex-1 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
              >
                {isQuitting ? "Quitting Game..." : "Quit Game"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </OfflineRedirect>
  );
}

