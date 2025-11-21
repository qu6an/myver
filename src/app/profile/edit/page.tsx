'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { getProfileData } from '../actions';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import ProfileFormWrapper from './components/ProfileFormWrapper';
import { Database } from '@/types/database.types';

type ProfileData = Database['public']['Tables']['users']['Row'] & {
  phone: string | null;
  ndfl_profile: Database['public']['Tables']['ndfl_profiles']['Row'] | null;
};

export default function ProfileEditPage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await getProfileData();
        if (result.error) {
          setError(result.error);
        } else {
          setProfileData(result.profile);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-10 text-center">Загрузка...</div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="container mx-auto py-10 text-center">
        Профиль не найден.
      </div>
    );
  }

  const isNdflApproved = profileData.ndfl_profile?.status === 'APPROVED';

  return (
    <div className="container mx-auto py-10">
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle>Редактирование профиля</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileFormWrapper
            initialProfileData={profileData}
            isNdflApproved={isNdflApproved}
          />
          <div className="mt-6 flex justify-end gap-2">
            <Link href="/profile" passHref>
              <Button variant="outline">Отмена</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
