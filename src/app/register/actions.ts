'use server';
import { createClient } from '@/utils/supabase/server';
import { RegisterData } from './types';
import { transporter } from '@/lib/nodemailer';

export async function registerUser(values: RegisterData) {
  const supabase = await createClient();

  const {
    email,
    password,
    allowUserAgreement,
    allowPersonalPolicy,
    consentPersonalData,
  } = values;

  // Step 1: Create a new user in the auth.users table

  const { data: signUpData, error: signUpError } =
    await supabase.auth.admin.generateLink({
      type: 'signup',
      email: email,
      password: password,
    });

  console.log(signUpData);

  if (signUpError) {
    return {
      message: 'Пользователь с таким email уже существует',
      status: 400,
    };
  }

  if (!signUpData.user) {
    return {
      message: 'Не удалось создать пользователя в системе аутентификации',
      status: 500,
    };
  }

  const link = `${process.env.NEXT_PUBLIC_API_URL}/auth/email/confirm?email=${email}&allowUserAgreement=${allowUserAgreement}&allowPersonalPolicy=${allowPersonalPolicy}&consentPersonalData=${consentPersonalData}`;

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Регистрация в на портале AUTOCOM',
      html: `
         <h1>Благодарим Вас за регистрацию на портале AUTOCOM</h1>
         <p>Вы получили это письмо, потому что зарегистрировались на сайте AUTOCOM.
</p>
<p>Для подтверждения адреса электронной почты перейдите по ссылке ниже и введите код подтверждения: <b>${signUpData.properties.email_otp}
</b> 
</p>
         <a href="${link}">Подтвердить адрес электронной почты</a>
         <p> <i>
         Если вы не отправляли запрос на регистрацию, просто проигнорируйте это письмо. Адрес  вашей электронной почты не будет использован без вашего согласия.
         </i> </p>
       `,
    });

    return {
      message: 'Пожалуйста, проверьте свою почту для подтверждения аккаунта.',
      status: 200,
    };
  } catch (error) {
    console.error('Ошибка отправки письма:', error);
    return {
      message: 'Не удалось отправить письмо для сброса пароля.',
      status: 500,
    };
  }
}
