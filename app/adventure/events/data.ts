'use server';

import { EventType, SelectablePlace } from '@/models';
import { isLoggedIn } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/server';

export const fetchEventTypes = async (): Promise<Array<EventType>> => {
  if (!(await isLoggedIn())) {
    return [];
  }

  const supabase = createClient();
  const { data } = await supabase.from('event_types').select('id, name, description').order('name');

  return data || [];
};

export const fetchPlaces = async (): Promise<Array<SelectablePlace>> => {
  if (!(await isLoggedIn())) {
    return [];
  }

  const supabase = createClient();
  const { data } = await supabase.from('places').select('id, name').order('name');

  return data || [];
};
