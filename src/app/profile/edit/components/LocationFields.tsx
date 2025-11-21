'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from '../../types';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ClientOnly } from '@/components/ui/client-only';
import { AddressSuggestions } from 'react-dadata';

interface LocationFieldsProps {
  form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
}

export default function LocationFields({ form }: LocationFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Страна</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Введите страну" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="region"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Регион</FormLabel>
            <FormControl>
              <ClientOnly>
                <AddressSuggestions
                  token={process.env.NEXT_PUBLIC_DADATA_API_KEY!}
                  value={
                    field.value ? ({ value: field.value } as any) : undefined
                  }
                  onChange={suggestion => {
                    // При выборе региона сохраняем только название региона
                    field.onChange(suggestion?.data?.region_with_type || '');
                  }}
                  count={5}
                  suggestionClassName="flex flex-col px-2 py-1"
                  currentSuggestionClassName="bg-yellow"
                  containerClassName="border rounded-lg"
                  inputProps={{
                    placeholder: 'Начните вводить адрес',
                    className:
                      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
                  }}
                />
              </ClientOnly>
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
            <FormLabel>Город</FormLabel>
            <FormControl>
              <ClientOnly>
                <AddressSuggestions
                  token={process.env.NEXT_PUBLIC_DADATA_API_KEY!}
                  value={
                    field.value ? ({ value: field.value } as any) : undefined
                  }
                  onChange={suggestion => {
                    // При выборе города сохраняем только название города
                    field.onChange(suggestion?.data?.city_with_type || '');
                  }}
                  count={5}
                  suggestionClassName="flex flex-col px-2"
                  currentSuggestionClassName="bg-yellow"
                  inputProps={{
                    placeholder: 'Начните вводить адрес',
                    className:
                      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
                  }}
                />
              </ClientOnly>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
