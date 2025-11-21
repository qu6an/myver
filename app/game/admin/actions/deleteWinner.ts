'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deleteWinner(recordId: number) {
  const supabase = await createClient();

  try {
    const { error } = await supabase
      .schema('game')
      .from('weekly_winners')
      .delete()
      .eq('id', recordId);

    if (error) throw error;

    revalidatePath('/game/admin');

    return { success: true, message: 'Запись о призере удалена.' };
  } catch (error: any) {
    console.error('Error deleting winner:', error);
    return { error: error.message };
  }
}
