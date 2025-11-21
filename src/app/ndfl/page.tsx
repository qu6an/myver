import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import NdflProfileView from './create/components/NdflProfileView';
import { NdflProfile } from '@/types/ndflProfile';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FilePlus2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function NdflPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('ndfl_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (profile) {
    const transformedProfile: NdflProfile = {
      ...profile,
      birth_date: profile.birth_date || '',
      document_issue_date: profile.document_issue_date || '',
      address:
        profile.address &&
        typeof profile.address === 'object' &&
        'value' in profile.address
          ? { value: String((profile.address as { value: unknown }).value) }
          : { value: '' },
    };

    return <NdflProfileView profile={transformedProfile} />;
  }

  return (
    <Card className="m-auto mt-10 max-w-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Анкета НДФЛ не найдена</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center text-center">
        <FilePlus2 className="mb-4 h-16 w-16 text-gray-300" />
        <p className="mb-6 max-w-md text-gray-500">
          Для подачи сведений вам необходимо создать и заполнить анкету. Это
          займет всего несколько минут.
        </p>
        <Button asChild size="lg">
          <Link href="/ndfl/create">Создать анкету</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
