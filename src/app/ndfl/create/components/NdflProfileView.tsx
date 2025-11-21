import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NdflProfile } from '@/types/ndflProfile';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';

// Helper to render label-value pairs
const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) => (
  <div className="grid grid-cols-3 gap-4">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="col-span-2 text-sm text-gray-900">{value || ' - '}</dd>
  </div>
);

// Helper for status badge
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles: { [key: string]: string } = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
  };
  const statusText: { [key: string]: string } = {
    PENDING: 'На рассмотрении',
    APPROVED: 'Одобрено',
    REJECTED: 'Отклонено',
  };

  return (
    <Badge
      className={`px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}
    >
      {statusText[status]}
    </Badge>
  );
};

export default async function NdflProfileView({
  profile,
}: {
  profile: NdflProfile;
}) {
  const supabase = await createClient();
  const bucketName = process.env.SUPABASE_NDFL_BUCKET_NAME || 'ndfl-scans';

  const { data: photo } = supabase.storage
    .from(bucketName)
    .getPublicUrl(profile.passport_scan_photo);

  const { data: address } = supabase.storage
    .from(bucketName)
    .getPublicUrl(profile.passport_scan_address);

  const photoUrl = photo?.publicUrl;
  const addressUrl = address?.publicUrl;

  return (
    <div className="rounded-lg bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="mb-2 text-2xl font-bold">Ваша анкета НДФЛ</h1>
        <StatusBadge status={profile.status} />
      </div>
      <p className="mb-6 text-gray-500">
        Ваша анкета была успешно подана. Ниже представлена информация из вашей
        анкеты.
      </p>

      <div className="space-y-6">
        {/* Personal Info */}
        <section>
          <h2 className="mb-4 border-b pb-2 text-lg font-semibold">
            Персональные данные
          </h2>
          <dl className="space-y-4">
            <InfoRow label="Фамилия" value={profile.last_name} />
            <InfoRow label="Имя" value={profile.first_name} />
            <InfoRow label="Отчество" value={profile.middle_name} />
            <InfoRow
              label="Дата рождения"
              value={new Date(profile.birth_date).toLocaleDateString('ru-RU')}
            />
            <InfoRow
              label="Дата создания"
              value={new Date(profile.created_at).toLocaleDateString('ru-RU')}
            />
          </dl>
        </section>

        {/* Document Info */}
        <section>
          <h2 className="mb-4 border-b pb-2 text-lg font-semibold">
            Данные документа
          </h2>
          <dl className="space-y-4">
            <InfoRow label="Тип документа" value={profile.document_type} />
            <InfoRow label="Серия" value={profile.document_series} />
            <InfoRow label="Номер" value={profile.document_number} />
            <InfoRow
              label="Дата выдачи"
              value={new Date(profile.document_issue_date).toLocaleDateString(
                'ru-RU'
              )}
            />
          </dl>
        </section>

        {/* Address Info */}
        <section>
          <h2 className="mb-4 border-b pb-2 text-lg font-semibold">
            Адрес прописки
          </h2>
          <dl className="space-y-4">
            <InfoRow
              label="Адрес"
              value={String(profile.address?.value || '')}
            />
          </dl>
        </section>

        {/* Scans */}
        <section>
          <h2 className="mb-4 border-b pb-2 text-lg font-semibold">
            Сканы документов
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-700">
                Скан с фотографией
              </h3>
              {photoUrl && (
                <Image
                  src={photoUrl}
                  alt="Скан паспорта с фото"
                  width={400}
                  height={250}
                  className="rounded-md border object-cover"
                />
              )}
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-700">
                Скан с пропиской
              </h3>
              {addressUrl && (
                <Image
                  src={addressUrl}
                  alt="Скан паспорта с пропиской"
                  width={400}
                  height={250}
                  className="rounded-md border object-cover"
                />
              )}
            </div>
          </div>
        </section>

        {profile.status === 'REJECTED' && profile.rejection_reason && (
          <section className="rounded-md bg-red-50 p-4">
            <h2 className="font-semibold text-red-800">Причина отклонения</h2>
            <p className="mt-2 text-sm text-red-700">
              {profile.rejection_reason}
            </p>
            <Link href="/ndfl/create">
              <Button className="mt-4">Редактировать анкету</Button>
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}
