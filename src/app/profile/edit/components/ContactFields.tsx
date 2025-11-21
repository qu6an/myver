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
import { formatPhoneNumber } from '@/lib/handlePhoneChange';

interface ContactFieldsProps {
  form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
}

export default function ContactFields({ form }: ContactFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Номер телефона</FormLabel>
            <FormControl>
              <Input
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
    </>
  );
}
