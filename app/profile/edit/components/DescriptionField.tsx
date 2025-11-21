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
import { Textarea } from '@/components/ui/textarea';

interface DescriptionFieldProps {
  form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
}

export default function DescriptionField({ form }: DescriptionFieldProps) {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormLabel>Описание</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder="Расскажите немного о себе..."
              rows={4}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
