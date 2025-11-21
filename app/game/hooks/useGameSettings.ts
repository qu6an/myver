import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';

export interface GameSettingsType {
  id?: string;
  questionsPerGame: number;
  timePerQuestion: number;
  maxPointsPerQuestion: number;
  weeklyContestEnabled: boolean;
  weeklyContestDay: number;
  weeklyContestTime: string;
  top3Winners: number;
  randomWinners: number;
  dailyGameLimit: number;
  maintenanceMode: boolean;
  maintenanceMessage: string;
  allowAnonymousPlay: boolean;
  emailNotifications: boolean;
  contestAnnouncements: boolean;
}

const DEFAULT_SETTINGS: GameSettingsType = {
  questionsPerGame: 30,
  timePerQuestion: 15000,
  maxPointsPerQuestion: 15000,
  weeklyContestEnabled: true,
  weeklyContestDay: 7,
  weeklyContestTime: '23:59',
  top3Winners: 3,
  randomWinners: 17,
  dailyGameLimit: 1,
  maintenanceMode: false,
  maintenanceMessage:
    'Сервис временно недоступен. Мы проводим техническое обслуживание.',
  allowAnonymousPlay: true,
  emailNotifications: true,
  contestAnnouncements: true,
};

export const useGameSettings = () => {
  const [settings, setSettings] = useState<GameSettingsType>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: settingsData, error } = await supabase
        .schema('game')
        .from('game_settings')
        .select('*')
        .single();

      if (error) {
        console.error('Error loading game settings:', error);
        setError(error.message);
        throw error.message;
      }

      if (settingsData) {
        setSettings({
          id: settingsData.id,
          questionsPerGame: settingsData.questions_per_game,
          timePerQuestion: settingsData.time_per_question,
          maxPointsPerQuestion: settingsData.max_points_per_question,
          weeklyContestEnabled: settingsData.weekly_contest_enabled,
          weeklyContestDay: settingsData.weekly_contest_day,
          weeklyContestTime: settingsData.weekly_contest_time,
          top3Winners: settingsData.top3_winners,
          randomWinners: settingsData.random_winners,
          dailyGameLimit: settingsData.daily_game_limit,
          maintenanceMode: settingsData.maintenance_mode,
          maintenanceMessage: settingsData.maintenance_message,
          allowAnonymousPlay: settingsData.allow_anonymous_play,
          emailNotifications: settingsData.email_notifications,
          contestAnnouncements: settingsData.contest_announcements,
        });
      } else {
        // Use defaults if no settings found
        setSettings(DEFAULT_SETTINGS);
      }
    } catch (err) {
      console.error('Error loading game settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to load settings');
      setSettings(DEFAULT_SETTINGS);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (newSettings: GameSettingsType) => {
    try {
      const settingsData = {
        questions_per_game: newSettings.questionsPerGame,
        time_per_question: newSettings.timePerQuestion,
        max_points_per_question: newSettings.maxPointsPerQuestion,
        weekly_contest_enabled: newSettings.weeklyContestEnabled,
        weekly_contest_day: newSettings.weeklyContestDay,
        weekly_contest_time: newSettings.weeklyContestTime,
        top3_winners: newSettings.top3Winners,
        random_winners: newSettings.randomWinners,
        daily_game_limit: newSettings.dailyGameLimit,
        maintenance_mode: newSettings.maintenanceMode,
        maintenance_message: newSettings.maintenanceMessage,
        allow_anonymous_play: newSettings.allowAnonymousPlay,
        email_notifications: newSettings.emailNotifications,
        contest_announcements: newSettings.contestAnnouncements,
      };

      if (newSettings.id) {
        // Update existing settings
        const { error } = await supabase
          .schema('game')
          .from('game_settings')
          .update(settingsData)
          .eq('id', newSettings.id);

        if (error) throw error;
      } else {
        // Create new settings (shouldn't happen normally)
        const { data, error } = await supabase
          .schema('game')
          .from('game_settings')
          .insert(settingsData)
          .select()
          .single();

        if (error) throw error;

        newSettings.id = data.id;
      }

      setSettings(newSettings);
      return true;
    } catch (err) {
      console.error('Error saving game settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to save settings');
      return false;
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return {
    settings,
    loading,
    error,
    saveSettings,
    reloadSettings: loadSettings,
  };
};
