'use client';

import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AddressSuggestions } from 'react-dadata';
import type { DaDataSuggestion } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { ClientOnly } from '@/components/ui/client-only';

interface AddressSectionProps {
  form: UseFormReturn<any>;
}

export default function AddressSection({ form }: AddressSectionProps) {
  return (
    <FormField
      control={form.control}
      name="address"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Адрес прописки</FormLabel>
          <FormControl>
            <ClientOnly>
              <AddressSuggestions
                token={process.env.NEXT_PUBLIC_DADATA_API_KEY!}
                value={field.value as DaDataSuggestion<any>}
                onChange={field.onChange}
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
  );
}
