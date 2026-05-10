/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { Event, EventDTO, EventType } from '@/models';
import { convertToEvent, convertToEventDTO } from '@/models/convert';
import { executeQuery } from '@/utils/data';
import { withAuth } from '@/utils/supabase/auth';
import { SupabaseClient } from '@supabase/supabase-js';

const selectColumns = '*, places!inner(*, place_types!inner(*)), event_types!inner(*)';
const childTableColumns = ', itinerary_items(*), notes(*), todo_collections(*, todo_items(*))';
const eventsTable = 'events';

const upcomingEventsQuery = (supabase: SupabaseClient, startDate: string, endDate?: string): any => {
  let query = supabase.from(eventsTable).select(selectColumns).gte('effective_end_date', startDate);
  if (endDate) {
    query = query.lte('effective_end_date', endDate);
  }
  return query.order('begin_date').order('begin_time', { nullsFirst: true });
};

const priorEventsQuery = (supabase: SupabaseClient, beforeDate: string, afterDate?: string): any => {
  let query = supabase.from(eventsTable).select(selectColumns).lt('effective_end_date', beforeDate);
  if (afterDate) {
    query = query.gte('effective_end_date', afterDate);
  }
  return query.order('begin_date', { ascending: false }).order('begin_time', { ascending: false, nullsFirst: false });
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
    .order('date', { referencedTable: 'itinerary_items' })
    .order('time', { referencedTable: 'itinerary_items' })
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

export const fetchUpcomingEvents = async (startDate: string, endDate?: string): Promise<Event[]> => {
  const res = await withAuth((supabase: SupabaseClient) =>
    executeQuery<EventDTO[]>(upcomingEventsQuery(supabase, startDate, endDate)),
  );
  return (res.success ? res.data : []).map((p) => convertToEvent(p) as Event);
};

export const fetchPriorEvents = async (beforeDate: string, afterDate?: string): Promise<Event[]> => {
  const res = await withAuth((supabase: SupabaseClient) =>
    executeQuery<EventDTO[]>(priorEventsQuery(supabase, beforeDate, afterDate)),
  );
  return (res.success ? res.data : []).map((p) => convertToEvent(p) as Event);
};

export const fetchEvent = async (id: number, full: boolean = false): Promise<Event | null> => {
  const res = await withAuth((supabase: SupabaseClient) =>
    executeQuery<EventDTO>(full ? fullEventQuery(supabase, id) : eventQuery(supabase, id)),
  );
  return res.success ? (convertToEvent(res.data) as Event) : null;
};

export const addEvent = async (event: Event): Promise<Event | null> => {
  const res = await withAuth((supabase: SupabaseClient) => executeQuery<EventDTO>(eventInsert(supabase, event)));
  return res.success ? (convertToEvent(res.data) as Event) : null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const canDeleteEvent = async (event: Event): Promise<boolean> => {
  const { success } = await withAuth(async () => ({ success: true, data: true }));
  return success;
};

export const deleteEvent = async (event: Event): Promise<boolean> => {
  const { success } = await withAuth((supabase: SupabaseClient) => executeQuery<null>(eventDelete(supabase, event)));
  return success;
};

export const fetchEventTypes = async (): Promise<EventType[]> => {
  const res = await withAuth((supabase: SupabaseClient) => executeQuery<EventType[]>(eventTypesQuery(supabase)));
  return res.success ? res.data : [];
};

export const updateEvent = async (event: Event): Promise<Event | null> => {
  const res = await withAuth((supabase: SupabaseClient) => executeQuery<EventDTO>(eventUpdate(supabase, event)));
  return res.success ? (convertToEvent(res.data) as Event) : null;
};
