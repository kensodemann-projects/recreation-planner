'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const login = async (email: string, password: string): Promise<{ error?: string; success: boolean }> => {
  const supabase = createClient();

  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message, success: false };
  }

  revalidatePath('/', 'layout');
  redirect('/adventure');

  return { success: true };
};

export const logout = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    supabase.auth.signOut();
  }

  revalidatePath('/', 'layout');
  redirect('/');
};
