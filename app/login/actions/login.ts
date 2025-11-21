'use server';

import { createClient } from '@/utils/supabase/server';

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error)
    return {
      message: `Ошибка при авторизации: ${error.message}`,
      status: 500,
      error,
    };

  if (!user)
    return {
      message: 'Пользователь не найден',
      status: 404,
    };

  // Проверяем существование игрового профиля по user_id
  const { data: gameProfile, error: profileError } = await supabase
    .schema('game')
    .from('users')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (profileError && profileError.code === 'PGRST116') {
    // Профиль не найден - создаем новый
    const { error: errorGameProfile } = await supabase
      .schema('game')
      .from('users')
      .insert({
        email: user.email, // Используем email из auth.users
        user_id: user.id,
        // Добавляем другие обязательные поля если они есть
      });

    if (errorGameProfile) {
      // Если ошибка дублирования, игнорируем (профиль уже создан параллельно)
      if (errorGameProfile.code === '23505') {
        console.log('Профиль уже создан, продолжаем...');
      } else {
        return {
          message: `Ошибка при создании профиля игры: ${errorGameProfile.message}`,
          status: 500,
          error: errorGameProfile,
        };
      }
    }
  } else if (profileError) {
    return {
      message: `Ошибка при проверке профиля игры: ${profileError.message}`,
      status: 500,
      error: profileError,
    };
  }

  return {
    message: 'Успешная авторизация',
    status: 200,
    user,
  };
};
