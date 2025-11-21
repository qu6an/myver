'use client';

import {
  useActionState,
  useTransition,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { createNdflProfile } from '../actions';

import { createClient } from '@/utils/supabase/client';
import { NdflProfile } from '@/types/ndflProfile';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import PersonalInfoSection from './PersonalInfoSection';
import DocumentInfoSection from './DocumentInfoSection';
import AddressSection from './AddressSection';
import FileUploadSection from './FileUploadSection';

const formSchema = z
  .object({
    lastName: z.string().min(1, 'Фамилия обязательна'),
    firstName: z.string().min(1, 'Имя обязательно'),
    middleName: z.string().optional(),
    hasNoMiddleName: z.boolean().default(false),
    birthDate: z.date({ required_error: 'Дата рождения обязательна' }),
    documentType: z.string().min(1, 'Тип документа обязателен'),
    documentSeries: z.string().min(1, 'Серия обязательна'),
    documentNumber: z.string().min(1, 'Номер обязателен'),
    documentIssueDate: z.date({ required_error: 'Дата выдачи обязательна' }),
    address: z.any().refine(val => val?.value, { message: 'Адрес обязателен' }),
    passportScanPhoto: z
      .any()
      .refine(file => file, { message: 'Скан паспорта с фото обязателен' }),
    passportScanAddress: z.any().refine(file => file, {
      message: 'Скан паспорта с пропиской обязателен',
    }),
  })
  .refine(data => data.hasNoMiddleName || !!data.middleName, {
    message: 'Отчество обязательно, если не отмечено, что его нет',
    path: ['middleName'],
  });

type FormValues = z.infer<typeof formSchema>;

export default function NdflCreateForm({
  profile,
  bucketName,
}: {
  profile?: NdflProfile | null;
  bucketName: string;
}) {
  const [state, formAction] = useActionState(createNdflProfile, null);
  const [isPending, startTransition] = useTransition();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [addressPreview, setAddressPreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: profile?.last_name || '',
      firstName: profile?.first_name || '',
      middleName: profile?.middle_name || '',
      hasNoMiddleName: profile?.has_no_middle_name || false,
      birthDate: profile?.birth_date ? new Date(profile.birth_date) : undefined,
      documentType: profile?.document_type || '',
      documentSeries: profile?.document_series || '',
      documentNumber: profile?.document_number || '',
      documentIssueDate: profile?.document_issue_date
        ? new Date(profile.document_issue_date)
        : undefined,
      address: profile?.address || undefined,
      passportScanPhoto: undefined,
      passportScanAddress: undefined,
    },
  });

  useEffect(() => {
    if (state?.success === true) {
      toast.success(state.message);
      form.reset();
      setPhotoPreview(null);
      setAddressPreview(null);
    } else if (state?.success === false && state.message) {
      toast.error(state.message);
    }
  }, [state, form]);

  useEffect(() => {
    if (profile) {
      const supabase = createClient();

      if (profile.passport_scan_photo) {
        const { data: photo } = supabase.storage
          .from(bucketName)
          .getPublicUrl(profile.passport_scan_photo);
        setPhotoPreview(photo.publicUrl);
      }
      if (profile.passport_scan_address) {
        const { data: address } = supabase.storage
          .from(bucketName)
          .getPublicUrl(profile.passport_scan_address);
        setAddressPreview(address.publicUrl);
      }
    }
  }, [profile]);

  useEffect(() => {
    return () => {
      // Только новые превью, созданные через createObjectURL, нужно освобождать
      if (photoPreview && photoPreview.startsWith('blob:')) {
        URL.revokeObjectURL(photoPreview);
      }
      if (addressPreview && addressPreview.startsWith('blob:')) {
        URL.revokeObjectURL(addressPreview);
      }
    };
  }, [photoPreview, addressPreview]);

  const onPhotoDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      form.setValue('passportScanPhoto', file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const onAddressDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      form.setValue('passportScanAddress', file);
      setAddressPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = form.handleSubmit(data => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (key === 'address') {
        formData.append(key, JSON.stringify(value));
      } else if (value) {
        formData.append(key, value);
      }
    });
    startTransition(() => {
      formAction(formData);
    });
  });

  return (
    <div className="rounded-lg bg-white p-8 shadow-sm">
      <h1 className="mb-2 text-2xl font-bold">
        {profile ? 'Редактирование анкеты НДФЛ' : 'Создание анкеты НДФЛ'}
      </h1>
      <p className="mb-6 text-gray-500">
        {profile
          ? 'Ваша анкета была отклонена. Внесите необходимые исправления и отправьте ее повторно.'
          : 'Заполните все поля для создания новой анкеты.'}
      </p>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-8">
          <PersonalInfoSection form={form} />
          <DocumentInfoSection form={form} />
          <AddressSection form={form} />
          <FileUploadSection
            form={form}
            photoPreview={photoPreview}
            addressPreview={addressPreview}
            onPhotoDropAction={onPhotoDrop}
            onAddressDropAction={onAddressDrop}
          />
          <Button type="submit" disabled={isPending}>
            {isPending
              ? 'Отправка...'
              : profile
                ? 'Переотправить анкету'
                : 'Отправить анкету'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
