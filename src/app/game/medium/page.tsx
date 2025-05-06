'use client';

import { useGame } from '@/context/GameContext';
import { useState, useEffect, useCallback } from 'react';
import Loading from '@/components/Loading';
import { Riddle } from '@/types';
import { generateHint } from '@/utils/hints';
import { playSound } from '@/utils/sounds';
import BackButton from '@/components/BackButton';
import GameComplete from '@/components/GameComplete';
import { useRouter } from 'next/navigation';

export default function MediumMode() {
  const router = useRouter();
  const {
    user,
    gameState,
    resetGame,
    updateScore,
    useHint,
    completeGame
  } = useGame();
  
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
  const [timeRemaining, setTimeRemaining] = useState(15); // Changed from 25 to 15
  const [feedback, setFeedback] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | null;
  }>({ message: '', type: null });
  const [startTime, setStartTime] = useState<number>(0);
  const [isResetting, setIsResetting] = useState(false);
  const [isQuitting, setIsQuitting] = useState(false);

  const TOTAL_RIDDLES = 15;

  const fetchRiddles = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/riddles?difficulty=medium');
      if (!response.ok) throw new Error('Failed to fetch riddles');
      const data = await response.json();
      // Ensure we only use exactly 15 riddles for medium mode
      setRiddles(data.slice(0, TOTAL_RIDDLES));
      setTimeRemaining(15); // Medium mode now has 15 seconds per riddle
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

  useEffect(() => {
    // Set game mode to medium when component mounts
    resetGame(); 
    fetchRiddles();
  }, []);

  const moveToNextRiddle = useCallback(() => {
    if (currentRiddleIndex < riddles.length - 1) {
      setCurrentRiddleIndex(prev => prev + 1);
      setAnswer('');
      setFeedback({ message: '', type: null });
    } else {
      // Game is over
      setCurrentRiddleIndex(riddles.length);
      setFeedback({
        message: `Game Over! Final Score: ${gameState.score}`,
        type: 'info'
      });
    }
  }, [currentRiddleIndex, riddles.length, gameState.score]);

  const handleTimeUp = useCallback(() => {
    setFeedback({
      message: 'Time\'s up! Moving to next riddle...',
      type: 'error'
    });
    
    console.log('Time up for current riddle');
    // Reduced from 2000ms to 1500ms (1.5 seconds)
    setTimeout(moveToNextRiddle, 1500);
  }, [moveToNextRiddle]);

  useEffect(() => {
    if (riddles.length > 0 && currentRiddleIndex < riddles.length) {
      setTimeRemaining(riddles[currentRiddleIndex].timeLimit || 15); // Changed from 25 to 15
      setStartTime(Date.now());
    }
  }, [currentRiddleIndex, riddles]);

  useEffect(() => {
    if (isLoading || currentRiddleIndex >= riddles.length) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLoading, currentRiddleIndex, riddles.length, handleTimeUp]);

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
     
      setFeedback({
        message: `Correct! +${currentRiddle.points} points`,
        type: 'success'
      });
      // Keep the 2 second delay for correct answers
      setTimeout(moveToNextRiddle, 2000);
    } else {
      playSound('failure');
     
      setFeedback({
        message: 'Incorrect. Moving to next riddle...',
        type: 'error'
      });
      // Move to next question after 1.5 seconds for incorrect answers
      setTimeout(moveToNextRiddle, 1500);
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
      const generatedHint = generateHint(
        riddles[currentRiddleIndex].question,
        riddles[currentRiddleIndex].answer
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
    setIsResetting(true);
    resetGame();
    setCurrentRiddleIndex(0);
    setAnswer('');
    setFeedback({ message: '', type: null });
    fetchRiddles().finally(() => {
      setIsResetting(false);
    });
  };

  const calculateAchievements = (): string[] => {
    const achievements: string[] = [];
    
    // Perfect Score Achievement
    if (gameState.score === TOTAL_RIDDLES * 20) {
      achievements.push('Perfect Score');
    }
    
    // Speed Demon Achievement (average answer time less than 10 seconds for medium mode)
    if (gameState.timeElapsed && gameState.correctAnswers) {
      const averageTime = gameState.timeElapsed / gameState.correctAnswers;
      if (averageTime < 10) {
        achievements.push('Speed Demon');
      }
    }
    
    // No Hints Achievement
    if (gameState.hintsUsed === 0) {
      achievements.push('No Hints Used');
    }
    
    // Medium Master Achievement
    if (gameState.score > TOTAL_RIDDLES * 15) {
      achievements.push('Medium Master');
    }
    
    return achievements;
  };

  // Game is complete
  if (currentRiddleIndex >= riddles.length && riddles.length > 0) {
    const achievements = calculateAchievements();
    // Pass a boolean based on gameState.hintsUsed instead of usedHintsThisGame
    completeGame(gameState.hintsUsed > 0);
    
    return (
      <GameComplete 
        stats={{
          score: gameState.score,
          correctAnswers: gameState.correctAnswers,
          totalRiddles: TOTAL_RIDDLES,
          timeElapsed: gameState.timeElapsed,
          hintsUsed: gameState.hintsUsed,
          achievements: achievements,
          difficulty: "medium"
        }}
        onPlayAgain={handleResetGame}
      />
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  const currentRiddle = riddles[currentRiddleIndex];
  const progress = {
    current: currentRiddleIndex + 1,
    total: riddles.length,
    remaining: riddles.length - (currentRiddleIndex + 1)
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-yellow-900/20 to-amber-900/20">
      <BackButton />
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-md backdrop-blur-md bg-foreground/10 rounded-2xl border border-foreground/20 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Medium Mode
            </h1>
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-foreground/70">
                Score: <span className="font-bold text-yellow-400">{gameState.score}</span>
              </div>
              <div className="text-sm text-foreground/70">
                Time: <span className={`font-bold ${timeRemaining < 5 ? 'text-red-400' : 'text-yellow-400'}`}>{timeRemaining}s</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="p-4 rounded-xl bg-foreground/20 backdrop-blur-sm mb-4">
              <h2 className="text-lg font-semibold mb-2">Riddle #{progress.current}</h2>
              <p className="text-foreground/90">{currentRiddle?.question}</p>
            </div>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Your answer..."
                  className="w-full p-3 rounded-lg bg-foreground/10 border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                />
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleSubmitAnswer}
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  Submit
                </button>
                <button
                  onClick={handleShowHint}
                  disabled={!user?.hintsRemaining}
                  className={`px-4 py-2 rounded-lg border ${
                    user?.hintsRemaining
                      ? 'border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10'
                      : 'border-foreground/20 text-foreground/40'
                  } transition-colors`}
                >
                  Hint ({user?.hintsRemaining || 0})
                </button>
              </div>
            </div>
          </div>

          {feedback.message && (
            <div
              className={`p-3 rounded-lg mb-4 text-center ${
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
                className="bg-gradient-to-r from-yellow-400 to-amber-500 h-2 rounded-full"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
            <div className="mt-1 text-xs text-foreground/60 text-center">
              {progress.remaining} questions remaining
            </div>
          </div>

          <div className="flex space-x-2 mt-4">
            <button
              onClick={handleResetGame}
              disabled={isResetting}
              className="flex-1 px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-colors"
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
  );
}























