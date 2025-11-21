import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Settings,
  Save,
  RotateCcw,
  Clock,
  Users,
  Trophy,
  FileText,
  Bell,
  Loader2,
} from 'lucide-react';
import { GameSettingsType, useGameSettings } from '../../hooks/useGameSettings';
import { toast } from 'sonner';

export const GameSettings = () => {
  const { settings: dbSettings, loading, saveSettings } = useGameSettings();

  const [settings, setSettings] = useState<GameSettingsType>(dbSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  // Update local settings when database settings load
  useEffect(() => {
    setSettings(dbSettings);
    setHasChanges(false);
  }, [dbSettings]);

  const updateSetting = (key: keyof GameSettingsType, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const success = await saveSettings(settings);

    if (success) {
      toast('Настройки сохранены', {
        description: 'Все изменения успешно применены',
      });
      setHasChanges(false);
    } else {
      toast.error('Ошибка', {
        description: 'Не удалось сохранить настройки',
      });
    }
    setSaving(false);
  };

  const handleReset = () => {
    // Reset to current database settings
    setSettings(dbSettings);
    setHasChanges(false);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="text-game-primary h-5 w-5 animate-spin" />
          <span className="text-white">Загрузка настроек...</span>
        </div>
      </div>
    );
  }

  const dayNames = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
  ];

  return (
    <div className="game-theme space-y-6">
      {/* Header */}
      <div className="space-y-4 text-center">
        <h2 className="flex items-center justify-center text-2xl font-bold text-white">
          <Settings className="mr-2 h-6 w-6" />
          Настройки игры
        </h2>
        <p className="text-muted-foreground">
          Управление параметрами игры и системными настройками
        </p>
      </div>

      {/* Game Rules Settings */}
      <Card className="game-card p-6">
        <h3 className="mb-4 flex items-center text-xl font-semibold text-white">
          <Clock className="text-game-primary mr-2 h-5 w-5" />
          Правила игры
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label>Вопросов в игре</Label>
            <Input
              type="number"
              min="1"
              max="100"
              value={settings.questionsPerGame}
              onChange={e =>
                updateSetting('questionsPerGame', parseInt(e.target.value))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Время на вопрос (мс)</Label>
            <Input
              type="number"
              min="5000"
              max="60000"
              step="1000"
              value={settings.timePerQuestion}
              onChange={e =>
                updateSetting('timePerQuestion', parseInt(e.target.value))
              }
              className="bg-input border-border text-white"
            />
          </div>

          <div className="space-y-2">
            <Label>Максимум очков за вопрос</Label>
            <Input
              type="number"
              min="1000"
              max="100000"
              step="1000"
              value={settings.maxPointsPerQuestion}
              onChange={e =>
                updateSetting('maxPointsPerQuestion', parseInt(e.target.value))
              }
              className="bg-input border-border text-white"
            />
          </div>

          <div className="space-y-2">
            <Label>Игр в день</Label>
            <Input
              type="number"
              min="1"
              max="10"
              value={settings.dailyGameLimit}
              onChange={e =>
                updateSetting('dailyGameLimit', parseInt(e.target.value))
              }
              className="bg-input border-border text-white"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Анонимная игра</Label>
              <Switch
                checked={settings.allowAnonymousPlay}
                onCheckedChange={checked =>
                  updateSetting('allowAnonymousPlay', checked)
                }
              />
            </div>
            <p className="text-muted-foreground text-xs">
              Разрешить игру без регистрации
            </p>
          </div>
        </div>
      </Card>

      {/* Weekly Contest Settings */}
      <Card className="game-card p-6">
        <h3 className="mb-4 flex items-center text-xl font-semibold text-white">
          <Trophy className="mr-2 h-5 w-5 text-yellow-400" />
          Еженедельный конкурс
        </h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Включить еженедельный конкурс</Label>
              <p className="text-muted-foreground text-sm">
                Автоматическое определение призеров каждую неделю
              </p>
            </div>
            <Switch
              checked={settings.weeklyContestEnabled}
              onCheckedChange={checked =>
                updateSetting('weeklyContestEnabled', checked)
              }
            />
          </div>

          {settings.weeklyContestEnabled && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label>День недели</Label>
                <select
                  value={settings.weeklyContestDay}
                  onChange={e =>
                    updateSetting('weeklyContestDay', parseInt(e.target.value))
                  }
                  className="bg-input border-border w-full rounded-md border p-2 text-white"
                >
                  {dayNames.map((day, index) => (
                    <option key={index} value={index + 1}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>Время (МСК)</Label>
                <Input
                  type="time"
                  value={settings.weeklyContestTime}
                  onChange={e =>
                    updateSetting('weeklyContestTime', e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Топ-призеров</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={settings.top3Winners}
                  onChange={e =>
                    updateSetting('top3Winners', parseInt(e.target.value))
                  }
                  className="bg-input border-border text-white"
                />
              </div>

              <div className="space-y-2">
                <Label>Случайных призеров</Label>
                <Input
                  type="number"
                  min="1"
                  max="50"
                  value={settings.randomWinners}
                  onChange={e =>
                    updateSetting('randomWinners', parseInt(e.target.value))
                  }
                  className="bg-input border-border text-white"
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* System Settings */}
      <Card className="game-card p-6">
        <h3 className="mb-4 flex items-center text-xl font-semibold text-white">
          <Users className="text-game-secondary mr-2 h-5 w-5" />
          Системные настройки
        </h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Режим обслуживания</Label>
              <p className="text-muted-foreground text-sm">
                Временно отключить доступ к игре для всех пользователей
              </p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={checked =>
                updateSetting('maintenanceMode', checked)
              }
            />
          </div>

          {settings.maintenanceMode && (
            <div className="space-y-2">
              <Label>Сообщение для пользователей</Label>
              <Textarea
                value={settings.maintenanceMessage}
                onChange={e =>
                  updateSetting('maintenanceMessage', e.target.value)
                }
                placeholder="Введите сообщение, которое увидят пользователи..."
                className="bg-input border-border min-h-[80px] text-white"
              />
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email уведомления</Label>
                <p className="text-muted-foreground text-sm">
                  Отправка уведомлений игрокам
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={checked =>
                  updateSetting('emailNotifications', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Объявления о конкурсах</Label>
                <p className="text-muted-foreground text-sm">
                  Уведомления о результатах конкурсов
                </p>
              </div>
              <Switch
                checked={settings.contestAnnouncements}
                onCheckedChange={checked =>
                  updateSetting('contestAnnouncements', checked)
                }
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Current Configuration Summary */}
      <Card className="game-card p-6">
        <h3 className="mb-4 flex items-center text-xl font-semibold text-white">
          <FileText className="mr-2 h-5 w-5 text-blue-400" />
          Текущая конфигурация
        </h3>

        <div className="grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
          <div className="space-y-2">
            <p>
              <span className="text-muted-foreground">
                Максимальных очков за игру:
              </span>{' '}
              <span className="font-medium text-white">
                {(
                  settings.questionsPerGame * settings.maxPointsPerQuestion
                ).toLocaleString()}
              </span>
            </p>
            <p>
              <span className="text-muted-foreground">Время одной игры:</span>{' '}
              <span className="font-medium text-white">
                {Math.round(
                  (settings.questionsPerGame * settings.timePerQuestion) /
                    1000 /
                    60
                )}{' '}
                минут
              </span>
            </p>
            <p>
              <span className="text-muted-foreground">Призеров в неделю:</span>{' '}
              <span className="font-medium text-white">
                {settings.top3Winners + settings.randomWinners}
              </span>
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <span className="text-muted-foreground">Конкурс:</span>{' '}
              <span className="font-medium text-white">
                {dayNames[settings.weeklyContestDay - 1]} в{' '}
                {settings.weeklyContestTime}
              </span>
            </p>
            <p>
              <span className="text-muted-foreground">Анонимная игра:</span>{' '}
              <span className="font-medium text-white">
                {settings.allowAnonymousPlay ? 'Разрешена' : 'Запрещена'}
              </span>
            </p>
            <p>
              <span className="text-muted-foreground">Режим обслуживания:</span>{' '}
              <span className="font-medium text-white">
                {settings.maintenanceMode ? 'Включен' : 'Выключен'}
              </span>
            </p>
          </div>
        </div>
      </Card>

      {/* Save Actions */}
      <div className="flex justify-center space-x-4">
        <Button
          onClick={handleReset}
          variant="outline"
          className="border-border hover:bg-muted text-white"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Сбросить к умолчаниям
        </Button>

        <Button
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className="game-button-primary text-white"
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Сохранение...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Сохранить изменения
            </>
          )}
        </Button>
      </div>

      {hasChanges && (
        <div className="text-center">
          <p className="flex items-center justify-center text-sm text-yellow-400">
            <Bell className="mr-1 h-4 w-4" />У вас есть несохраненные изменения
          </p>
        </div>
      )}
    </div>
  );
};
