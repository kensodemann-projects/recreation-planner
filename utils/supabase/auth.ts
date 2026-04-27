import { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from './server';

export const isNotLoggedIn = async (): Promise<boolean> => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return !user;
};

export const withAuth = async <TResult>(
  fn: (supabase: SupabaseClient) => Promise<TResult>,
): Promise<TResult | null> => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? await fn(supabase) : null;
};
