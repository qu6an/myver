import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@/utils/supabase/client';

interface BrandLogoUploaderProps {
  onLogoUploaded: (logoUrl: string, logoKey: string) => void; // изменено
  currentLogoUrl?: string;
  currentLogoKey?: string; // добавлено
  brandName: string;
}

export const BrandLogoUploader = ({
  onLogoUploaded,
  currentLogoUrl,
  currentLogoKey,
  brandName,
}: BrandLogoUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentLogoUrl || null
  );
  const [logoKey, setLogoKey] = useState<string | null>(currentLogoKey || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
      'image/svg+xml',
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Ошибка', {
        description: 'Поддерживаются только PNG, JPG, WEBP и SVG файлы',
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Ошибка', {
        description: 'Размер файла не должен превышать 2MB',
      });
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${brandName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('brand-logos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from('brand-logos').getPublicUrl(data.path);

      setPreviewUrl(publicUrl);
      if (logoKey && logoKey !== data.path) {
        await supabase.storage.from('brand-logos').remove([logoKey]);
      }
      setLogoKey(data.path); // сохрани ключ

      // теперь можно сохранить и URL, и ключ
      onLogoUploaded(publicUrl, data.path);

      toast('Успех', { description: 'Логотип успешно загружен' });
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Ошибка', { description: 'Не удалось загрузить логотип' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveLogo = async () => {
    if (!logoKey) return;

    try {
      const { error } = await supabase.storage
        .from('brand-logos')
        .remove([logoKey]);
      if (error) throw error;

      setPreviewUrl(null);
      setLogoKey(null);
      onLogoUploaded('', ''); // очищаем и URL, и ключ

      toast('Успех', { description: 'Логотип удален' });
    } catch (error) {
      console.error('Remove error:', error);
      toast.error('Ошибка', { description: 'Не удалось удалить логотип' });
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-white">Логотип бренда</h4>

        {previewUrl ? (
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-white p-2">
              <img
                src={previewUrl}
                alt={`${brandName} logo`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <Button
              size="sm"
              variant="destructive"
              className="absolute -top-2 -right-2 h-6 w-6 p-0"
              onClick={e => {
                e.stopPropagation();
                handleRemoveLogo();
              }}
            >
              <X className="h-3 w-3 text-white" />
            </Button>
          </div>
        ) : (
          <div className="bg-muted border-border flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed">
            <ImageIcon className="text-muted-foreground h-8 w-8" />
          </div>
        )}

        <div className="flex items-center gap-2">
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*,.svg"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="border-border hover:bg-muted bg-accent"
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? 'Загрузка...' : 'Загрузить'}
          </Button>
        </div>

        <p className="text-muted-foreground text-xs">
          Поддерживаемые форматы: PNG, JPG, WEBP, SVG. Максимальный размер: 2MB
        </p>
      </div>
    </Card>
  );
};
