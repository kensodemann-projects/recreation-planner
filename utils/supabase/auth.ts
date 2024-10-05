import { createClient } from './server';

export const isLoggedIn = async (): Promise<boolean> => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return !!user;
};
