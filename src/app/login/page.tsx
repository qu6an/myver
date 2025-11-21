'use client';

import type React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Car, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useEffect } from 'react';
import { useSession } from '@/components/providers/SessionProvider';
import { login } from './actions/login';

const loginSchema = z.object({
  email: z.string().email({ message: 'Неверный формат email' }),
  password: z.string().min(1, { message: 'Пароль не может быть пустым' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshSession } = useSession();

  useEffect(() => {
    const verified = searchParams.get('verified');
    if (verified === 'true') {
      toast.success('Email успешно подтвержден!', {
        description: 'Теперь вы можете войти в свой аккаунт.',
      });
    }
    const error = searchParams.get('error');
    if (error) {
      toast.error('Ошибка входа', {
        description: 'Неверный email или пароль. Пожалуйста, попробуйте снова.',
      });
    }
  }, [searchParams]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: LoginFormValues) => {
    const data = await login(values);

    if (data?.error) {
      toast.error('Ошибка входа', {
        description:
          data.error.message === 'Invalid login credentials'
            ? 'Неверный email или пароль.'
            : data.message,
      });
    } else {
      toast.success('Успешный вход!');
      await refreshSession();
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="mb-4 inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад на главную
          </Link>
          <div className="mb-4 flex items-center justify-center space-x-3">
            <div className="rounded-lg bg-blue-600 p-3">
              <Car className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">EVERYCAR</h1>
              <p className="text-sm text-gray-500">Портал автосервисов</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Вход в систему</CardTitle>
            <CardDescription>
              Введите ваши данные для доступа к порталу
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Введите пароль"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Вход...' : 'Войти'}
                </Button>
              </form>
            </Form>

            <div className="mt-4 text-right text-sm">
              <Link
                href="/password-reset"
                className="text-blue-600 hover:text-blue-700"
              >
                Забыли пароль?
              </Link>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Нет аккаунта?{' '}
                <Link
                  href="/register"
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  Зарегистрироваться
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
