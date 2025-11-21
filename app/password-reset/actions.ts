'use server';

import { transporter } from '@/lib/nodemailer';
import { createClient } from '@/utils/supabase/server';

export async function sendPasswordResetEmail(email: string) {
  const supabase = await createClient();

  const { data, error: generateLinkError } =
    await supabase.auth.admin.generateLink({
      type: 'recovery',
      email: email,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/create-password`,
      },
    });

  if (generateLinkError) {
    return { error: 'Не удалось сгенерировать ссылку для сброса пароля.' };
  }
  const link = data.properties.action_link;

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Сброс пароля для AUTOCOM',
      html: `
        <h1>Сброс пароля</h1>
        <p>Вы запросили сброс пароля. Нажмите на ссылку ниже, чтобы продолжить:</p>
        <a href="${link}">Сбросить пароль</a>
        <p>Если вы не запрашивали сброс пароля, проигнорируйте это письмо.</p>
      `,
    });

    return { success: 'Ссылка для сброса пароля отправлена на вашу почту.' };
  } catch (error) {
    console.error('Ошибка отправки письма:', error);
    return { error: 'Не удалось отправить письмо для сброса пароля.' };
  }
}
