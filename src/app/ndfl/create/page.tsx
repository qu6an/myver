import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { NdflProfile } from '@/types/ndflProfile';
import NdflCreateForm from './components/NdflCreateForm';
import NdflProfileView from './components/NdflProfileView';

export default async function NdflCreatePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile }: { data: NdflProfile | null } = await supabase
    .from('ndfl_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  // Если профиль существует и его статус не 'REJECTED', показываем его
  if (profile && profile.status !== 'REJECTED') {
    return <NdflProfileView profile={profile} />;
  }

  const bucketName = process.env.SUPABASE_NDFL_BUCKET_NAME || '';

  // Если профиль существует и отклонен, или если профиля нет,
  // показываем форму. Если профиль есть, передаем его данные для редактирования.
  return <NdflCreateForm profile={profile} bucketName={bucketName} />;
}
