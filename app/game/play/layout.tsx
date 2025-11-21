import { createClient } from '@/utils/supabase/server';
import React from 'react';
import { getGameData } from './actions';
import { getStartGameData } from '../actions';
import { redirect } from 'next/navigation';

export default async function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    game,
    profile: { role },
  } = await getStartGameData();

  if (!game.canPlayToday && role !== 'admin') {
    redirect('/game');
  }

  return <div>{children}</div>;
}
