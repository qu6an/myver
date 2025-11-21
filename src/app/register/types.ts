import z from 'zod';

export const registerSchema = z
  .object({
    email: z.string().email('Неверный формат email'),
    password: z.string().min(6, 'Пароль должен содержать не менее 6 символов'),
    confirmPassword: z.string(),
    allowUserAgreement: z.boolean(),
    allowPersonalPolicy: z.boolean(),
    consentPersonalData: z.boolean(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })
  .refine(data => data.allowUserAgreement === true, {
    message: 'Необходимо согласие c условиями пользовательского соглашения',
    path: ['allowUserAgreement'],
  })
  .refine(data => data.allowPersonalPolicy === true, {
    message: 'Необходимо согласие с политикой обработки персональных данных',
    path: ['allowPersonalPolicy'],
  })
  .refine(data => data.consentPersonalData === true, {
    message: 'Необходимо согласие на обработку персональных данных',
    path: ['consentPersonalData'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type RegisterData = Omit<RegisterFormValues, 'confirmPassword'>;
