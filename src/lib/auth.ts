import { supabase } from './db';

export async function getUser(userId: string) {
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (!data) throw new Error('User not found');
  return data;
}
