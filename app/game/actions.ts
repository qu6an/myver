'use server';

import { User } from '@/types';
import { createClient } from '@/utils/supabase/server';

export interface IUser {
  id: string;
  created_at: string;
  email: string;
}

export interface IProfile {
  first_name: string;
  last_name: string;
  city: string;
  nick_name_game: string;
  role: string;
}

export interface IGameSettings {
  questionsPerGame: number;
  timePerQuestion: number;
  maxPointsPerQuestion: number;
  allowAnonymousPlay: boolean;
  dailyGameLimit: number;
}

export interface IGame {
  canPlayToday: boolean;
  todaysBest: number;
}

export interface StartGameData {
  user: IUser | null;
  profile: IProfile;
  game: IGame;
  error: {
    message: string;
    status: number;
  } | null;
  settings: IGameSettings;
}

export async function getStartGameData(): Promise<StartGameData> {
  const supabase = await createClient();

  const defaultResult: StartGameData = {
    user: null,
    profile: {
      first_name: '',
      last_name: '',
      city: '',
      nick_name_game: '',
      role: 'user',
    },
    game: {
      canPlayToday: true,
      todaysBest: 0,
    },
    error: null,
    settings: {
      questionsPerGame: 0,
      timePerQuestion: 0,
      maxPointsPerQuestion: 0,
      allowAnonymousPlay: false,
      dailyGameLimit: 0,
    },
  };

  const { data: settingsData, error: settingsError } = await supabase
    .schema('game')
    .from('game_settings')
    .select('*')
    .single();

  if (settingsError) {
    defaultResult.error = {
      message: 'Database error loading settings',
      status: 500,
    };
  } else {
    defaultResult.settings = {
      allowAnonymousPlay: settingsData.allow_anonymous_play,
      dailyGameLimit: settingsData.daily_game_limit,
      maxPointsPerQuestion: settingsData.max_points_per_question,
      questionsPerGame: settingsData.questions_per_game,
      timePerQuestion: settingsData.time_per_question,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return defaultResult;
  }
  defaultResult.user = {
    id: user.id,
    created_at: user.created_at,
    email: user.email || '',
  };

  const twentyFourHoursAgo = new Date(
    Date.now() - 24 * 60 * 60 * 1000
  ).toISOString();

  const { data: profile, error: profileError } = await supabase
    .schema('public')
    .from('users')
    .select('first_name, last_name, city, nick_name_game, role')
    .eq('user_id', user.id)
    .single();

  if (profileError) {
    defaultResult.error = {
      message: 'Database error loading profile',
      status: 500,
    };
  } else {
    defaultResult.profile = {
      city: profile.city || '',
      first_name: profile.first_name || '',
      last_name: profile.last_name || '',
      nick_name_game: profile.nick_name_game || '',
      role: profile.role || 'user',
    };
  }

  const { data: activeGame } = await supabase
    .schema('game')
    .from('active_game')
    .select('created_at')
    .eq('user_id', user.id)
    .gte('created_at', twentyFourHoursAgo)
    .single();

  if (activeGame) {
    // Found a recent active game, user can't play
    const { data: lastGame, error: historyError } = await supabase
      .schema('game')
      .from('history_games')
      .select('points')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    defaultResult.game.canPlayToday = false;
    defaultResult.game.todaysBest = historyError ? 0 : lastGame.points || 0;
    return defaultResult;
  }
  const { data: playedToday, error: historyError } = await supabase
    .schema('game')
    .from('history_games')
    .select('created_at, points')
    .eq('user_id', user.id)
    .gte('created_at', twentyFourHoursAgo)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (historyError && historyError.code !== 'PGRST116') {
    defaultResult.error = {
      message: 'Database error checking history',
      status: 500,
    };
    return defaultResult;
  }

  if (historyError) {
  }

  if (playedToday) {
    defaultResult.game.canPlayToday = false;
    defaultResult.game.todaysBest = playedToday.points || 0;
  }

  return defaultResult;
}
