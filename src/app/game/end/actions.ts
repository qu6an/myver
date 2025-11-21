'use server';
import { createClient } from '@/utils/supabase/server';

export async function getGameData(userId: string) {
  const supabase = await createClient();

  const [
    { data: endGameData, error: endGameError },
    { data: gameSettings, error: settingsError },
    { data: historyGame, error: historyError },
    { data: ticket, error: ticketError },
  ] = await Promise.all([
    supabase.schema('game').from('info_win_game').select('*').limit(1).single(),

    supabase
      .schema('game')
      .from('game_settings')
      .select('questions_per_game, max_points_per_question')
      .limit(1)
      .single(),

    supabase
      .schema('game')
      .from('history_games')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single(),

    supabase
      .schema('game')
      .from('tickets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single(),
  ]);

  const hasError = endGameError || settingsError || historyError || ticketError;
  if (hasError) {
    console.error('Ошибка БД', {
      endGameError,
      settingsError,
      historyError,
      ticketError,
    });

    return {
      ok: false,
      error: 'Ошибка БД',
      endGameData: null,
      gameSettings: null,
      historyGame: null,
      ticket: null,
    };
  }

  return {
    ok: true,
    endGameData,
    gameSettings,
    historyGame,
    ticket,
  };
}
