'use client';

import { useCallback, useState } from 'react';
import { useGameInitialization } from '../hooks/useGameInitialization';
import { useGameLifecycle } from '../hooks/useGameLifecycle';
import { useGameTimer } from '../hooks/useGameTimer';
import { GameLoading } from './GameLoading';
import { GameLimitExceeded } from './GameLimitExceeded';
import { GameNotStarted } from './GameNotStarted';
import { GameHeader } from './GameHeader';
import { TimerDisplay } from './TimerDisplay';
import { BrandDisplay } from './BrandDisplay';
import { QuestionDisplay } from './QuestionDisplay';
import { AnswerGrid } from './AnswerGrid';
import { GameEndModal } from '../../components/GameEndModal';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';

export default function PlayContent({ isAnonymous }: { isAnonymous: boolean }) {
  const {
    loading,
    gameStarted,
    questions, // This is now only the initial question
    gameId,
    gameSettings,
    error,
    errorData,
    role,
    questionsLength,
    retryInitialization,
  } = useGameInitialization(isAnonymous);

  const [questionStartTime, setQuestionStartTime] = useState<number>(
    Date.now()
  );
  const [showEndModal, setShowEndModal] = useState(false);
  const [askForAuth, setAskForAuth] = useState(false);
  const router = useRouter();

  const handleNextQuestionCallback = useCallback(() => {
    setQuestionStartTime(Date.now());
  }, []);

  const lifecycle = useGameLifecycle({
    gameId,
    initialQuestion: questions.length > 0 ? questions[0] : null,
    gameSettings,
    isAnonymous,
    onNextQuestion: handleNextQuestionCallback,
    onGameEnd: () => {
      if (isAnonymous && lifecycle.currentQuestion >= 1) {
        // 0-indexed
        setAskForAuth(true);
        setShowEndModal(true);
      } else {
        const maxScores = (
          gameSettings.questionsPerGame * gameSettings.maxPointsPerQuestion
        ).toLocaleString();
        router.push(`/game/end`);
      }
    },
  });

  const handleTimeUp = () => {
    // Simulate an incorrect answer when time is up
    lifecycle.handleAnswerSelect('', gameSettings.timePerQuestion);
  };

  const timer = useGameTimer({
    gameStarted,
    isAnswered: lifecycle.isAnswered,
    questionStartTime,
    timePerQuestion: gameSettings.timePerQuestion,
    onTimeUp: handleTimeUp,
    showLimitModal: error === 'limitExceeded',
    gameCreationTime: errorData?.gameCreationTime,
    onLimitLifted: retryInitialization,
    roundState: lifecycle.roundState,
  });

  if (loading) {
    return <GameLoading />;
  }

  // Показываем GameLimitExceeded только для не-администраторов с ошибкой limitExceeded
  if (error === 'limitExceeded' && role !== 'admin') {
    return <GameLimitExceeded timeToNextGame={timer.timeToNextGame} />;
  }

  // Для не-администраторов или для администраторов с другими ошибками показываем GameNotStarted
  if (!gameStarted || !lifecycle.currentQuestionData) {
    return <GameNotStarted onRetryAction={retryInitialization} />;
  }

  const currentQ = lifecycle.currentQuestionData;
  const totalQuestions = isAnonymous
    ? questionsLength
    : gameSettings.questionsPerGame;
  const timeTaken = gameSettings.timePerQuestion - timer.timeLeft;

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-4 py-5 lg:py-10">
      <div className="w-full max-w-4xl space-y-6">
        <h2 className="mb-10 hidden text-center text-xl font-black text-white sm:block sm:text-3xl lg:text-4xl xl:text-5xl">
          АВТОМОБИЛЬНАЯ ВИКТОРИНА
        </h2>

        {lifecycle.roundState === 'showing_brand' ? (
          <div className="lg:flex lg:items-center lg:justify-center lg:gap-10">
            <div className="flex flex-col items-center justify-center space-y-6">
              <GameHeader
                isAnonymous={isAnonymous}
                currentQuestion={lifecycle.currentQuestion}
                totalQuestions={totalQuestions}
                score={lifecycle.score}
                maxPossibleScore={
                  isAnonymous
                    ? questionsLength * gameSettings.maxPointsPerQuestion
                    : gameSettings.questionsPerGame *
                      gameSettings.maxPointsPerQuestion
                }
              />
              <Card className="mb-6 p-4 max-sm:p-2">
                <h2 className="text-center text-base font-semibold text-white lg:text-xl">
                  {currentQ?.category}
                </h2>
              </Card>

              <Button
                onClick={lifecycle.handleShowQuestion}
                className="hidden h-16 w-60 border border-gray-300 text-2xl uppercase lg:block"
              >
                Далее
              </Button>
            </div>

            <BrandDisplay
              questionData={currentQ}
              onContinueAction={lifecycle.handleShowQuestion}
            />
          </div>
        ) : (
          <>
            <QuestionDisplay question={currentQ as any} />
            {lifecycle.roundState === 'showing_question' && (
              <TimerDisplay
                timeLeft={timer.timeLeft}
                timePerQuestion={gameSettings.timePerQuestion}
                isAnswered={lifecycle.isAnswered}
              />
            )}
            <AnswerGrid
              answers={(currentQ as any).shuffledAnswers}
              isAnswered={lifecycle.isAnswered}
              selectedAnswer={lifecycle.selectedAnswer}
              correctAnswer={lifecycle.correctAnswer}
              onAnswerSelect={answerText =>
                lifecycle.handleAnswerSelect(answerText, timeTaken)
              }
            />
          </>
        )}

        {/* <GameControls onAbandonGame={lifecycle.handleAbandonGame} /> */}
      </div>

      <GameEndModal
        isOpen={showEndModal}
        onClose={() => {
          setShowEndModal(false);
          setAskForAuth(false);
        }}
        score={lifecycle.correctAnswersCount}
        totalQuestions={totalQuestions}
        isAnonymous={isAnonymous}
        askForAuth={askForAuth}
      />
    </div>
  );
}
