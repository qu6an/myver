'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function runLottery(lotteryWeek: string, numWinners: number) {
  const supabase = await createClient();

  try {
    let startDate, endDate;
    let weeklyLabel;

    if (lotteryWeek === 'current') {
      const today = new Date();
      const day = today.getDay();
      const diff = today.getDate() - day + (day === 0 ? -6 : 1);
      startDate = new Date(today.getFullYear(), today.getMonth(), diff);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
      weeklyLabel = `${startDate.toLocaleDateString()}-${endDate.toLocaleDateString()}`;
    } else {
      const [start, end] = lotteryWeek.split('_');
      startDate = new Date(start);
      endDate = new Date(end);
      endDate.setHours(23, 59, 59, 999);
      weeklyLabel = `${startDate.toLocaleDateString()}-${endDate.toLocaleDateString()}`;
    }

    const { data: tickets, error: ticketsError } = await supabase
      .schema('game')
      .from('tickets')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    if (ticketsError) throw ticketsError;
    if (!tickets || tickets.length === 0) {
      return { error: 'Нет билетов для розыгрыша за выбранную неделю.' };
    }

    const allEmails = tickets.map(t => t.user_email);
    const uniqueEmails = [...new Set(allEmails)];

    if (uniqueEmails.length < numWinners) {
      return {
        error: `Недостаточно уникальных участников для выбора ${numWinners} победителей.`,
      };
    }

    const shuffledEmails = uniqueEmails.sort(() => 0.5 - Math.random());
    const winnerEmails = shuffledEmails.slice(0, numWinners);

    const winners = winnerEmails.map(email => {
      const userTicket = tickets.find(t => t.user_email === email);
      return {
        email: email,
        ticket: userTicket?.number || 'N/A',
      };
    });

    const { error: insertError } = await supabase
      .schema('game')
      .from('weekly_winners')
      .insert({
        weekly: weeklyLabel,
        winners: winners,
      });

    if (insertError) throw insertError;

    revalidatePath('/game/admin'); // Revalidate the admin page to show new winners

    return {
      success: true,
      message: `${winners.length} победителей были успешно определены.`,
    };
  } catch (error: any) {
    console.error('Error running lottery server action:', error);
    return { error: error.message };
  }
}
