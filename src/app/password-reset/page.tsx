import { toast } from 'sonner';
import { EmailForm } from './components/EmailForm';
import { createClient } from '@/utils/supabase/server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export default async function PasswordResetPage(props: {
  searchParams: SearchParams;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold">Сброс пароля</h2>
        <EmailForm />
      </div>
    </div>
  );
}
