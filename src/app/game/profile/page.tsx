'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClient } from '@/utils/supabase/client';
import { useSession } from '@/components/providers/SessionProvider';
import { toast } from 'sonner';
import { saveProfile } from './actions';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2, User, Save } from 'lucide-react';
import { formatPhoneNumber, phoneRegex } from '@/lib/handlePhoneChange';

const ProfileSchema = z.object({
  first_name: z.string().min(1, 'Имя обязательно'),
  last_name: z.string().min(1, 'Фамилия обязательна'),
  nick_name_game: z.string().min(1, 'Никнейм обязателен'),
  city: z.string().min(1, 'Город обязателен'),
  phone: z.string().regex(phoneRegex, {
    message: 'Неверный формат номера. Используйте +7 (XXX) XXX-XX-XX',
  }),
});

type ProfileFormValues = z.infer<typeof ProfileSchema>;

const Profile = () => {
  const { user, session } = useSession();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [initialProfile, setInitialProfile] = useState<
    Partial<ProfileFormValues>
  >({});

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      nick_name_game: '',
      city: '',
      phone: '',
    },
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  useEffect(() => {
    form.reset(initialProfile);
  }, [initialProfile, form]);

  const fetchProfile = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('first_name, last_name, nick_name_game, city, phone')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      const profileData = {
        first_name:
          data?.first_name ||
          user.user_metadata?.first_name ||
          user.user_metadata?.name ||
          '',
        last_name: data?.last_name || user.user_metadata?.last_name || '',
        nick_name_game:
          data?.nick_name_game ||
          user.user_metadata?.nick_name_game ||
          user.user_metadata?.nickname ||
          '',
        city: data?.city || user.user_metadata?.city || '',
        phone: data?.phone || user.user_metadata?.phone || '',
      };

      setInitialProfile(profileData);
      form.reset(profileData);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Ошибка', { description: 'Не удалось загрузить профиль' });
    } finally {
      setLoading(false);
    }
  };

  const isInitiallyFilled = (field: keyof ProfileFormValues) => {
    return !!initialProfile[field];
  };

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user?.id || !session?.access_token) {
      toast.error('Ошибка', {
        description: 'Сессия не найдена. Попробуйте войти заново.',
      });
      return;
    }

    try {
      setSaving(true);
      const result = await saveProfile({
        ...data,
        accessToken: session.access_token,
      });

      if (result.error) throw new Error(result.error);

      toast('Успешно', { description: 'Профиль обновлен' });
      setInitialProfile(data); // Update initial state after successful save
    } catch (error: any) {
      console.error('Error saving profile:', error.message || error);
      toast('Ошибка', {
        description: error.message || 'Не удалось сохранить профиль',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="game-card p-8">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="text-game-primary h-8 w-8 animate-spin" />
            <p className="text-white">Загрузка профиля...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="space-y-2 text-center">
          <div className="mb-4 flex justify-center">
            <div className="bg-game-primary flex h-16 w-16 items-center justify-center rounded-full">
              <User className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">
            Профиль пользователя
          </h1>
          <p className="text-game-secondary">
            {'Заполните профиль для продолжения игры'}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card className="game-card p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Имя *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className={`bg-background border-border text-white ${isInitiallyFilled('first_name') ? 'cursor-not-allowed opacity-50' : ''}`}
                          placeholder="Введите ваше имя"
                          disabled={isInitiallyFilled('first_name')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Фамилия *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className={`bg-background border-border text-white ${isInitiallyFilled('last_name') ? 'cursor-not-allowed opacity-50' : ''}`}
                          placeholder="Введите вашу фамилию"
                          disabled={isInitiallyFilled('last_name')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nick_name_game"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Никнейм *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className={`bg-background border-border text-white ${isInitiallyFilled('nick_name_game') ? 'cursor-not-allowed opacity-50' : ''}`}
                          placeholder="Введите никнейм"
                          disabled={isInitiallyFilled('nick_name_game')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Город *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className={`bg-background border-border text-white ${isInitiallyFilled('city') ? 'cursor-not-allowed opacity-50' : ''}`}
                          placeholder="Введите ваш город"
                          disabled={isInitiallyFilled('city')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Телефон *</FormLabel>
                      <FormControl>
                        <Input
                          className={`bg-background border-border text-white ${isInitiallyFilled('phone') ? 'cursor-not-allowed opacity-50' : ''}`}
                          disabled={isInitiallyFilled('phone')}
                          {...field}
                          type="tel"
                          placeholder="+7 (999) 999-99-99"
                          value={field.value}
                          onChange={e => {
                            const formatted = formatPhoneNumber(e.target.value);
                            field.onChange(formatted);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="text-game-secondary mt-6 text-sm">
                * Обязательные поля для продолжения игры
              </div>

              <Button
                type="submit"
                disabled={saving}
                className="game-button-primary mt-6 w-full text-white"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Сохранение...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {'Сохранить профиль'}
                  </>
                )}
              </Button>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
