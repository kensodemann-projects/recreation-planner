import { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from './server';
import { QueryResult } from '../data';

export const isNotLoggedIn = async (): Promise<boolean> => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return !user;
};

export const withAuth = async <T>(
  fn: (supabase: SupabaseClient) => Promise<QueryResult<T>>,
): Promise<QueryResult<T>> => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? await fn(supabase) : { success: false, error: 'NOT_AUTHENTICATED' };
};
