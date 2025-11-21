'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import axios, { AxiosError } from 'axios';

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
import { registerUser } from './actions';
import { Checkbox } from '@/components/ui/checkbox';
import { RegisterData, RegisterFormValues, registerSchema } from './types';

export default function RegisterPage() {
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      allowUserAgreement: false,
      allowPersonalPolicy: false,
      consentPersonalData: false,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: RegisterFormValues) => {
    const data: RegisterData = {
      email: values.email.toLowerCase(),
      password: values.password,
      allowUserAgreement: values.allowUserAgreement,
      allowPersonalPolicy: values.allowPersonalPolicy,
      consentPersonalData: values.consentPersonalData,
    };

    const res = await registerUser(data);

    if (res.status !== 200) {
      toast.error('Ошибка регистрации', {
        description: res.message,
      });
      return;
    }
    toast.success('Регистрация прошла успешно!', {
      description: res.message,
    });
    router.push(
      `/auth/email/confirm?email=${values.email}&allowUserAgreement=${values.allowUserAgreement}&allowPersonalPolicy=${values.allowPersonalPolicy}&consentPersonalData=${values.consentPersonalData}`
    );
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-md">
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
            <CardTitle>Регистрация</CardTitle>
            <CardDescription>
              Создайте аккаунт для доступа к порталу
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          {...field}
                        />
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Подтвердите пароль</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Повторите пароль"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormField
                    control={form.control}
                    name="allowUserAgreement"
                    render={({ field }) => (
                      <FormItem className="space-x-1">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-xs">
                          Я согласен с условиями{' '}
                          <Link
                            className="text-blue-400 underline"
                            href="https://disk.yandex.ru/i/5xtjiAFsE2y39Q"
                          >
                            пользовательского соглашения
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="allowPersonalPolicy"
                    render={({ field }) => (
                      <FormItem className="space-x-1">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-xs">
                          Я согласен с{' '}
                          <Link
                            className="text-blue-400 underline"
                            href="https://disk.yandex.ru/i/G6tzLRKi8wug5g"
                          >
                            политикой обработки персональных данных
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="consentPersonalData"
                    render={({ field }) => (
                      <FormItem className="space-x-1">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-xs">
                          Я даю согласие{' '}
                          <Link
                            className="text-blue-400 underline"
                            href="https://disk.yandex.ru/i/LR3swQ0n4DUOwg"
                          >
                            {' '}
                            на обработку персональных данных
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Уже есть аккаунт?{' '}
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  Войти
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
