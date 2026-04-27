import { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from './server';

export const isNotLoggedIn = async (): Promise<boolean> => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return !user;
};

export const withAuth = <TResult>(
  fn: (supabase: SupabaseClient) => Promise<TResult>,
): (() => Promise<TResult | null>) => {
  return async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user ? fn(supabase) : null;
  };
};
