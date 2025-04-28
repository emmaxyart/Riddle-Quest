'use client';

import { useGame } from '@/context/GameContext';
import { useState, useEffect, useCallback } from 'react';
import Loading from '@/components/Loading';
import { Riddle } from '@/types';
import { generateHint } from '@/utils/hints';
import { playSound } from '@/utils/sounds';
import BackButton from '@/components/BackButton';
import GameComplete from '@/components/GameComplete';

export default function EasyMode() {
  const {
    user,
    gameState,
    resetGame,
    resetHighScore,
    updateScore,
    useHint,
    completeGame
  } = useGame();

  // Call useHint at the top level
  const handleHint = useHint;

  const [isLoading, setIsLoading] = useState(true);
  const [riddles, setRiddles] = useState<Riddle[]>([]);
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | null;
  }>({ message: '', type: null });
  const [startTime, setStartTime] = useState<number>(0);
  const [usedHintsThisGame, setUsedHintsThisGame] = useState(false);

  const TOTAL_RIDDLES = 40;

  const fetchRiddles = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/riddles?difficulty=easy');
      if (!response.ok) throw new Error('Failed to fetch riddles');
      const data = await response.json();
      // Ensure we only use exactly 40 riddles
      setRiddles(data.slice(0, TOTAL_RIDDLES));
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

  useEffect(() => {
    fetchRiddles();
  }, []);

  const moveToNextRiddle = useCallback(() => {
    if (currentRiddleIndex < riddles.length - 1) {
      setCurrentRiddleIndex(prev => prev + 1);
      setAnswer('');
      setShowHint(false);
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
    setTimeout(moveToNextRiddle, 2000);
  }, [moveToNextRiddle]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (!isLoading && riddles.length > 0 && currentRiddleIndex < riddles.length) {
      const startTimer = () => {
        setTimeRemaining(riddles[currentRiddleIndex].timeLimit);
        
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
      };

      startTimer();
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
      const generatedHint = generateHint(
        riddles[currentRiddleIndex].question,
        riddles[currentRiddleIndex].answer
      );
      setShowHint(true);
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
    resetGame();
    setCurrentRiddleIndex(0);
    setAnswer('');
    setShowHint(false);
    setFeedback({ message: '', type: null });
    fetchRiddles();
  };

  const calculateProgress = () => {
    return {
      current: currentRiddleIndex + 1,
      percentage: Math.round(((currentRiddleIndex + 1) / TOTAL_RIDDLES) * 100),
      remaining: TOTAL_RIDDLES - (currentRiddleIndex + 1)
    };
  };

  const calculateAchievements = (): string[] => {
    const achievements: string[] = [];
    
    // Perfect Score Achievement
    if (gameState.score === TOTAL_RIDDLES * 10) {
      achievements.push('Perfect Score');
    }
    
    // Speed Demon Achievement (average answer time less than 15 seconds)
    if (gameState.timeElapsed && gameState.correctAnswers) {
      const averageTime = gameState.timeElapsed / gameState.correctAnswers;
      if (averageTime < 15) {
        achievements.push('Speed Demon');
      }
    }
    
    // No Hints Achievement
    if (gameState.hintsUsed === 0) {
      achievements.push('No Hints Used');
    }
    
    // First Win Achievement
    if (user?.totalGames === 1) {
      achievements.push('First Win');
    }
    
    // Streak Achievement
    if (user?.streak && user.streak >= 3) {
      achievements.push('Streak Master');
    }
    
    return achievements;
  };

  useEffect(() => {
    if (currentRiddleIndex === riddles.length) {
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

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <BackButton />
      {/* Progress Bar */}
      {currentRiddleIndex < TOTAL_RIDDLES && (
        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-xs sm:text-sm">
              Progress: {progress.current} of {TOTAL_RIDDLES}
            </span>
            <span className="text-xs sm:text-sm">
              {progress.percentage}%
            </span>
          </div>
          <div className="h-1.5 sm:h-2 bg-foreground/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-in-out"
              style={{ 
                width: `${progress.percentage}%`,
                transition: 'width 0.5s ease-in-out'
              }}
            />
          </div>
          <div className="mt-1 text-xs text-foreground/60 text-center">
            {progress.remaining} questions remaining
          </div>
        </div>
      )}

      {/* Game Content */}
      {currentRiddleIndex < TOTAL_RIDDLES && riddles[currentRiddleIndex] && (
        <div className="w-full max-w-2xl backdrop-blur-md bg-foreground/10 rounded-xl sm:rounded-2xl border border-foreground/20 p-4 sm:p-6 md:p-8 shadow-2xl mt-24 sm:mt-28 mx-auto">
          {/* Timer Display */}
          <div className="mb-4 text-center">
            <span className={`text-2xl font-bold ${
              timeRemaining <= 10 ? 'text-red-500' : 'text-foreground'
            }`}>
              ⏱️ {timeRemaining}s
            </span>
          </div>

          {/* Riddle Display */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">
              Riddle #{progress.current}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90">
              {riddles[currentRiddleIndex].question}
            </p>
          </div>

          {/* Hint Display */}
          {showHint && (
            <div className="mb-6 p-4 rounded-lg bg-blue-500/20 border border-blue-500/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-400">💡</span>
                <h3 className="text-blue-400 font-semibold">Hint</h3>
              </div>
              <p className="text-blue-200">{feedback.message}</p>
            </div>
          )}

          {/* Answer Input */}
          <div className="space-y-3 sm:space-y-4">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-foreground/5 border border-foreground/20 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm text-base sm:text-lg"
              placeholder="Enter your answer..."
            />

            {/* Feedback Message */}
            {feedback.message && (
              <div className={`px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl backdrop-blur-sm text-sm sm:text-base ${
                feedback.type === 'success' ? 'bg-green-500/20 text-green-200' : 
                feedback.type === 'error' ? 'bg-red-500/20 text-red-200' : 
                'bg-blue-500/20 text-blue-200'
              }`}>
                {feedback.message}
              </div>
            )}

            {/* Game Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
              <button
                onClick={handleSubmitAnswer}
                className="col-span-1 sm:col-span-2 px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-base sm:text-lg hover:opacity-90 transition-opacity"
              >
                Submit Answer
              </button>
              
              <button
                onClick={handleShowHint}
                disabled={!user?.hintsRemaining}
                className="px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl backdrop-blur-sm bg-blue-500/20 hover:bg-blue-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                Use Hint ({user?.hintsRemaining ?? 0})
              </button>
              
              <button
                onClick={handleResetGame}
                className="px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl backdrop-blur-sm bg-yellow-500/20 hover:bg-yellow-500/30 transition-colors text-sm sm:text-base"
              >
                Reset Game
              </button>
            </div>
          </div>
        </div>
      )}

      {/* High Score Reset Button */}
      <button
        onClick={resetHighScore}
        className="fixed bottom-4 right-4 px-4 py-2 rounded-lg backdrop-blur-sm bg-red-500/20 hover:bg-red-500/30 transition-colors text-sm"
      >
        Reset High Scores
      </button>

      {/* Game Over Screen */}
      {currentRiddleIndex >= TOTAL_RIDDLES && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-2xl bg-gradient-to-br from-purple-900/90 to-indigo-900/90 rounded-2xl border border-foreground/20 p-6 sm:p-8 shadow-2xl">
            <GameComplete 
              stats={{
                score: gameState.score,
                totalRiddles: TOTAL_RIDDLES,
                difficulty: 'easy',
                achievements: calculateAchievements(),
                timeElapsed: gameState.timeElapsed,
                correctAnswers: gameState.correctAnswers,
                hintsUsed: gameState.hintsUsed
              }}
              onPlayAgain={handleResetGame}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// The completeGame function is now imported from the GameContext

