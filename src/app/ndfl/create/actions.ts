'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createId } from '@paralleldrive/cuid2';
import { sanitizeFilename } from '@/lib/transliterate';

const formSchema = z.object({
  lastName: z.string().min(1, 'Фамилия обязательна'),
  firstName: z.string().min(1, 'Имя обязательно'),
  middleName: z.string().optional(),
  hasNoMiddleName: z.preprocess(val => val === 'on', z.boolean()),
  birthDate: z.string().min(1, 'Дата рождения обязательна'),
  documentType: z.string().min(1, 'Тип документа обязателен'),
  documentSeries: z.string().min(1, 'Серия обязательна'),
  documentNumber: z.string().min(1, 'Номер обязателен'),
  documentIssueDate: z.string().min(1, 'Дата выдачи обязательна'),
  address: z.string().min(1, 'Адрес обязателен'),
  passportScanPhoto: z.any(),
  passportScanAddress: z.any(),
});

export async function createNdflProfile(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: 'Пользователь не авторизован' };
  }

  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = formSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Ошибка валидации данных.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    address,
    passportScanPhoto,
    passportScanAddress,
    hasNoMiddleName,
    ...rest
  } = validatedFields.data;

  const bucketName = process.env.SUPABASE_NDFL_BUCKET_NAME || '';
  console.log('bucketName', bucketName);

  // Fetch existing profile to compare files
  const { data: existingProfile } = await supabase
    .from('ndfl_profiles')
    .select('passport_scan_photo, passport_scan_address')
    .eq('user_id', user.id)
    .single();

  const photoFile = formData.get('passportScanPhoto') as File | null;
  const addressFile = formData.get('passportScanAddress') as File | null;

  let photoPath = existingProfile?.passport_scan_photo || '';
  let addressPath = existingProfile?.passport_scan_address || '';

  // Function to upload a file and update its path
  const uploadFile = async (
    file: File,
    currentPath: string,
    fileName: string
  ) => {
    // If a new file is provided and there was an old one, remove the old one
    if (currentPath) {
      const { error: removeError } = await supabase.storage
        .from(bucketName)
        .remove([currentPath]);
      if (removeError) {
        console.warn(`Could not remove old file ${currentPath}:`, removeError);
      }
    }

    const newPath = `${user.id}/${createId()}-${sanitizeFilename(file.name)}`;
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(newPath, file);

    if (uploadError) {
      throw new Error(`Ошибка загрузки ${fileName}: ${uploadError.message}`);
    }
    return newPath;
  };

  try {
    if (photoFile && photoFile.size > 0) {
      photoPath = await uploadFile(photoFile, photoPath, 'скана с фото');
    }

    if (addressFile && addressFile.size > 0) {
      addressPath = await uploadFile(
        addressFile,
        addressPath,
        'скана с пропиской'
      );
    }
  } catch (error: any) {
    return { success: false, message: error.message };
  }

  // Ensure paths exist, either from new upload or existing profile
  if (!photoPath || !addressPath) {
    return {
      success: false,
      message: 'Сканы паспорта (фото и прописка) обязательны.',
    };
  }

  // 2. Save data to database
  try {
    const { data: validatedData } = validatedFields;

    // 2. Save NDFL profile data first
    const profileData = {
      user_id: user.id,
      last_name: validatedData.lastName,
      first_name: validatedData.firstName,
      middle_name: validatedData.middleName || null,
      has_no_middle_name: validatedData.hasNoMiddleName,
      birth_date: new Date(validatedData.birthDate).toISOString(),
      document_type: validatedData.documentType,
      document_series: validatedData.documentSeries,
      document_number: validatedData.documentNumber,
      document_issue_date: new Date(
        validatedData.documentIssueDate
      ).toISOString(),
      address: JSON.parse(validatedData.address),
      passport_scan_photo: photoPath,
      passport_scan_address: addressPath,
      status: 'PENDING' as const,
    };

    const { error: ndflUpsertError } = await supabase
      .from('ndfl_profiles')
      .upsert(profileData, { onConflict: 'user_id' });

    if (ndflUpsertError) {
      throw new Error(`Ошибка сохранения анкеты: ${ndflUpsertError.message}`);
    }

    // 3. Update user profile after successful NDFL save
    const { error: userUpdateError } = await supabase.from('users').upsert(
      {
        user_id: user.id, // Include the id for upsert
        first_name: validatedData.firstName,
        last_name: validatedData.lastName,
        middle_name: validatedData.middleName || null,
        address: JSON.parse(validatedData.address),
        full_name: `${validatedData.lastName} ${validatedData.firstName} ${
          validatedData.middleName || ''
        }`.trim(),
      },
      { onConflict: 'user_id' }
    ); // Specify conflict resolution on 'id'

    if (userUpdateError) {
      // NOTE: Profile update failed, but NDFL profile is already saved.
      // We return a success message for the NDFL save, but also inform about the profile update issue.
      console.error(
        `Ошибка обновления профиля пользователя: ${userUpdateError.message}`
      );
      return {
        success: true,
        message: `Анкета успешно отправлена, но возникла ошибка при обновлении профиля: ${userUpdateError.message}`,
      };
    }

    revalidatePath('/ndfl/history');
    revalidatePath('/profile');

    // On successful upsert, always redirect to the view page
    // to ensure the user sees the latest version of their profile.
    // This also prevents issues with stale data on the client.
    redirect('/ndfl/create');
  } catch (error: any) {
    // If something went wrong during DB operation, try to clean up any newly uploaded files
    const newFiles = [
      photoFile && photoFile.size > 0 ? photoPath : null,
      addressFile && addressFile.size > 0 ? addressPath : null,
    ].filter(Boolean) as string[];

    if (newFiles.length > 0) {
      await supabase.storage.from(bucketName).remove(newFiles);
    }

    return {
      success: false,
      message: `Ошибка сохранения в базу данных: ${error.message}`,
    };
  }
}
