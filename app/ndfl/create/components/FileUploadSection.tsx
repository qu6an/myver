'use client';

import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { UploadCloud } from 'lucide-react';

interface FileUploadSectionProps {
  form: UseFormReturn<any>;
  photoPreview: string | null;
  addressPreview: string | null;
  onPhotoDropAction: (files: File[]) => void;
  onAddressDropAction: (files: File[]) => void;
}

export default function FileUploadSection({
  form,
  photoPreview,
  addressPreview,
  onPhotoDropAction,
  onAddressDropAction,
}: FileUploadSectionProps) {
  const { getRootProps: getPhotoRootProps, getInputProps: getPhotoInputProps } =
    useDropzone({
      onDrop: onPhotoDropAction,
      accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
      maxFiles: 1,
    });

  const {
    getRootProps: getAddressRootProps,
    getInputProps: getAddressInputProps,
  } = useDropzone({
    onDrop: onAddressDropAction,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
    maxFiles: 1,
  });

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <FormField
        control={form.control}
        name="passportScanPhoto"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Скан паспорта с фотографией</FormLabel>
            <FormControl>
              <div
                {...getPhotoRootProps()}
                className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-gray-400"
              >
                <input {...getPhotoInputProps()} />
                {photoPreview ? (
                  <Image
                    src={photoPreview}
                    alt="Превью скана паспорта с фото"
                    width={200}
                    height={120}
                    className="h-full w-full rounded-md object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                    <UploadCloud className="h-10 w-10" />
                    <p>Перетащите файл сюда или кликните для выбора</p>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="passportScanAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Скан паспорта с пропиской</FormLabel>
            <FormControl>
              <div
                {...getAddressRootProps()}
                className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-gray-400"
              >
                <input {...getAddressInputProps()} />
                {addressPreview ? (
                  <Image
                    src={addressPreview}
                    alt="Превью скана паспорта с пропиской"
                    width={200}
                    height={120}
                    className="h-full w-full rounded-md object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                    <UploadCloud className="h-10 w-10" />
                    <p>Перетащите файл сюда или кликните для выбора</p>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
