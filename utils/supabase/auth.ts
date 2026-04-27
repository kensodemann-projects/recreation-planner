import { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from './server';

export const isNotLoggedIn = async (): Promise<boolean> => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return !user;
};

export const withAuth = <TArgs extends unknown[], TResult>(
  fn: (supabase: SupabaseClient, ...args: TArgs) => Promise<TResult>,
): ((...args: TArgs) => Promise<TResult | null>) => {
  return async (...args) => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user ? fn(supabase, ...args) : null;
  };
};
