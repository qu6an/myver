'use client';

import { insertProfile } from '../../actions';
import ProfileForm from './ProfileForm';
import { InsertProfile } from '../../types';
import { Database } from '@/types/database.types';

type ProfileData = Database['public']['Tables']['users']['Row'] & {
  phone: string | null;
  ndfl_profile: Database['public']['Tables']['ndfl_profiles']['Row'] | null;
};

interface ProfileFormWrapperProps {
  initialProfileData: ProfileData;
  isNdflApproved: boolean;
}

export default function ProfileFormWrapper({
  initialProfileData,
  isNdflApproved,
}: ProfileFormWrapperProps) {
  // Обертываем вызов insertProfile в асинхронную функцию
  const handleSubmit = async (data: InsertProfile) => {
    const result = await insertProfile(data);
    if (result?.error) {
      console.error('Ошибка при сохранении профиля:', result.error);
      return { error: result.error };
    } else {
      console.log('Профиль успешно обновлён:', data);
      return { success: true };
    }
  };

  // Подготавливаем начальные данные
  const initialData = {
    email: initialProfileData.email || '',
    phone: initialProfileData.phone || '',
    city: initialProfileData.city || '',
    region: initialProfileData.region || '',
    country: initialProfileData.country || '',
    gender: initialProfileData.gender || undefined,
    birthDay: initialProfileData.ndfl_profile?.birth_date
      ? new Date(initialProfileData.ndfl_profile.birth_date)
      : undefined,
    idSystem: initialProfileData.id_system || '',
    first_name: initialProfileData.first_name || '',
    last_name: initialProfileData.last_name || '',
    middle_name: initialProfileData.middle_name || '',
    organization: initialProfileData.organization || '',
    description: initialProfileData.description || '',
    job_title: initialProfileData.job_title || undefined,
  };

  return (
    <ProfileForm
      initialData={initialData}
      isNdflApproved={isNdflApproved}
      onSubmit={handleSubmit}
    />
  );
}
