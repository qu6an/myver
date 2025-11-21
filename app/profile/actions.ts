'use server';

import { createClient } from '@/utils/supabase/server';
import { Database } from '@/types/database.types';
import { InsertProfile } from './types';

type ProfileData = Database['public']['Tables']['users']['Row'] & {
  phone: string | null;
  ndfl_profile: Database['public']['Tables']['ndfl_profiles']['Row'] | null;
};

export async function getProfileData(): Promise<{
  profile: ProfileData | null;
  error: string | null;
}> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { profile: null, error: 'Пользователь не авторизован' };
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (userError) {
    console.error('Ошибка при загрузке пользователя:', userError);
    return {
      profile: null,
      error: 'Не удалось загрузить данные пользователя.',
    };
  }

  if (!userData) {
    return { profile: null, error: 'Профиль пользователя не найден.' };
  }

  const { data: ndflData, error: ndflError } = await supabase
    .from('ndfl_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (ndflError && ndflError.code !== 'PGRST116') {
    // PGRST116 - это ошибка "No rows found", которую мы можем игнорировать
    console.error('Ошибка при загрузке профиля НДФЛ:', ndflError);
    return { profile: null, error: 'Не удалось загрузить данные НДФЛ.' };
  }

  const combinedData: ProfileData = {
    ...userData,
    ndfl_profile: ndflData || null,
  };

  return { profile: combinedData, error: null };
}

export async function insertProfile(data: InsertProfile) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: 'Пользователь не авторизован' };

  // Подготовим данные для обновления, исключая поля, которые не должны быть в таблице users
  const { birthDay, idSystem, job_title, gender, ...userData } = data;

  const roleMap: Record<string, string> = {
    owner: 'employee',
    supervisor: 'employee',

    administrator: 'master_consultant',
    master_consultant: 'master_consultant',
    manager: 'master_consultant',

    diagnost: 'mechanic',
    mechanic: 'mechanic',
    electrician: 'mechanic',
  };

  const role = roleMap[job_title as string] ?? 'user';
  // Обновим профиль пользователя
  const { error } = await supabase
    .from('users')
    .update({
      ...userData,
      birth_day: birthDay ? birthDay.toISOString() : null,
      job_title: job_title as
        | 'mechanic'
        | 'owner'
        | 'master_consultant'
        | 'manager'
        | 'administrator'
        | 'diagnost'
        | 'electrician'
        | 'supervisor'
        | null,
      gender: gender as 'male' | 'female' | null,
      role: role as
        | 'user'
        | 'employee'
        | 'master_consultant'
        | 'admin'
        | 'mechanic'
        | null,
    })
    .eq('user_id', user.id);

  if (error) {
    console.error('Ошибка при обновлении профиля:', error);
    return { error: 'Не удалось обновить профиль пользователя.' };
  }

  return { success: true };
}
