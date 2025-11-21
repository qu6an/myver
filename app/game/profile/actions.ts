'use server';

import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';

const ProfileSchema = z.object({
  first_name: z.string().min(1, 'Имя обязательно'),
  nick_name_game: z.string().min(1, 'Никнейм обязателен'),
  last_name: z.string().min(1, 'Фамилия обязательна'),
  city: z.string().min(1, 'Город обязателен'),
  phone: z.string().min(1, 'Телефон обязателен'),
  accessToken: z.string(),
});

export async function saveProfile(rawData: z.infer<typeof ProfileSchema>) {
  const validation = ProfileSchema.safeParse(rawData);
  if (!validation.success) {
    return { error: 'Неверные данные профиля.' };
  }

  const { accessToken, ...profileData } = validation.data;
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(accessToken);

  if (userError || !user) {
    return { error: 'Не удалось аутентифицировать пользователя.' };
  }

  try {
    // Update public.users table instead of game.profiles
    const { data, error: updateError } = await supabase
      .from('users')
      .update({
        first_name: profileData.first_name,
        nick_name_game: profileData.nick_name_game,
        last_name: profileData.last_name,
        city: profileData.city,
        phone: profileData.phone,
      })
      .eq('user_id', user.id);

    if (updateError) {
      throw updateError;
    }

    return { success: true };
  } catch (error: any) {
    return {
      error: error.message || 'Произошла ошибка при сохранении профиля.',
    };
  }
}
