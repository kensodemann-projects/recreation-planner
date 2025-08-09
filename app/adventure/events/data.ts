'use server';

import {
  Event,
  EventDTO,
  EventType,
  Note,
  NoteDTO,
  SelectablePlace,
  TodoCollection,
  TodoCollectionDTO,
} from '@/models';
import { convertToEvent, convertToEventDTO, convertToNote, convertToTodoCollection } from '@/models/convert';
import { executeQuery } from '@/utils/data';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';

const selectColumns = '*, places!inner(*), event_types!inner(*)';
const eventsTable = 'events';

const upcomingEventsQuery = (supabase: SupabaseClient, dt: string): any => {
  return supabase
    .from(eventsTable)
    .select(selectColumns)
    .or(`end_date.gte."${dt}",and(end_date.is.null,begin_date.gte."${dt}")`)
    .order('begin_date')
    .order('begin_time', { nullsFirst: true });
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

const eventInsert = (supabase: SupabaseClient, event: Event): any => {
  return supabase.from(eventsTable).insert(convertToEventDTO(event)).select(selectColumns).single();
};

const eventUpdate = (supabase: SupabaseClient, event: Event): any => {
  return supabase.from(eventsTable).update(convertToEventDTO(event)).eq('id', event.id).select(selectColumns).single();
};

const eventDelete = (supabase: SupabaseClient, event: Event): any => {
  return supabase.from(eventsTable).delete().eq('id', event.id);
};

const notesForEventQuery = (supabase: SupabaseClient, eventRid: number): any => {
  return supabase.from('notes').select('*').eq('event_rid', eventRid).order('created_at', { ascending: false });
};

const todoCollectionsForEventQuery = (supabase: SupabaseClient, eventRid: number): any => {
  return supabase
    .from('todo_collections')
    .select('*, todo_items(*)')
    .eq('event_rid', eventRid)
    .order('due_date', { nullsFirst: false })
    .order('created_at', { referencedTable: 'todo_items' });
};

const eventTypesQuery = (supabase: SupabaseClient): any => {
  return supabase.from('event_types').select('id, name, description').order('name');
};

const selectablePlacesQuery = (supabase: SupabaseClient): any => {
  return supabase.from('places').select('id, name').order('name');
};

export const fetchUpcomingEvents = async (dt: string): Promise<Event[]> => {
  if (await isNotLoggedIn()) {
    return [];
  }

  const supabase = createClient();
  const query = upcomingEventsQuery(supabase, dt);
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

export const fetchEvent = async (id: number): Promise<Event | null> => {
  if (await isNotLoggedIn()) {
    return null;
  }

  const supabase = createClient();
  const query = eventQuery(supabase, id);
  const data = await executeQuery<EventDTO>(query);
  return data ? (convertToEvent(data) as Event) : null;
};

export const fetchNotesForEvent = async (eventRid: number): Promise<Note[]> => {
  if (await isNotLoggedIn()) {
    return [];
  }

  const supabase = createClient();
  const query = notesForEventQuery(supabase, eventRid);
  const data = await executeQuery<NoteDTO[]>(query);
  return (data || []).map((p) => convertToNote(p));
};

export const fetchTodoCollectionsForEvent = async (eventRid: number): Promise<TodoCollection[]> => {
  if (await isNotLoggedIn()) {
    return [];
  }

  const supabase = createClient();
  const query = todoCollectionsForEventQuery(supabase, eventRid);
  const data = await executeQuery<TodoCollectionDTO[]>(query);
  return (data || []).map((p) => convertToTodoCollection(p) as TodoCollection);
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
