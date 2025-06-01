'use server';

import { Event, EventType, SelectablePlace } from '@/models';
import { convertToEvent, convertToEventDTO } from '@/models/convert';
import { isLoggedIn } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/server';

const selectColumns =
  'id, name, description, begin_date, begin_time, end_date, end_time, place_rid, event_type_rid, places!inner(name, description, address_line_1, address_line_2, city, state, postal_code, phone_number, website), event_types!inner(name, description)';

export const fetchUpcomingEvents = async (dt: string): Promise<Array<Event>> => {
  if (!(await isLoggedIn())) {
    return [];
  }

  const supabase = createClient();
  const { data } = await supabase
    .from('events')
    .select(selectColumns)
    .or(`end_date.gte."${dt}",and(end_date.is.null,begin_date.gte."${dt}")`)
    .order('begin_date')
    .order('begin_time', { nullsFirst: true });

  return data?.map((p) => convertToEvent(p) as Event) || [];
};

export const fetchPriorEvents = async (dt: string): Promise<Array<Event>> => {
  if (!(await isLoggedIn())) {
    return [];
  }

  const supabase = createClient();
  const { data } = await supabase
    .from('events')
    .select(selectColumns)
    .or(`end_date.lt."${dt}",and(end_date.is.null,begin_date.lt."${dt}")`)
    .order('begin_date', { ascending: false })
    .order('begin_time', { ascending: false, nullsFirst: false });

  return data?.map((p) => convertToEvent(p) as Event) || [];
};

export const fetchEvent = async (id: number): Promise<Event | null> => {
  if (!(await isLoggedIn())) {
    return null;
  }

  const supabase = createClient();
  const { data } = await supabase.from('events').select(selectColumns).eq('id', id).single();

  return data ? (convertToEvent(data) as Event) : null;
};

export const addEvent = async (event: Event): Promise<Event | null> => {
  if (!(await isLoggedIn())) {
    return null;
  }

  const supabase = createClient();
  const { data } = await supabase.from('events').insert(convertToEventDTO(event)).select(selectColumns);

  return data && data.length ? (convertToEvent(data[0]) as Event) : null;
};

export const canDeleteEvent = async (event: Event): Promise<boolean> => {
  if (!(await isLoggedIn())) {
    return false;
  }
  return true;
};

export const deleteEvent = async (event: Event): Promise<void> => {
  if (await isLoggedIn()) {
    const supabase = createClient();
    await supabase.from('events').delete().eq('id', event.id);
  }
};

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

export const updateEvent = async (event: Event): Promise<Event | null> => {
  if (!(await isLoggedIn())) {
    return null;
  }

  const supabase = createClient();
  const { data } = await supabase
    .from('events')
    .update(convertToEventDTO(event))
    .eq('id', event.id)
    .select(selectColumns);

  return data && data.length ? (convertToEvent(data[0]) as Event) : null;
};
