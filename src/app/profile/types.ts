import { phoneRegex } from '@/lib/handlePhoneChange';
import z from 'zod';

export const formSchema = z.object({
  email: z.string().email(),
  phone: z.string().regex(phoneRegex, {
    message: 'Неверный формат номера. Используйте +7 (XXX) XXX-XX-XX',
  }),
  city: z.string().optional(),
  region: z.string().optional(),
  country: z.string().optional(),
  gender: z.enum(['male', 'female']).optional(),
  birthDay: z.date().optional(),
  idSystem: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  middle_name: z.string(),
  organization: z.string(),
  description: z.string(),
  job_title: z
    .enum([
      'mechanic',
      'owner',
      'master_consultant',
      'manager',
      'administrator',
      'diagnost',
      'electrician',
      'supervisor',
    ])
    .optional(),
});

// Тип для данных профиля с необязательными полями
export type InsertProfile = z.infer<typeof formSchema>;
