'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/components/providers/SessionProvider';
import { toast } from 'sonner';
import { GameQuestion, GameSettings } from '../types';
import { getGameData, getQuestionById } from '../actions';

export const useGameInitialization = (isAnonymous: boolean) => {
  const router = useRouter();
  const { user, session } = useSession();
  const initializationStarted = useRef(false);

  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [gameId, setGameId] = useState<string | null>(null);
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    questionsPerGame: 30,
    timePerQuestion: 15000,
    maxPointsPerQuestion: 15000,
  });
  const [loading, setLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorData, setErrorData] = useState<any>(null);
  const [role, setRole] = useState<string | undefined>(undefined);
  const [questionsLength, setQuestionsLength] = useState<number>(0);

  const initializeGame = useCallback(async () => {
    setLoading(true);
    setError(null);
    setErrorData(null);
    setRole(undefined);

    try {
      const gameData = await getGameData(isAnonymous);
      // Устанавливаем роль, чтобы она была доступна в UI
      if (gameData.role !== undefined) {
        setRole(gameData.role);
      }

      // Проверяем ошибки, но для администраторов пропускаем limitExceeded
      if (gameData.error) {
        if (gameData.error === 'profile_incomplete') {
          setError(gameData.error);
          setErrorData(gameData);
          toast.error('Профиль не заполнен', {
            description:
              'Пожалуйста, заполните все поля профиля, чтобы продолжить.',
          });
          router.push('/game/profile');
          return;
        } else if (
          gameData.error === 'limitExceeded' &&
          gameData.role === 'admin'
        ) {
          // Для администраторов пропускаем ошибку limitExceeded и продолжаем инициализацию
          console.log('Admin bypassing limit exceeded error');
        } else if (gameData.error !== 'limitExceeded') {
          // Для всех остальных ошибок (кроме limitExceeded для не-админов) показываем ошибку
          setError(gameData.error);
          setErrorData(gameData);
          return;
        }
      }

      // Если ошибка limitExceeded и пользователь не админ, останавливаем инициализацию
      if (gameData.error === 'limitExceeded' && gameData.role !== 'admin') {
        setError(gameData.error);
        setErrorData(gameData);
        return;
      }

      if (!gameData.firstQuestionId || !gameData.gameId || !gameData.settings) {
        toast.error('Ошибка загрузки', {
          description: 'Не удалось получить данные игры.',
        });
        setError('data_missing');
        router.push('/game');
        return;
      }

      // Fetch the first question
      const firstQuestion = await getQuestionById(gameData.firstQuestionId);
      if (firstQuestion.error || !firstQuestion.id) {
        toast.error('Ошибка загрузки', {
          description: 'Не удалось загрузить первый вопрос.',
        });
        setError('question_load_failed');
        router.push('/game');
        return;
      }

      setQuestions([firstQuestion as GameQuestion]);
      setGameId(gameData.gameId);
      setQuestionsLength(gameData.questionsLength || 0);

      const newGameSettings = {
        questionsPerGame: gameData.settings.questions_per_game,
        timePerQuestion: gameData.settings.time_per_question,
        maxPointsPerQuestion: gameData.settings.max_points_per_question,
      };
      setGameSettings(newGameSettings);
      setGameStarted(true);
    } catch (e) {
      console.error('Error initializing game:', e);
      toast.error('Критическая ошибка', {
        description: 'Не удалось инициализировать игру. Попробуйте позже.',
      });
      setError('initialization_failed');
      router.push('/game');
    } finally {
      setLoading(false);
    }
  }, [isAnonymous, session, router]);

  useEffect(() => {
    if (!user && !isAnonymous) {
      router.push('/login');
      return;
    }

    // This ref ensures that initialization only runs once, even in StrictMode
    if (!initializationStarted.current) {
      initializationStarted.current = true;
      initializeGame();
    }
  }, [user, isAnonymous, router, initializeGame]);

  const retryInitialization = () => {
    initializationStarted.current = false;
    setGameStarted(false);
    initializeGame();
  };

  return {
    loading,
    gameStarted,
    questions,
    gameId,
    gameSettings,
    error,
    errorData,
    role,
    questionsLength,
    initializeGame,
    retryInitialization,
  };
};
