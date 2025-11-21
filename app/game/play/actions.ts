'use server';

import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';

const questionTables = [
  'easy_questions',
  'lite_questions',
  'lite_questions2',
  'normal_questions',
  'hard_questions',
  'hard_questions2',
] as const;

const AnswerSchema = z.object({
  gameId: z.string(),
  questionId: z.string(),
  answer: z.string(),
  timeTaken: z.number().int().nonnegative(),
  accessToken: z.string().optional(),
});

const GameResultSchema = z.object({
  totalScore: z.number(),
  correctAnswers: z.number(),
  totalQuestions: z.number(),
  gameId: z.string(),
  accessToken: z.string().optional(),
  isAnonymous: z.boolean().optional(),
});

export async function getGameData(isAnonymous: boolean): Promise<{
  firstQuestionId?: string;
  gameId?: string;
  settings?: any;
  error?: string;
  role?: string;
  gameCreationTime?: string;
  questionsLength?: number;
}> {
  const supabase = await createClient();

  try {
    let user = null;
    let role = null;
    if (!isAnonymous) {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      user = data.user;
      if (!user) {
        return {
          error: 'Не удалось аутентифицировать пользователя по токену.',
        };
      }

      const { data: profile, error: profileError } = await supabase
        .schema('public')
        .from('users')
        .select('last_name, nick_name_game, first_name, city, role, phone')
        .eq('user_id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      const isProfileComplete =
        profile &&
        profile.first_name &&
        profile.last_name &&
        profile.nick_name_game &&
        profile.city &&
        profile.role &&
        profile.phone;

      if (!isProfileComplete) {
        return { error: 'profile_incomplete' };
      }
      role = profile.role as string;

      const { data: activeGame, error: activeGameError } = await supabase
        .schema('game')
        .from('active_game')
        .select('id, created_at, question_pool')
        .eq('user_id', user.id)
        .single();

      if (activeGameError && activeGameError.code !== 'PGRST116') {
        throw activeGameError;
      }

      if (activeGame && activeGame.created_at) {
        const gameCreationTime = new Date(activeGame.created_at);

        // Устанавливаем часовой пояс на Москву (UTC+3)
        const moscowOffset = 3 * 60 * 1000;
        const nowInMoscow = new Date(Date.now() + moscowOffset);
        const gameTimeInMoscow = new Date(
          gameCreationTime.getTime() + moscowOffset
        );

        // Получаем начало текущего дня в Москве
        const startOfTodayInMoscow = new Date(nowInMoscow);
        startOfTodayInMoscow.setUTCHours(0, 0, 0, 0);

        if (gameTimeInMoscow >= startOfTodayInMoscow) {
          // Игра была сегодня, блокируем создание новой.
          // Но для администраторов возвращаем все необходимые данные для запуска игры
          const { data: gameSettings, error: settingsError } = await supabase
            .schema('game')
            .from('game_settings')
            .select(
              'questions_per_game, time_per_question, max_points_per_question'
            )
            .single();

          if (settingsError || !gameSettings) {
            console.error('Error fetching game settings:', settingsError);
            throw new Error('Could not load game settings.');
          }

          // Загружаем вопросы для администратора
          let selectedQuestionIds: string[] = [];
          const questionsPerCategory = 5;
          const allQuestionsPromises = questionTables.map(async table => {
            const { data, error } = await supabase
              .schema('game')
              .from(table)
              .select('id');
            if (error) throw error;
            return data
              .map(q => q.id)
              .sort(() => 0.5 - Math.random())
              .slice(0, questionsPerCategory);
          });

          const results = await Promise.all(allQuestionsPromises);
          selectedQuestionIds = results.flat();

          if (selectedQuestionIds.length === 0) {
            return { error: 'Не удалось найти ни одного вопроса для игры.' };
          }

          if (role === 'admin') {
            // Для администраторов возвращаем все данные для запуска игры
            // Используем оригинальные вопросы из активной игры, чтобы игра могла продолжаться
            const questionPool = activeGame.question_pool as string[];
            return {
              firstQuestionId:
                questionPool && questionPool.length > 0
                  ? questionPool[0]
                  : selectedQuestionIds[0],
              gameId: activeGame.id,
              settings: gameSettings,
              error: 'limitExceeded',
              gameCreationTime: activeGame.created_at,
              role: role || undefined,
              questionsLength: selectedQuestionIds.length,
            };
          } else {
            // Для обычных пользователей возвращаем только ошибку
            return {
              error: 'limitExceeded',
              gameCreationTime: activeGame.created_at,
              role: role || undefined,
            };
          }
        } else {
          // Игра истекла, удаляем ее
          await supabase
            .schema('game')
            .from('active_game')
            .delete()
            .eq('id', activeGame.id);
        }
      }
    }

    const { data: gameSettings, error: settingsError } = await supabase
      .schema('game')
      .from('game_settings')
      .select('questions_per_game, time_per_question, max_points_per_question')
      .single();

    if (settingsError || !gameSettings) {
      console.error('Error fetching game settings:', settingsError);
      throw new Error('Could not load game settings.');
    }

    let selectedQuestionIds: string[] = [];
    if (isAnonymous) {
      const { data: testQuestions, error: easyError } = await supabase
        .schema('game')
        .from('test_questions')
        .select('id');

      if (easyError) throw easyError;

      selectedQuestionIds = testQuestions
        .map(q => q.id)
        .sort(() => 0.5 - Math.random())
        .splice(0, 5);
    } else {
      const questionsPerCategory = 5;
      const allQuestionsPromises = questionTables.map(async table => {
        const { data, error } = await supabase
          .schema('game')
          .from(table)
          .select('id');
        if (error) throw error;
        return data
          .map(q => q.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, questionsPerCategory);
      });

      const results = await Promise.all(allQuestionsPromises);
      selectedQuestionIds = results.flat();
    }

    if (selectedQuestionIds.length === 0) {
      return { error: 'Не удалось найти ни одного вопроса для игры.' };
    }

    let gameSession;
    if (isAnonymous) {
      const { data, error } = await supabase
        .schema('game')
        .from('anonim_game')
        .insert({ question_pool: selectedQuestionIds })
        .select('id')
        .single();
      if (error) throw error;
      gameSession = data;
    } else {
      if (!user) {
        return { error: 'Пользователь не найден для создания игры.' };
      }
      const { data, error } = await supabase
        .schema('game')
        .from('active_game')
        .insert({
          user_id: user.id,
          question_pool: selectedQuestionIds,
        })
        .select('id')
        .single();
      if (error) {
        console.error('Error creating game session:', error);
        if (error.code === '23505') {
          return {
            error:
              'Активная игра уже существует. Пожалуйста, обновите страницу.',
          };
        }
        throw new Error('Could not create game session.');
      }
      gameSession = data;
    }

    if (!gameSession) {
      throw new Error('Could not create game session.');
    }

    return {
      firstQuestionId: selectedQuestionIds[0],
      gameId: gameSession.id,
      settings: gameSettings,
      role: role || undefined,
      questionsLength: selectedQuestionIds.length,
    };
  } catch (error) {
    console.error('Error in getGameData:', error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Произошла серверная ошибка при подготовке игры.';
    return { error: errorMessage };
  }
}

export async function getQuestionById(
  questionId: string,
  reveal: boolean = false,
  isAnonymous: boolean = false
) {
  const supabase = await createClient();
  if (!questionId) return { error: 'ID вопроса не предоставлен.' };
  const questionTables = [
    'easy_questions',
    'lite_questions',
    'lite_questions2',
    'normal_questions',
    'hard_questions',
    'hard_questions2',
    'test_questions',
  ] as const;
  for (const table of questionTables) {
    const selectFields = reveal
      ? 'id, question, brand, category, logo_url, answer_1, answer_2, answer_3, answer_4'
      : 'id, brand, category, logo_url';

    const { data, error } = await supabase
      .schema('game')
      .from(table)
      .select(selectFields)
      .eq('id', questionId)
      .single();

    if (error && error.code !== 'PGRST116') {
      // Continue to next table if not found
    } else if (data) {
      if (reveal) {
        const questionData = data as any;
        const answers = [
          { text: questionData.answer_1 },
          { text: questionData.answer_2 },
          { text: questionData.answer_3 },
          { text: questionData.answer_4 },
        ].filter(a => a.text);

        for (let i = answers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        return {
          id: questionData.id,
          question: questionData.question,
          brand: questionData.brand,
          category: questionData.category,
          logo_url: questionData.logo_url,
          shuffledAnswers: answers,
        };
      } else {
        const brandData = data as any;
        return {
          id: brandData.id,
          brand: brandData.brand,
          category: brandData.category,
          logo_url: brandData.logo_url,
        };
      }
    }
  }
  return { error: 'Вопрос не найден.' };
}

export async function submitAnswer(rawData: {
  gameId: string;
  questionId: string;
  answer: string;
  timeTaken: number;
  accessToken?: string;
  isAnonymous?: boolean;
}) {
  const questionTables = [
    'easy_questions',
    'lite_questions',
    'lite_questions2',
    'normal_questions',
    'hard_questions',
    'hard_questions2',
    'test_questions',
  ] as const;
  const validation = AnswerSchema.safeParse(rawData);
  if (!validation.success) {
    return { error: 'Неверные данные ответа.' };
  }

  const { gameId, questionId, answer, timeTaken } = validation.data;
  const { isAnonymous } = rawData;
  const supabase = await createClient();

  try {
    let questionData: { correct_answer: string | null } | null = null;
    for (const table of questionTables) {
      const { data, error } = await supabase
        .schema('game')
        .from(table)
        .select('correct_answer')
        .eq('id', questionId)
        .single();
      if (data) {
        questionData = data;
        break;
      }
      if (error && error.code !== 'PGRST116') throw error;
    }

    if (!questionData) return { error: 'Вопрос не найден.' };

    const { data: settingsData, error: settingsError } = await supabase
      .schema('game')
      .from('game_settings')
      .select('time_per_question')
      .single();
    if (settingsError || !settingsData)
      return { error: 'Настройки игры не найдены.' };

    const isCorrect = questionData.correct_answer === answer;
    let score = 0;
    if (isCorrect) {
      const timeRemaining = Math.max(
        0,
        settingsData.time_per_question - timeTaken
      );
      score = Math.floor(timeRemaining);
    }

    const gameTable = isAnonymous ? 'anonim_game' : 'active_game';
    const { data: gameSession, error: gameError } = await supabase
      .schema('game')
      .from(gameTable)
      .select('question_pool')
      .eq('id', gameId)
      .single();

    if (gameError || !gameSession)
      return { error: 'Игровая сессия не найдена.' };

    const questionPool = gameSession.question_pool as string[];
    const currentIndex = questionPool.indexOf(questionId);
    const nextQuestionId =
      currentIndex < questionPool.length - 1
        ? questionPool[currentIndex + 1]
        : null;

    return {
      isCorrect,
      score,
      correctAnswer: questionData.correct_answer || '',
      nextQuestionId,
    };
  } catch (error) {
    console.error('Error submitting answer:', error);
    return { error: 'Ошибка при проверке ответа.' };
  }
}

export async function saveGameResult(rawData: {
  totalScore: number;
  correctAnswers: number;
  totalQuestions: number;
  gameId: string;
  accessToken?: string;
  isAnonymous?: boolean;
}) {
  const validation = GameResultSchema.safeParse(rawData);
  if (!validation.success) {
    return { error: 'Неверные данные результата игры.' };
  }

  const {
    totalScore,
    gameId,
    accessToken,
    isAnonymous = false,
    correctAnswers,
    totalQuestions,
  } = validation.data;
  const supabase = await createClient();

  if (!isAnonymous && !accessToken) {
    return { error: 'Необходим токен доступа для сохранения результата.' };
  }

  let user = null;
  if (!isAnonymous) {
    const {
      data: { user: authUser },
      error: userError,
    } = await supabase.auth.getUser(accessToken!);

    if (userError || !authUser) {
      return { error: 'Не удалось аутентифицировать пользователя.' };
    }

    user = authUser;
  }

  try {
    let profile = null;
    if (user) {
      const { data: profileData } = await supabase
        .schema('game')
        .from('profiles')
        .select('name, surname, nickname')
        .eq('user_id', user.id)
        .single();

      profile = profileData;
    }

    if (!isAnonymous) {
      const { error: historyError } = await supabase
        .schema('game')
        .from('history_games')
        .insert({
          user_id: user!.id,
          email: user!.email,
          points: totalScore,
          name: profile?.name,
          surname: profile?.surname,
          nickname: profile?.nickname,
          correct_answers: correctAnswers,
          total_questions: totalQuestions,
        });
      if (historyError) throw historyError;

      const { error: ratingsError } = await supabase
        .schema('game')
        .from('ratings')
        .upsert(
          {
            user_email: user!.email!,
            name: profile?.name,
            surname: profile?.surname,
            nickname: profile?.nickname,
            points: totalScore,
            last_game: new Date().toISOString(),
          },
          { onConflict: 'user_email' }
        );
      if (ratingsError) throw ratingsError;
    }

    if (user) {
      const ticketNumber = Math.random()
        .toString(36)
        .substring(2, 14)
        .toUpperCase();
      await supabase.schema('game').from('tickets').insert({
        user_id: user.id,
        user_email: user.email,
        number: ticketNumber,
      });
      await supabase.from('user_activities').insert({
        activity_type: 'game',
        title: 'Игра завершена',
        description: `Игра окончена, получен билет №${ticketNumber}`,
        user_id: user.id,
        link: '/game/end',
      });
    }

    const gameTable = isAnonymous ? 'anonim_game' : 'active_game';
    const { error: deleteError } = await supabase
      .schema('game')
      .from(gameTable)
      .delete()
      .eq('id', gameId);
    if (deleteError) throw deleteError;

    return { success: true };
  } catch (error) {
    console.error('Error saving game result:', error);
    return { error: 'Не удалось сохранить результат игры.' };
  }
}
