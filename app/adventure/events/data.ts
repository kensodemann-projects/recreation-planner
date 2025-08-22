'use server';

import { Event, EventDTO, EventType, SelectablePlace } from '@/models';
import { convertToEvent, convertToEventDTO } from '@/models/convert';
import { executeQuery } from '@/utils/data';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';

const selectColumns = '*, places!inner(*), event_types!inner(*)';
const childTableColumns = ', notes(*), todo_collections(*, todo_items(*))';
const eventsTable = 'events';

const upcomingEventsQuery = (supabase: SupabaseClient, startDate: string, endDate?: string): any => {
  let query = supabase
    .from(eventsTable)
    .select(selectColumns)
    .or(`end_date.gte."${startDate}",and(end_date.is.null,begin_date.gte."${startDate}")`);
  if (endDate) {
    query = query.or(`end_date.lte."${endDate}",and(end_date.is.null,begin_date.lte."${endDate}")`);
  }

  return query.order('begin_date').order('begin_time', { nullsFirst: true });
};

const priorEventsQuery = (supabase: SupabaseClient, dt: string): any => {
  return supabase
    .from(eventsTable)
    .select(selectColumns)
    .or(`end_date.lt."${dt}",and(end_date.is.null,begin_date.lt."${dt}")`)
    .order('begin_date', { ascending: false })
    .order('begin_time', { ascending: false, nullsFirst: false });
};

const eventQuery = (supabase: SupabaseClient, id: number): any => {
  return supabase.from(eventsTable).select(selectColumns).eq('id', id).single();
};

const fullEventQuery = (supabase: SupabaseClient, id: number): any => {
  return supabase
    .from(eventsTable)
    .select(selectColumns + childTableColumns)
    .eq('id', id)
    .order('created_at', { referencedTable: 'notes' })
    .single();
};

const eventInsert = (supabase: SupabaseClient, event: Event): any => {
  return supabase.from(eventsTable).insert(convertToEventDTO(event)).select(selectColumns).single();
};

const eventUpdate = (supabase: SupabaseClient, event: Event): any => {
  return supabase.from(eventsTable).update(convertToEventDTO(event)).eq('id', event.id).select(selectColumns).single();
};

const eventDelete = (supabase: SupabaseClient, event: Event): any => {
  return supabase.from(eventsTable).delete().eq('id', event.id);
};

const eventTypesQuery = (supabase: SupabaseClient): any => {
  return supabase.from('event_types').select('id, name, description').order('name');
};

const selectablePlacesQuery = (supabase: SupabaseClient): any => {
  return supabase.from('places').select('id, name').order('name');
};

export const fetchUpcomingEvents = async (startDate: string, endDate?: string): Promise<Event[]> => {
  if (await isNotLoggedIn()) {
    return [];
  }

  const supabase = createClient();
  const query = upcomingEventsQuery(supabase, startDate, endDate);
  const data = await executeQuery<EventDTO[]>(query);
  return (data || []).map((p) => convertToEvent(p) as Event);
};

export const fetchPriorEvents = async (dt: string): Promise<Event[]> => {
  if (await isNotLoggedIn()) {
    return [];
  }

  const supabase = createClient();
  const query = priorEventsQuery(supabase, dt);
  const data = await executeQuery<EventDTO[]>(query);
  return (data || []).map((p) => convertToEvent(p) as Event);
};

export const fetchEvent = async (id: number, full: boolean = false): Promise<Event | null> => {
  if (await isNotLoggedIn()) {
    return null;
  }

  const supabase = createClient();
  const query = full ? fullEventQuery(supabase, id) : eventQuery(supabase, id);
  const data = await executeQuery<EventDTO>(query);
  return data ? (convertToEvent(data) as Event) : null;
};

export const addEvent = async (event: Event): Promise<Event | null> => {
  if (await isNotLoggedIn()) {
    return null;
  }

  const supabase = createClient();
  const query = eventInsert(supabase, event);
  const data = await executeQuery<EventDTO>(query);
  return data ? (convertToEvent(data) as Event) : null;
};

export const canDeleteEvent = async (event: Event): Promise<boolean> => {
  if (await isNotLoggedIn()) {
    return false;
  }
  return true;
};

export const deleteEvent = async (event: Event): Promise<void> => {
  if (await isNotLoggedIn()) {
    return;
  }

  const supabase = createClient();
  const query = eventDelete(supabase, event);
  await executeQuery<void>(query);
};

export const fetchEventTypes = async (): Promise<EventType[]> => {
  if (await isNotLoggedIn()) {
    return [];
  }

  const supabase = createClient();
  const query = eventTypesQuery(supabase);
  const data = await executeQuery<EventType[]>(query);
  return data || [];
};

export const fetchPlaces = async (): Promise<SelectablePlace[]> => {
  if (await isNotLoggedIn()) {
    return [];
  }

  const supabase = createClient();
  const query = selectablePlacesQuery(supabase);
  const data = await executeQuery<SelectablePlace[]>(query);
  return data || [];
};

export const updateEvent = async (event: Event): Promise<Event | null> => {
  if (await isNotLoggedIn()) {
    return null;
  }

  const supabase = createClient();
  const query = eventUpdate(supabase, event);
  const data = await executeQuery<EventDTO>(query);
  return data ? (convertToEvent(data) as Event) : null;
};
