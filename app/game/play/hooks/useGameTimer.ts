'use client';

import { useState, useEffect, useCallback } from 'react';

interface GameTimerProps {
  gameStarted: boolean;
  isAnswered: boolean;
  questionStartTime: number;
  timePerQuestion: number;
  onTimeUp: () => void;
  showLimitModal: boolean;
  gameCreationTime: string | null;
  onLimitLifted: () => void;
  roundState: 'showing_brand' | 'showing_question';
}

export const useGameTimer = ({
  gameStarted,
  isAnswered,
  questionStartTime,
  timePerQuestion,
  onTimeUp,
  showLimitModal,
  gameCreationTime,
  onLimitLifted,
  roundState,
}: GameTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [timeToNextGame, setTimeToNextGame] = useState('');

  // Timer for the current question
  useEffect(() => {
    if (gameStarted && !isAnswered && roundState === 'showing_question') {
      const timer = setInterval(() => {
        const elapsedTime = Date.now() - questionStartTime;
        const remaining = Math.max(0, timePerQuestion - elapsedTime);
        setTimeLeft(remaining);

        if (remaining <= 0) {
          onTimeUp();
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [
    questionStartTime,
    isAnswered,
    gameStarted,
    timePerQuestion,
    onTimeUp,
    roundState,
  ]);

  // Timer for the game limit
  useEffect(() => {
    if (showLimitModal && gameCreationTime) {
      const creationTime = new Date(gameCreationTime);
      const startOfNextDay = new Date(creationTime);
      startOfNextDay.setDate(creationTime.getDate() + 1);
      startOfNextDay.setHours(0, 0, 0, 0);

      const updateTimer = () => {
        const now = new Date();
        const diff = startOfNextDay.getTime() - now.getTime();
        if (diff <= 0) {
          setTimeToNextGame('');
          onLimitLifted();
          return;
        }
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeToNextGame(
          `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      };

      updateTimer();
      const timerId = setInterval(updateTimer, 1000);

      return () => clearInterval(timerId);
    }
  }, [showLimitModal, gameCreationTime, onLimitLifted]);

  const resetQuestionTimer = useCallback(() => {
    setTimeLeft(timePerQuestion);
  }, [timePerQuestion]);

  return { timeLeft, timeToNextGame, resetQuestionTimer };
};
